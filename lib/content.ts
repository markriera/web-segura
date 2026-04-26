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

const CONTENT_ROOT = path.join(process.cwd(), "content", "ca");

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(
    path.join(CONTENT_ROOT, `${file}.json`),
    "utf-8",
  );
  return JSON.parse(raw) as T;
}

export async function getPoble() {
  return pobleSchema.parse(await readJson<unknown>("poble"));
}

export async function getEstacions() {
  const parsed = estacionsSchema.parse(await readJson<unknown>("estacions"));
  return [...parsed].sort((a, b) => a.ordre - b.ordre);
}

export async function getEstacio(slug: string) {
  return (await getEstacions()).find((e) => e.slug === slug) ?? null;
}

export async function getActivitats() {
  return activitatsSchema.parse(await readJson<unknown>("activitats"));
}

export async function getActivitat(slug: string) {
  return (await getActivitats()).find((a) => a.slug === slug) ?? null;
}

export async function getNegocis() {
  return negocisSchema.parse(await readJson<unknown>("negocis"));
}

export async function getNegoci(slug: string) {
  return (await getNegocis()).find((n) => n.slug === slug) ?? null;
}

export async function getAnuncis() {
  return anuncisSchema.parse(await readJson<unknown>("anuncis"));
}
