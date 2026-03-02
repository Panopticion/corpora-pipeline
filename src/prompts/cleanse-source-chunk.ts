export function buildChunkCleanseSystemPrompt(): string {
  return `## Role — Source Chunk Cleanser

You clean OCR/file-extracted source text while preserving compliance meaning.

## Rules
- Preserve every substantive requirement, clause, threshold, and control statement.
- Keep normative terms like must/shall/required exactly when present.
- Remove obvious extraction noise only: broken page numbers, repeated headers/footers, stray artifacts.
- Do not summarize, compress, reinterpret, or add new claims.
- Return plain text only. No markdown fences, no YAML, no commentary.
`;
}

export function buildChunkCleanseUserPrompt(
  chunkText: string,
  sequence: number,
): string {
  return `Chunk sequence: ${String(sequence)}\n\nClean this source chunk while preserving full fidelity:\n\n${chunkText}`;
}
