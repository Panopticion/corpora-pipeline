import { createClient } from "@supabase/supabase-js";
import { reparseDocument } from "../src/sessions.js";

const client = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const docId = "192eb5fc-9323-4b84-b920-0247086e1ce3";

console.log("Starting reparse for", docId);
const start = Date.now();

try {
  const result = await reparseDocument(client, docId, {
    openrouterApiKey: process.env.OPENROUTER_API_KEY!,
  });
  console.log("Done in", ((Date.now() - start) / 1000).toFixed(1) + "s");
  console.log("Model:", result.model);
  console.log(
    "Tokens:",
    result.inputTokens,
    "in /",
    result.outputTokens,
    "out",
  );
} catch (err: unknown) {
  console.error("Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
}
