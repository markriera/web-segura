import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { inscripcionsSchema, inscripcioSchema } from "./schemas";
import type { Inscripcio } from "@/types/content";

const FILE = path.join(process.cwd(), "content", "ca", "inscripcions.json");

async function readAll(): Promise<Inscripcio[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return inscripcionsSchema.parse(JSON.parse(raw));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(items: Inscripcio[]): Promise<void> {
  inscripcionsSchema.parse(items);
  await fs.writeFile(FILE, JSON.stringify(items, null, 2) + "\n", "utf-8");
}

export async function getInscripcions(activitatSlug?: string) {
  const all = await readAll();
  if (!activitatSlug) return all;
  return all.filter((i) => i.activitatSlug === activitatSlug);
}

export async function countInscripcions(activitatSlug: string) {
  const items = await getInscripcions(activitatSlug);
  return items.reduce((sum, i) => sum + 1 + i.acompanyants, 0);
}

export async function addInscripcio(input: Omit<Inscripcio, "id" | "creatA">) {
  const item: Inscripcio = {
    ...input,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    creatA: new Date().toISOString(),
  };
  inscripcioSchema.parse(item);
  const all = await readAll();
  all.push(item);
  await writeAll(all);
  return item;
}

export async function deleteInscripcio(id: string) {
  const all = await readAll();
  await writeAll(all.filter((i) => i.id !== id));
}
