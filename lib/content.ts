import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import {
  pobleSchema,
  estacionsSchema,
  activitatsSchema,
  negocisSchema,
  anuncisSchema,
} from "./schemas";

async function readContent<T>(key: string): Promise<T> {
  const { data, error } = await supabaseAdmin
    .from("content")
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return (data?.data ?? null) as T;
}

export async function getPoble() {
  return pobleSchema.parse(await readContent<unknown>("poble"));
}

export async function getEstacions() {
  const parsed = estacionsSchema.parse(await readContent<unknown>("estacions"));
  return [...parsed].sort((a, b) => a.ordre - b.ordre);
}

export async function getEstacio(slug: string) {
  return (await getEstacions()).find((e) => e.slug === slug) ?? null;
}

export async function getActivitats() {
  return activitatsSchema.parse(await readContent<unknown>("activitats"));
}

export async function getActivitat(slug: string) {
  return (await getActivitats()).find((a) => a.slug === slug) ?? null;
}

export async function getNegocis() {
  return negocisSchema.parse(await readContent<unknown>("negocis"));
}

export async function getNegoci(slug: string) {
  return (await getNegocis()).find((n) => n.slug === slug) ?? null;
}

export async function getAnuncis() {
  return anuncisSchema.parse(await readContent<unknown>("anuncis"));
}
