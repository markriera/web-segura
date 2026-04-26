import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
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

export const ENTITIES = {
  poble: { key: "poble", schema: pobleSchema, listSchema: null },
  estacions: {
    key: "estacions",
    schema: estacioSchema,
    listSchema: estacionsSchema,
  },
  activitats: {
    key: "activitats",
    schema: activitatSchema,
    listSchema: activitatsSchema,
  },
  serveis: { key: "negocis", schema: negociSchema, listSchema: negocisSchema },
  anuncis: {
    key: "anuncis",
    schema: anunciSchema,
    listSchema: anuncisSchema,
  },
} as const;

export type EntityKey = keyof typeof ENTITIES;
export type CollectionKey = Exclude<EntityKey, "poble">;

async function readContent(key: string): Promise<unknown> {
  const { data, error } = await supabaseAdmin
    .from("content")
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return data?.data ?? null;
}

async function writeContent(key: string, value: unknown): Promise<void> {
  const { error } = await supabaseAdmin
    .from("content")
    .upsert({ key, data: value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function readPoble() {
  const raw = await readContent("poble");
  return pobleSchema.parse(raw);
}

export async function writePoble(data: z.infer<typeof pobleSchema>) {
  const validated = pobleSchema.parse(data);
  await writeContent("poble", validated);
}

export async function readCollection(key: CollectionKey) {
  const cfg = ENTITIES[key];
  const raw = (await readContent(cfg.key)) ?? [];
  return cfg.listSchema.parse(raw);
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
  await writeContent(cfg.key, items);
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
  await writeContent(cfg.key, filtered);
}
