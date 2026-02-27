import type { SessionDoc } from "@/lib/stores";

export interface WorkflowGate {
  id: "parse" | "chunk" | "watermark" | "promote";
  label: string;
  pass: boolean;
  detail: string;
}

export interface WorkflowReadiness {
  gates: WorkflowGate[];
  blockers: string[];
  promotedWatermarkedDocs: SessionDoc[];
  totalDocs: number;
  canGenerateCrosswalk: boolean;
  quality: {
    parseAccuracy: number;
    chunkCoverage: number;
    watermarkIntegrity: number;
    promotionReadiness: number;
    overall: number;
  };
}

function toPercent(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 100);
}

function isWatermarkValid(doc: SessionDoc): boolean {
  if (doc.status !== "watermarked") return false;
  if (!doc.chunks || doc.chunks.length === 0) return false;
  return doc.chunks.every((chunk) => /<!--\s*corpus-watermark:v1:[^\n]+-->\s*$/m.test(chunk.content));
}

export function computeWorkflowReadiness(documents: SessionDoc[]): WorkflowReadiness {
  const total = documents.length;
  const parseReady = documents.filter(
    (d) =>
      d.status === "parsed" ||
      d.status === "edited" ||
      d.status === "chunked" ||
      d.status === "watermarked",
  );
  const chunkReady = documents.filter(
    (d) => d.status === "chunked" || d.status === "watermarked",
  );
  const watermarked = documents.filter((d) => d.status === "watermarked");
  const promotedWatermarkedDocs = documents.filter(
    (d) => d.status === "watermarked" && Boolean(d.promotedAt),
  );
  const watermarkValidDocs = documents.filter((d) => isWatermarkValid(d));

  const parseGatePass = total > 0 && parseReady.length === total;
  const chunkGatePass = total > 0 && chunkReady.length === total;
  const watermarkGatePass = total > 0 && watermarked.length === total;
  const promoteGatePass = total > 0 && promotedWatermarkedDocs.length === total;

  const gates: WorkflowGate[] = [
    {
      id: "parse",
      label: "Parse reviewed",
      pass: parseGatePass,
      detail: `${String(parseReady.length)} / ${String(total)} ready`,
    },
    {
      id: "chunk",
      label: "Chunked",
      pass: chunkGatePass,
      detail: `${String(chunkReady.length)} / ${String(total)} chunked+`,
    },
    {
      id: "watermark",
      label: "Watermarked",
      pass: watermarkGatePass,
      detail: `${String(watermarked.length)} / ${String(total)} watermarked`,
    },
    {
      id: "promote",
      label: "Promoted",
      pass: promoteGatePass,
      detail: `${String(promotedWatermarkedDocs.length)} / ${String(total)} promoted+watermarked`,
    },
  ];

  const blockers: string[] = [];
  if (total < 2) blockers.push("Need at least 2 documents in this session.");
  if (!parseGatePass) blockers.push("Complete parse review for all documents.");
  if (!chunkGatePass) blockers.push("Chunk all documents.");
  if (!watermarkGatePass) blockers.push("Watermark all documents.");
  if (!promoteGatePass) blockers.push("Promote all watermarked documents to Encyclopedia.");
  if (promotedWatermarkedDocs.length < 2) {
    blockers.push("Need at least 2 promoted + watermarked documents.");
  }

  const parseAccuracy = toPercent(parseReady.length, total);
  const chunkCoverage = toPercent(chunkReady.length, total);
  const watermarkIntegrity = toPercent(watermarkValidDocs.length, total);
  const promotionReadiness = toPercent(promotedWatermarkedDocs.length, total);
  const overall = Math.round(
    (parseAccuracy + chunkCoverage + watermarkIntegrity + promotionReadiness) / 4,
  );

  return {
    gates,
    blockers,
    promotedWatermarkedDocs,
    totalDocs: total,
    canGenerateCrosswalk: blockers.length === 0,
    quality: {
      parseAccuracy,
      chunkCoverage,
      watermarkIntegrity,
      promotionReadiness,
      overall,
    },
  };
}