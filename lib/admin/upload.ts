import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_BYTES = 12 * 1024 * 1024;

const ALLOWED_FOLDERS = new Set([
  "hero",
  "estacions",
  "activitats",
  "negocis",
  "poble",
]);

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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

  const targetDir = path.join(process.cwd(), "public", "images", folder);
  await fs.mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(targetDir, filename), buffer);

  return `/images/${folder}/${filename}`;
}
