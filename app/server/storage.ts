/**
 * Supabase Storage helpers for corpus document uploads.
 *
 * All mutations use the service_role client (bypasses RLS).
 * Authenticated access is scoped to organization paths via storage RLS policies.
 */

import { getSupabaseService } from "@/lib/supabase";

const BUCKET = "corpus-uploads";
const SIGNED_URL_EXPIRY_SECONDS = 600; // 10 minutes — enough for Firecrawl to fetch
const DOWNLOAD_URL_EXPIRY_SECONDS = 3600; // 1 hour — for user downloads

/**
 * Build a scoped storage path.
 *
 * Format: {org_id}/{session_id}/{document_id}/{sanitized_filename}
 * The org_id prefix enables org-scoped RLS on storage.objects.
 */
export function buildStoragePath(
  orgId: string | null,
  sessionId: string,
  documentId: string,
  fileName: string,
): string {
  const orgSegment = orgId ?? "no-org";
  // Strip path traversal and unsafe characters, preserve extension
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
  return `${orgSegment}/${sessionId}/${documentId}/${safeName}`;
}

/**
 * Upload a file buffer to the corpus-uploads bucket.
 * Uses service_role client — bypasses storage RLS.
 */
export async function uploadFileToBucket(
  storagePath: string,
  fileBuffer: Buffer,
  contentType: string,
): Promise<void> {
  const service = getSupabaseService();
  const { error } = await service.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }
}

/**
 * Create a short-lived signed URL for Firecrawl to fetch.
 * 10-minute expiry — single use, server-side only.
 */
export async function getSignedUrl(storagePath: string): Promise<string> {
  const service = getSupabaseService();
  const { data, error } = await service.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_EXPIRY_SECONDS);

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to create signed URL: ${error?.message ?? "unknown"}`);
  }

  return data.signedUrl;
}

/**
 * Create a signed download URL for the user to retrieve their original file.
 * 1-hour expiry.
 */
export async function getDownloadSignedUrl(storagePath: string): Promise<string> {
  const service = getSupabaseService();
  const { data, error } = await service.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, DOWNLOAD_URL_EXPIRY_SECONDS);

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to create download URL: ${error?.message ?? "unknown"}`);
  }

  return data.signedUrl;
}

/**
 * Delete a single file from the bucket. Best-effort — logs but does not throw.
 */
export async function deleteStorageFile(storagePath: string): Promise<void> {
  const service = getSupabaseService();
  const { error } = await service.storage
    .from(BUCKET)
    .remove([storagePath]);

  if (error) {
    console.warn(`[storage] Failed to delete ${storagePath}: ${error.message}`);
  }
}

/**
 * Delete multiple files from the bucket. Best-effort — logs but does not throw.
 */
export async function deleteStorageFiles(storagePaths: string[]): Promise<void> {
  if (storagePaths.length === 0) return;

  const service = getSupabaseService();
  const { error } = await service.storage
    .from(BUCKET)
    .remove(storagePaths);

  if (error) {
    console.warn(`[storage] Failed to bulk delete ${storagePaths.length} files: ${error.message}`);
  }
}
