import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  pobleSchema,
  estacionsSchema,
  activitatsSchema,
  negocisSchema,
  anuncisSchema,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content", "ca");

async function readJSON<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export async function getPoble() {
  return pobleSchema.parse(await readJSON<unknown>("poble.json"));
}

export async function getEstacions() {
  const parsed = estacionsSchema.parse(await readJSON<unknown>("estacions.json"));
  return [...parsed].sort((a, b) => a.ordre - b.ordre);
}

export async function getEstacio(slug: string) {
  return (await getEstacions()).find((e) => e.slug === slug) ?? null;
}

export async function getActivitats() {
  return activitatsSchema.parse(await readJSON<unknown>("activitats.json"));
}

export async function getActivitat(slug: string) {
  return (await getActivitats()).find((a) => a.slug === slug) ?? null;
}

export async function getNegocis() {
  return negocisSchema.parse(await readJSON<unknown>("negocis.json"));
}

export async function getNegoci(slug: string) {
  return (await getNegocis()).find((n) => n.slug === slug) ?? null;
}

export async function getAnuncis() {
  return anuncisSchema.parse(await readJSON<unknown>("anuncis.json"));
}
