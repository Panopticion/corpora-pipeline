-- =============================================================================
-- 19_storage_provenance.sql — Source file storage + provenance tracking
-- =============================================================================
-- Depends on: 12_sessions.sql, 00_roles.sql
-- =============================================================================
-- Adds a Supabase Storage bucket for original uploaded files (PDFs, DOCX) and
-- a provenance column linking each session document row to its source file.
--
-- Design:
--   Storage path: {org_id}/{session_id}/{document_id}/{sanitized_filename}
--   Ownership: Uploads via service_role (server-side only, bypasses RLS).
--              Authenticated users can only SELECT objects under their org path.
--   Cleanup: Application layer deletes objects when documents/sessions are removed.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Provenance column on session documents
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE corpus_session_documents
  ADD COLUMN IF NOT EXISTS source_storage_path TEXT;

COMMENT ON COLUMN corpus_session_documents.source_storage_path IS
  'Supabase Storage object path to the original uploaded file. '
  'Format: {org_id}/{session_id}/{document_id}/{filename}. '
  'NULL for text-pasted documents or documents created before this migration.';

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Storage bucket: corpus-uploads
-- ─────────────────────────────────────────────────────────────────────────────
-- Private bucket (public = false). Access controlled by signed URLs + RLS.
-- 50 MB file size limit. Restricted MIME types.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'corpus-uploads',
  'corpus-uploads',
  false,
  52428800,  -- 50 MB
  ARRAY[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit    = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Storage RLS policies
-- ─────────────────────────────────────────────────────────────────────────────
-- service_role bypasses RLS automatically (no explicit policy needed).
-- Authenticated users: read-only access scoped to their organization(s).

DROP POLICY IF EXISTS "corpus_uploads_auth_select" ON storage.objects;
CREATE POLICY "corpus_uploads_auth_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'corpus-uploads'
    AND (storage.foldername(name))[1] IN (
      SELECT om.organization_id::text
      FROM organization_members om
      WHERE om.user_id = auth.uid()
    )
  );

-- Block direct INSERT/UPDATE/DELETE from authenticated users.
-- All mutations go through service_role server functions.
DROP POLICY IF EXISTS "corpus_uploads_auth_deny_insert" ON storage.objects;
CREATE POLICY "corpus_uploads_auth_deny_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'corpus-uploads'
    AND false  -- always deny; uploads happen server-side via service_role
  );

DROP POLICY IF EXISTS "corpus_uploads_auth_deny_update" ON storage.objects;
CREATE POLICY "corpus_uploads_auth_deny_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'corpus-uploads'
    AND false  -- always deny
  );

DROP POLICY IF EXISTS "corpus_uploads_auth_deny_delete" ON storage.objects;
CREATE POLICY "corpus_uploads_auth_deny_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'corpus-uploads'
    AND false  -- always deny; deletions happen server-side via service_role
  );

-- Note: COMMENT ON POLICY for storage.objects requires supabase_storage_admin
-- ownership. Policy names are self-documenting; comments omitted intentionally.
