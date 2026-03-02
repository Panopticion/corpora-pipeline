-- =============================================================================
-- 18_chunk_audit_recovery.sql — Source chunk audit + recovery artifacts
-- =============================================================================
-- Depends on: 12_sessions.sql
-- =============================================================================
-- Stores deterministic source chunk lineage and per-chunk AI audit outcomes
-- for long-document parse recovery.

-- ─────────────────────────────────────────────────────────────────────────────
-- Source chunk lineage
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS corpus_document_source_chunks (
  id             BIGSERIAL PRIMARY KEY,
  document_id    UUID NOT NULL REFERENCES corpus_session_documents(id) ON DELETE CASCADE,
  sequence       INT NOT NULL,
  source_text    TEXT NOT NULL,
  source_hash    TEXT NOT NULL,
  chunk_strategy TEXT NOT NULL DEFAULT 'hybrid_paragraph_cap',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (document_id, sequence)
);

CREATE INDEX IF NOT EXISTS idx_source_chunks_document
  ON corpus_document_source_chunks(document_id, sequence);

DROP TRIGGER IF EXISTS update_source_chunks_updated_at ON corpus_document_source_chunks;
CREATE TRIGGER update_source_chunks_updated_at
  BEFORE UPDATE ON corpus_document_source_chunks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────────
-- Per-chunk audit and recovery outcomes
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS corpus_document_chunk_audits (
  id                     BIGSERIAL PRIMARY KEY,
  document_id            UUID NOT NULL REFERENCES corpus_session_documents(id) ON DELETE CASCADE,
  sequence               INT NOT NULL,
  source_hash            TEXT NOT NULL,
  ai_hash                TEXT NOT NULL,
  coverage_ratio         NUMERIC(6, 4) NOT NULL,
  omission_detected      BOOLEAN NOT NULL DEFAULT false,
  recovered_from_source  BOOLEAN NOT NULL DEFAULT false,
  source_text            TEXT NOT NULL,
  ai_text                TEXT NOT NULL,
  recovered_text         TEXT NOT NULL,
  warnings               TEXT[] NOT NULL DEFAULT '{}',
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (document_id, sequence)
);

CREATE INDEX IF NOT EXISTS idx_chunk_audits_document
  ON corpus_document_chunk_audits(document_id, sequence);

CREATE INDEX IF NOT EXISTS idx_chunk_audits_omission
  ON corpus_document_chunk_audits(document_id)
  WHERE omission_detected = true;

ALTER TABLE corpus_document_source_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE corpus_document_chunk_audits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pipeline_admin_all_source_chunks" ON corpus_document_source_chunks;
CREATE POLICY "pipeline_admin_all_source_chunks" ON corpus_document_source_chunks
  FOR ALL TO pipeline_admin USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "pipeline_admin_all_chunk_audits" ON corpus_document_chunk_audits;
CREATE POLICY "pipeline_admin_all_chunk_audits" ON corpus_document_chunk_audits
  FOR ALL TO pipeline_admin USING (true) WITH CHECK (true);

COMMENT ON TABLE corpus_document_source_chunks IS
  'Deterministic source chunks generated before AI parse. Used for completeness audit and recovery.';
COMMENT ON TABLE corpus_document_chunk_audits IS
  'Per-chunk coverage audit between source chunk and AI-cleaned chunk, with fallback outcome.';
