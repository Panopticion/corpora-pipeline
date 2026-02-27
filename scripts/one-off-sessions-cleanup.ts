import { createClient } from "@supabase/supabase-js";

interface SessionRow {
  id: string;
  status: string;
  created_at: string;
  crosswalk_markdown: string | null;
}

interface DocRow {
  id: string;
  session_id: string;
  source_filename: string;
  created_at: string;
  status: string;
}

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function isGenericUploadName(name: string): boolean {
  return /^upload(\.[A-Za-z0-9]+)?$/i.test(name);
}

function buildRenamed(baseName: string, index: number): string {
  const match = baseName.match(/^(.*?)(\.[A-Za-z0-9]+)?$/);
  const stem = (match?.[1] || "upload").replace(/-\d+$/, "");
  const ext = match?.[2] || ".txt";
  return `${stem}-${index}${ext}`;
}

async function main() {
  const supabaseUrl = getEnv("VITE_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const now = Date.now();
  const cutoffIso = new Date(now - 30 * 60 * 1000).toISOString();

  let deletedEmptyUploading = 0;
  let reconciledToComplete = 0;
  let reconciledToCrosswalkDone = 0;
  let renamedGenericDuplicates = 0;

  // 1) Delete stale uploading sessions with zero docs
  const { data: uploadingSessions, error: uploadingErr } = await client
    .from("corpus_parse_sessions")
    .select("id, status, created_at, crosswalk_markdown")
    .eq("status", "uploading")
    .lt("created_at", cutoffIso);

  if (uploadingErr) throw uploadingErr;

  for (const session of (uploadingSessions || []) as SessionRow[]) {
    const { count, error: countErr } = await client
      .from("corpus_session_documents")
      .select("id", { count: "exact", head: true })
      .eq("session_id", session.id);
    if (countErr) throw countErr;

    if ((count || 0) === 0) {
      const { error: delErr } = await client
        .from("corpus_parse_sessions")
        .delete()
        .eq("id", session.id);
      if (delErr) throw delErr;
      deletedEmptyUploading += 1;
      continue;
    }

    // 2) Reconcile stuck uploading statuses when docs exist
    if (session.crosswalk_markdown) {
      const { error: updErr } = await client
        .from("corpus_parse_sessions")
        .update({ status: "crosswalk_done" })
        .eq("id", session.id)
        .eq("status", "uploading");
      if (updErr) throw updErr;
      reconciledToCrosswalkDone += 1;
      continue;
    }

    const { data: pendingDocs, error: pendingErr } = await client
      .from("corpus_session_documents")
      .select("id")
      .eq("session_id", session.id)
      .in("status", ["pending", "parsing"]) 
      .limit(1);
    if (pendingErr) throw pendingErr;

    if (!pendingDocs || pendingDocs.length === 0) {
      const { error: updErr } = await client
        .from("corpus_parse_sessions")
        .update({ status: "complete" })
        .eq("id", session.id)
        .eq("status", "uploading");
      if (updErr) throw updErr;
      reconciledToComplete += 1;
    }
  }

  // 3) Rename duplicate generic upload filenames within each session
  const { data: docs, error: docsErr } = await client
    .from("corpus_session_documents")
    .select("id, session_id, source_filename, created_at, status")
    .order("session_id", { ascending: true })
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (docsErr) throw docsErr;

  const groups = new Map<string, DocRow[]>();
  for (const row of (docs || []) as DocRow[]) {
    if (!isGenericUploadName(row.source_filename)) continue;
    const key = `${row.session_id}:::${row.source_filename.toLowerCase()}`;
    const arr = groups.get(key) || [];
    arr.push(row);
    groups.set(key, arr);
  }

  for (const [, rows] of groups) {
    if (rows.length <= 1) continue;
    for (let i = 1; i < rows.length; i += 1) {
      const row = rows[i];
      const newName = buildRenamed(row.source_filename, i + 1);
      const { error: updErr } = await client
        .from("corpus_session_documents")
        .update({ source_filename: newName })
        .eq("id", row.id);
      if (updErr) throw updErr;
      renamedGenericDuplicates += 1;
    }
  }

  console.log(
    JSON.stringify(
      {
        deleted_empty_uploading_sessions: deletedEmptyUploading,
        reconciled_sessions_to_complete: reconciledToComplete,
        reconciled_sessions_to_crosswalk_done: reconciledToCrosswalkDone,
        renamed_duplicate_generic_filenames: renamedGenericDuplicates,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error("one-off cleanup failed:", err?.message || err);
  process.exit(1);
});
