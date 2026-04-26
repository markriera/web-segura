import "server-only";
import path from "node:path";
import { supabaseAdmin } from "@/lib/supabase";

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_BYTES = 12 * 1024 * 1024;

const ALLOWED_FOLDERS = new Set([
  "hero",
  "estacions",
  "activitats",
  "negocis",
  "poble",
]);

const BUCKET = "images";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function contentType(ext: string): string {
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

export async function saveUploadedImage(
  file: File,
  folder: string,
): Promise<string> {
  if (!ALLOWED_FOLDERS.has(folder)) {
    throw new Error(`Carpeta no permesa: ${folder}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error("La imatge és massa gran (màx 12 MB).");
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    throw new Error(`Format no suportat: ${ext}`);
  }

  const base = slugify(path.basename(file.name, ext)) || "imatge";
  const stamp = Date.now().toString(36);
  const filename = `${base}-${stamp}${ext}`;
  const objectPath = `${folder}/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(objectPath, buffer, {
      contentType: contentType(ext),
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}
