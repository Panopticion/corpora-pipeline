import { createClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function isGenericUploadName(name: string): boolean {
  return /^upload(\.[A-Za-z0-9]+)?$/i.test(name);
}

async function main() {
  const supabaseUrl = getEnv("VITE_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const cutoffIso = new Date(Date.now() - 30 * 60 * 1000).toISOString();

  const { data: staleUploading, error: staleErr } = await client
    .from("corpus_parse_sessions")
    .select("id, created_at")
    .eq("status", "uploading")
    .lt("created_at", cutoffIso);
  if (staleErr) throw staleErr;

  let staleUploadingWithZeroDocs = 0;
  for (const s of staleUploading || []) {
    const { count, error: countErr } = await client
      .from("corpus_session_documents")
      .select("id", { count: "exact", head: true })
      .eq("session_id", s.id);
    if (countErr) throw countErr;
    if ((count || 0) === 0) staleUploadingWithZeroDocs += 1;
  }

  const { data: docs, error: docsErr } = await client
    .from("corpus_session_documents")
    .select("session_id, source_filename");
  if (docsErr) throw docsErr;

  const grouped = new Map<string, number>();
  for (const d of docs || []) {
    const name = String(d.source_filename || "");
    if (!isGenericUploadName(name)) continue;
    const key = `${d.session_id}:::${name.toLowerCase()}`;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  }

  let duplicateGenericFilenameGroups = 0;
  for (const count of grouped.values()) {
    if (count > 1) duplicateGenericFilenameGroups += 1;
  }

  console.log(
    JSON.stringify(
      {
        stale_uploading_zero_doc_sessions: staleUploadingWithZeroDocs,
        duplicate_generic_upload_filename_groups: duplicateGenericFilenameGroups,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error("cleanup verification failed:", err?.message || err);
  process.exit(1);
});
