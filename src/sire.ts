/**
 * S.I.R.E. post-retrieval enforcement — the deterministic exclusion gate.
 *
 * After hybrid retrieval returns candidate chunks with S.I.R.E. metadata,
 * this function applies the sole enforcement gate: any chunk whose content
 * matches a term in the winning subject's excluded list is purged.
 *
 * Only `excluded` enforces. Subject, Included, and Relevant inform discovery
 * but never veto.
 */

/** Minimal shape of a retrieved chunk carrying S.I.R.E. metadata. */
export interface RetrievedChunk {
  chunk_id: string;
  content: string;
  similarity: number;
  sire_subject: string | null;
  sire_excluded: string[];
  [key: string]: unknown;
}

/** Result of S.I.R.E. enforcement on a chunk set. */
export interface SireEnforcementResult {
  /** Chunks that passed the exclusion gate. */
  passed: RetrievedChunk[];
  /** Chunks purged by the exclusion gate. */
  purged: RetrievedChunk[];
  /** Which excluded terms matched (for diagnostics). */
  matches: Array<{ chunk_id: string; term: string }>;
}

/**
 * Escape regex special characters in a string.
 */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Enforce S.I.R.E. exclusions on a set of retrieved chunks.
 *
 * For each chunk, if its content contains any term from the excluded list
 * (case-insensitive, word-boundary match), the chunk is purged.
 *
 * Chunks with empty excluded arrays pass unconditionally.
 *
 * @param chunks - Retrieved chunks from match_corpus_chunks or match_corpus_chunks_hybrid
 * @param excluded - The excluded terms array from the winning subject's S.I.R.E. metadata.
 *                   If not provided, uses each chunk's own sire_excluded.
 * @returns Enforcement result with passed/purged chunks and match diagnostics.
 */
export function enforceExclusions(
  chunks: RetrievedChunk[],
  excluded?: string[],
): SireEnforcementResult {
  const passed: RetrievedChunk[] = [];
  const purged: RetrievedChunk[] = [];
  const matches: Array<{ chunk_id: string; term: string }> = [];

  for (const chunk of chunks) {
    const terms = excluded ?? chunk.sire_excluded;

    if (!terms || terms.length === 0) {
      passed.push(chunk);
      continue;
    }

    const lower = chunk.content.toLowerCase();
    let excluded_by: string | null = null;

    for (const term of terms) {
      const pattern = new RegExp(`\\b${escapeRegex(term)}\\b`, "iu");
      if (pattern.test(lower)) {
        excluded_by = term;
        break;
      }
    }

    if (excluded_by) {
      purged.push(chunk);
      matches.push({ chunk_id: chunk.chunk_id, term: excluded_by });
    } else {
      passed.push(chunk);
    }
  }

  return { passed, purged, matches };
}
