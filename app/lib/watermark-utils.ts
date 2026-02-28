const TRAILING_WATERMARK_REGEX =
  /\n?<!-- corpus-watermark:(v\d+):([^:]+):(\d+):([a-f0-9]{16}) -->\s*$/;

export interface TrailingWatermarkInfo {
  version: string;
  corpusId: string;
  sequence: number;
  signature: string;
  comment: string;
}

export function stripTrailingWatermark(content: string): string {
  return content.replace(TRAILING_WATERMARK_REGEX, "").trimEnd();
}

export function extractTrailingWatermark(content: string): TrailingWatermarkInfo | null {
  const match = content.match(TRAILING_WATERMARK_REGEX);
  if (!match) return null;

  return {
    version: match[1],
    corpusId: match[2],
    sequence: Number.parseInt(match[3], 10),
    signature: match[4],
    comment: match[0].trim(),
  };
}
