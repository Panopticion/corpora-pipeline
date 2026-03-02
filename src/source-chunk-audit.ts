import { createHash } from "node:crypto";

export interface SourceChunk {
  sequence: number;
  sourceText: string;
  sourceHash: string;
}

export interface ChunkAuditResult {
  sequence: number;
  sourceText: string;
  aiText: string;
  recoveredText: string;
  sourceHash: string;
  aiHash: string;
  coverageRatio: number;
  omissionDetected: boolean;
  recoveredFromSource: boolean;
  warnings: string[];
}

interface SplitOptions {
  targetChars?: number;
  maxChars?: number;
}

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function normalizeForCoverage(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function computeCoverageRatio(sourceText: string, aiText: string): number {
  const sourceTokens = normalizeForCoverage(sourceText);
  if (sourceTokens.length === 0) return 1;

  const aiTokenSet = new Set(normalizeForCoverage(aiText));
  let matched = 0;
  for (const token of new Set(sourceTokens)) {
    if (aiTokenSet.has(token)) matched += 1;
  }

  return matched / new Set(sourceTokens).size;
}

function softClamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function hashSync(text: string): string {
  return sha256(text);
}

export function splitSourceTextIntoChunks(
  sourceText: string,
  options: SplitOptions = {},
): SourceChunk[] {
  const targetChars = options.targetChars ?? 8_000;
  const maxChars = options.maxChars ?? 12_000;

  const paragraphs = sourceText
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return [
      {
        sequence: 0,
        sourceText: sourceText,
        sourceHash: hashSync(sourceText),
      },
    ];
  }

  const chunks: SourceChunk[] = [];
  let current: string[] = [];
  let currentLen = 0;

  const flush = () => {
    if (current.length === 0) return;
    const text = current.join("\n\n");
    chunks.push({
      sequence: chunks.length,
      sourceText: text,
      sourceHash: hashSync(text),
    });
    current = [];
    currentLen = 0;
  };

  for (const paragraph of paragraphs) {
    const paraLen = paragraph.length;

    if (paraLen >= maxChars) {
      flush();
      for (let cursor = 0; cursor < paragraph.length; cursor += maxChars) {
        const slice = paragraph.slice(cursor, cursor + maxChars);
        chunks.push({
          sequence: chunks.length,
          sourceText: slice,
          sourceHash: hashSync(slice),
        });
      }
      continue;
    }

    const projected = currentLen + paraLen + (current.length > 0 ? 2 : 0);
    if (projected > maxChars || (currentLen >= targetChars && projected > targetChars)) {
      flush();
    }

    current.push(paragraph);
    currentLen += paraLen + (current.length > 1 ? 2 : 0);
  }

  flush();

  return chunks;
}

export function auditAndRecoverChunk(
  sourceChunk: SourceChunk,
  aiTextRaw: string,
): ChunkAuditResult {
  const aiText = aiTextRaw.trim();
  const coverageRatio = softClamp01(computeCoverageRatio(sourceChunk.sourceText, aiText));
  const lengthRatio = sourceChunk.sourceText.length === 0
    ? 1
    : aiText.length / sourceChunk.sourceText.length;

  const warnings: string[] = [];
  const lowCoverage = coverageRatio < 0.82;
  const aggressiveCompression = lengthRatio < 0.55;
  const omissionDetected = lowCoverage || aggressiveCompression;

  if (lowCoverage) {
    warnings.push(`coverage_ratio_low:${coverageRatio.toFixed(4)}`);
  }
  if (aggressiveCompression) {
    warnings.push(`length_ratio_low:${lengthRatio.toFixed(4)}`);
  }

  const recoveredFromSource = omissionDetected;
  const recoveredText = recoveredFromSource ? sourceChunk.sourceText : aiText;

  return {
    sequence: sourceChunk.sequence,
    sourceText: sourceChunk.sourceText,
    aiText,
    recoveredText,
    sourceHash: sourceChunk.sourceHash,
    aiHash: hashSync(aiText),
    coverageRatio,
    omissionDetected,
    recoveredFromSource,
    warnings,
  };
}
