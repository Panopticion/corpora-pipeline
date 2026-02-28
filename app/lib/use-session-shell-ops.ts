import { useCallback } from "react";
import {
  getSessionWithDocumentsResult,
  recordSessionQualitySnapshotResult,
  renameSessionResult,
  toggleSessionPublicResult,
} from "@/server/session-actions";
import type { ServerResult } from "@/lib/global-state-types";

function unwrapServerResult<T>(result: ServerResult<T>): T {
  if (result.ok) return result.data;
  throw new Error(result.error.message);
}

type QualitySnapshotInput = {
  sessionId: string;
  metrics: {
    quality: {
      parseAccuracy: number;
      chunkCoverage: number;
      watermarkIntegrity: number;
      promotionReadiness: number;
      overall: number;
    };
    gatePass: {
      parse: boolean;
      chunk: boolean;
      watermark: boolean;
      promote: boolean;
    };
    counts: {
      totalDocs: number;
      promotedWatermarkedDocs: number;
    };
    canGenerateCrosswalk: boolean;
    sessionStatus: "uploading" | "complete" | "crosswalk_pending" | "crosswalk_done" | "archived";
    crosswalkPresent: boolean;
  };
};

export function useSessionShellOps() {
  const getSessionWithDocuments = useCallback(async (data: { sessionId: string }) => {
    const result = await getSessionWithDocumentsResult({ data });
    return unwrapServerResult(result);
  }, []);

  const renameSession = useCallback(async (data: { sessionId: string; name: string }) => {
    const result = await renameSessionResult({ data });
    return unwrapServerResult(result);
  }, []);

  const toggleSessionPublic = useCallback(async (data: { sessionId: string; isPublic: boolean }) => {
    const result = await toggleSessionPublicResult({ data });
    return unwrapServerResult(result);
  }, []);

  const recordSessionQualitySnapshot = useCallback(async (data: QualitySnapshotInput) => {
    const result = await recordSessionQualitySnapshotResult({ data });
    return unwrapServerResult(result);
  }, []);

  return {
    getSessionWithDocuments,
    renameSession,
    toggleSessionPublic,
    recordSessionQualitySnapshot,
  };
}
