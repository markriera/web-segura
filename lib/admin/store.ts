import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  pobleSchema,
  estacioSchema,
  estacionsSchema,
  activitatSchema,
  activitatsSchema,
  negociSchema,
  negocisSchema,
  anunciSchema,
  anuncisSchema,
} from "@/lib/schemas";
import type { z } from "zod";

const ROOT = path.join(process.cwd(), "content", "ca");

async function readFileJSON<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(ROOT, `${file}.json`), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeFileJSON(file: string, data: unknown): Promise<void> {
  const fullPath = path.join(ROOT, `${file}.json`);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export const ENTITIES = {
  poble: { file: "poble", schema: pobleSchema, listSchema: null },
  estacions: {
    file: "estacions",
    schema: estacioSchema,
    listSchema: estacionsSchema,
  },
  activitats: {
    file: "activitats",
    schema: activitatSchema,
    listSchema: activitatsSchema,
  },
  serveis: { file: "negocis", schema: negociSchema, listSchema: negocisSchema },
  anuncis: {
    file: "anuncis",
    schema: anunciSchema,
    listSchema: anuncisSchema,
  },
} as const;

export type EntityKey = keyof typeof ENTITIES;
export type CollectionKey = Exclude<EntityKey, "poble">;

export async function readPoble() {
  const data = await readFileJSON<unknown>("poble");
  return pobleSchema.parse(data);
}

export async function writePoble(data: z.infer<typeof pobleSchema>) {
  const validated = pobleSchema.parse(data);
  await writeFileJSON("poble", validated);
}

export async function readCollection(key: CollectionKey) {
  const cfg = ENTITIES[key];
  const data = await readFileJSON<unknown>(cfg.file);
  return cfg.listSchema.parse(data);
}

export async function findItem(key: CollectionKey, slugOrId: string) {
  const items = await readCollection(key);
  return (
    (items as Array<{ slug?: string; id?: string }>).find(
      (it) => it.slug === slugOrId || it.id === slugOrId,
    ) ?? null
  );
}

export async function upsertItem(
  key: CollectionKey,
  item: unknown,
  originalKey: string | null,
) {
  const cfg = ENTITIES[key];
  const validated = cfg.schema.parse(item) as { slug?: string; id?: string };
  const items = (await readCollection(key)) as Array<{
    slug?: string;
    id?: string;
  }>;

  const matchKey = originalKey ?? (validated.slug ?? validated.id ?? "");
  const idx = items.findIndex(
    (it) => it.slug === matchKey || it.id === matchKey,
  );

  if (idx >= 0) {
    items[idx] = validated;
  } else {
    items.push(validated);
  }

  cfg.listSchema.parse(items);
  await writeFileJSON(cfg.file, items);
}

export async function deleteItem(key: CollectionKey, slugOrId: string) {
  const cfg = ENTITIES[key];
  const items = (await readCollection(key)) as Array<{
    slug?: string;
    id?: string;
  }>;
  const filtered = items.filter(
    (it) => it.slug !== slugOrId && it.id !== slugOrId,
  );
  cfg.listSchema.parse(filtered);
  await writeFileJSON(cfg.file, filtered);
}
