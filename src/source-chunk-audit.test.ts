import { describe, expect, it } from "vitest";
import {
  auditAndRecoverChunk,
  splitSourceTextIntoChunks,
} from "./source-chunk-audit";

describe("splitSourceTextIntoChunks", () => {
  it("preserves source order across chunks", () => {
    const source = [
      "Paragraph one with compliance control language and required records.",
      "Paragraph two defines retention windows and incident response obligations.",
      "Paragraph three sets review cadence and executive attestation requirements.",
    ].join("\n\n");

    const chunks = splitSourceTextIntoChunks(source, {
      targetChars: 60,
      maxChars: 90,
    });

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.map((chunk) => chunk.sourceText).join("\n\n")).toBe(source);
  });
});

describe("auditAndRecoverChunk", () => {
  it("keeps AI chunk when fidelity is high", () => {
    const sourceChunk = {
      sequence: 0,
      sourceText:
        "Controllers must retain audit logs for twelve months and review privileged actions weekly.",
      sourceHash: "hash-1",
    };

    const aiText =
      "Controllers must retain audit logs for twelve months and review privileged actions weekly.";

    const audit = auditAndRecoverChunk(sourceChunk, aiText);

    expect(audit.omissionDetected).toBe(false);
    expect(audit.recoveredFromSource).toBe(false);
    expect(audit.recoveredText).toBe(aiText);
    expect(audit.coverageRatio).toBeGreaterThan(0.9);
  });

  it("recovers from source when AI drops requirements", () => {
    const sourceChunk = {
      sequence: 2,
      sourceText:
        "The organization shall notify regulators within 72 hours, preserve evidence, and maintain immutable logs.",
      sourceHash: "hash-2",
    };

    const aiText = "The organization should notify quickly.";

    const audit = auditAndRecoverChunk(sourceChunk, aiText);

    expect(audit.omissionDetected).toBe(true);
    expect(audit.recoveredFromSource).toBe(true);
    expect(audit.recoveredText).toBe(sourceChunk.sourceText);
    expect(audit.warnings.length).toBeGreaterThan(0);
  });
});
