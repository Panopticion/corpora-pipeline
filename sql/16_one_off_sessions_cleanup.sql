-- =============================================================================
-- 16_one_off_sessions_cleanup.sql — one-off cleanup for stuck/ambiguous sessions
-- =============================================================================
-- Purpose:
--   1) Remove stale `uploading` sessions with zero documents.
--   2) Reconcile session status when documents exist but session remained `uploading`.
--   3) Disambiguate duplicate generic filenames (e.g., repeated `upload.txt`).
--
-- Safe to run once in production. Wrapped in a transaction.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1) Delete stale empty sessions: status=uploading, no documents, older than 30m
-- -----------------------------------------------------------------------------
WITH deleted AS (
  DELETE FROM corpus_parse_sessions s
  WHERE s.status = 'uploading'
    AND s.created_at < NOW() - INTERVAL '30 minutes'
    AND NOT EXISTS (
      SELECT 1
      FROM corpus_session_documents d
      WHERE d.session_id = s.id
    )
  RETURNING s.id
)
SELECT COUNT(*)::int AS deleted_empty_uploading_sessions
FROM deleted;

-- -----------------------------------------------------------------------------
-- 2) Reconcile stuck session statuses
--    - uploading + docs + crosswalk_markdown => crosswalk_done
--    - uploading + docs + no pending/parsing docs => complete
-- -----------------------------------------------------------------------------
UPDATE corpus_parse_sessions s
SET status = 'crosswalk_done'
WHERE s.status = 'uploading'
  AND s.crosswalk_markdown IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM corpus_session_documents d
    WHERE d.session_id = s.id
  );

UPDATE corpus_parse_sessions s
SET status = 'complete'
WHERE s.status = 'uploading'
  AND s.crosswalk_markdown IS NULL
  AND EXISTS (
    SELECT 1
    FROM corpus_session_documents d
    WHERE d.session_id = s.id
  )
  AND NOT EXISTS (
    SELECT 1
    FROM corpus_session_documents d
    WHERE d.session_id = s.id
      AND d.status IN ('pending', 'parsing')
  );

-- -----------------------------------------------------------------------------
-- 3) Disambiguate duplicate generic upload filenames within each session
--    Keep first as-is; rename 2nd+ as upload-2.txt, upload-3.txt, etc.
-- -----------------------------------------------------------------------------
WITH ranked AS (
  SELECT
    d.id,
    d.source_filename,
    ROW_NUMBER() OVER (
      PARTITION BY d.session_id, d.source_filename
      ORDER BY d.created_at, d.id
    ) AS rn,
    COUNT(*) OVER (
      PARTITION BY d.session_id, d.source_filename
    ) AS cnt
  FROM corpus_session_documents d
  WHERE d.source_filename ~ '^upload(\.[A-Za-z0-9]+)?$'
),
renamed AS (
  UPDATE corpus_session_documents d
  SET source_filename = REGEXP_REPLACE(
    d.source_filename,
    '(\.[A-Za-z0-9]+)?$',
    '-' || ranked.rn::text || COALESCE(SUBSTRING(d.source_filename FROM '(\.[A-Za-z0-9]+)$'), '.txt')
  )
  FROM ranked
  WHERE d.id = ranked.id
    AND ranked.cnt > 1
    AND ranked.rn > 1
  RETURNING d.id
)
SELECT COUNT(*)::int AS renamed_duplicate_generic_filenames
FROM renamed;

COMMIT;
