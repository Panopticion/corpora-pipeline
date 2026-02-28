import { useCallback } from "react";
import {
  generateEncyclopediaCrosswalkResult,
  removeEncyclopediaEntryResult,
} from "@/server/session-actions";
import type { ServerResult } from "@/lib/global-state-types";

function unwrapServerResult<T>(result: ServerResult<T>): T {
  if (result.ok) return result.data;
  throw new Error(result.error.message);
}

export function useEncyclopediaOps() {
  const removeEncyclopediaEntry = useCallback(async (data: { entryId: string }) => {
    const result = await removeEncyclopediaEntryResult({ data });
    return unwrapServerResult(result);
  }, []);

  const generateEncyclopediaCrosswalk = useCallback(async (data: { entryIds: string[] }) => {
    const result = await generateEncyclopediaCrosswalkResult({ data });
    return unwrapServerResult(result);
  }, []);

  return {
    removeEncyclopediaEntry,
    generateEncyclopediaCrosswalk,
  };
}
