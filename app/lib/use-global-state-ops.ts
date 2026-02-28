import { useCallback } from "react";
import {
  getGlobalDocumentStateResult,
  runGlobalStateAction,
} from "@/server/session-actions";
import type {
  GlobalStateActionRequest,
  GlobalStateActionResponse,
  GlobalStateQuery,
  GlobalStateResponse,
  ServerResult,
} from "@/lib/global-state-types";

function unwrapServerResult<T>(result: ServerResult<T>): T {
  if (result.ok) return result.data;
  throw new Error(result.error.message);
}

export function useGlobalStateOps() {
  const refresh = useCallback(async (query: GlobalStateQuery): Promise<GlobalStateResponse> => {
    const result = await getGlobalDocumentStateResult({ data: query });
    return unwrapServerResult(result);
  }, []);

  const runAction = useCallback(async (request: GlobalStateActionRequest): Promise<GlobalStateActionResponse> => {
    const result = await runGlobalStateAction({ data: request });
    return unwrapServerResult(result);
  }, []);

  return {
    refresh,
    runAction,
  };
}
