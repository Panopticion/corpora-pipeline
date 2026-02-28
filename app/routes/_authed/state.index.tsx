import { createFileRoute } from "@tanstack/react-router";
import { getGlobalDocumentState } from "@/server/session-actions";
import { GlobalStateDashboard } from "@/components/GlobalStateDashboard";
import type { GlobalStateQuery } from "@/lib/global-state-types";

const SITE_URL = "https://panopticonlabs.ai";

type StateSearch = GlobalStateQuery;

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return parsed;
}

function validateSearch(search: Record<string, unknown>): StateSearch {
  const stage = String(search.stage ?? "all");
  const preset = String(search.preset ?? "all");
  const sortKey = String(search.sortKey ?? "updatedAt");
  const sortDirection = String(search.sortDirection ?? "desc");

  return {
    query: String(search.query ?? ""),
    sessionId: String(search.sessionId ?? "all"),
    stage:
      stage === "failed" ||
      stage === "parse" ||
      stage === "chunk" ||
      stage === "watermark" ||
      stage === "promote" ||
      stage === "crosswalk" ||
      stage === "ready"
        ? stage
        : "all",
    framework: String(search.framework ?? "all"),
    preset:
      preset === "attention" ||
      preset === "in-progress" ||
      preset === "ready" ||
      preset === "failed"
        ? preset
        : "all",
    sortKey:
      sortKey === "sessionName" || sortKey === "stage" || sortKey === "status"
        ? sortKey
        : "updatedAt",
    sortDirection: sortDirection === "asc" ? "asc" : "desc",
    page: toPositiveInt(search.page, 1),
    pageSize: Math.min(200, Math.max(10, toPositiveInt(search.pageSize, 50))),
  };
}

export const Route = createFileRoute("/_authed/state/")({
  validateSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getGlobalDocumentState({ data: deps }),
  head: () => ({
    meta: [{ title: "Dashboard — Panopticon AI" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Dashboard",
            },
          ],
        }),
      },
    ],
  }),
  component: GlobalStateRoute,
});

function GlobalStateRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  return <GlobalStateDashboard data={data} initialQuery={search} />;
}
