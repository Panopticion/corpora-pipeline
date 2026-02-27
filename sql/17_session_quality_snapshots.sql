-- =============================================================================
-- 17_session_quality_snapshots.sql — session quality KPI snapshots
-- =============================================================================
-- Depends on: 12_sessions.sql
-- =============================================================================
-- Stores point-in-time workflow quality metrics so teams can inspect trends
-- across a session lifecycle.
-- =============================================================================

CREATE TABLE IF NOT EXISTS corpus_session_quality_snapshots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES corpus_parse_sessions(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  metrics_json    JSONB NOT NULL,
  metrics_hash    TEXT NOT NULL,
  captured_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_quality_snapshots_session_time
  ON corpus_session_quality_snapshots(session_id, captured_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_quality_snapshots_org
  ON corpus_session_quality_snapshots(organization_id);

CREATE INDEX IF NOT EXISTS idx_session_quality_snapshots_hash
  ON corpus_session_quality_snapshots(session_id, metrics_hash);

ALTER TABLE corpus_session_quality_snapshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pipeline_admin_all_session_quality_snapshots" ON corpus_session_quality_snapshots;
CREATE POLICY "pipeline_admin_all_session_quality_snapshots" ON corpus_session_quality_snapshots
  FOR ALL TO pipeline_admin USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "users_read_own_org_session_quality_snapshots" ON corpus_session_quality_snapshots;
CREATE POLICY "users_read_own_org_session_quality_snapshots" ON corpus_session_quality_snapshots
  FOR SELECT TO pipeline_user
  USING (organization_id IN (SELECT user_org_ids()));

DROP POLICY IF EXISTS "users_manage_own_org_session_quality_snapshots" ON corpus_session_quality_snapshots;
CREATE POLICY "users_manage_own_org_session_quality_snapshots" ON corpus_session_quality_snapshots
  FOR ALL TO pipeline_user
  USING (organization_id IN (SELECT user_admin_org_ids()))
  WITH CHECK (organization_id IN (SELECT user_admin_org_ids()));

COMMENT ON TABLE corpus_session_quality_snapshots IS
  'Point-in-time workflow quality metrics for parse/chunk/watermark/promote/crosswalk readiness.';

COMMENT ON COLUMN corpus_session_quality_snapshots.metrics_json IS
  'JSON payload containing deterministic KPI metrics and gate states at capture time.';

COMMENT ON COLUMN corpus_session_quality_snapshots.metrics_hash IS
  'Hash of metrics_json used to skip redundant consecutive snapshots.';
