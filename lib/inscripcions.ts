import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import { inscripcioSchema } from "./schemas";
import type { Inscripcio } from "@/types/content";

type Row = {
  id: string;
  activitat_slug: string;
  nom: string;
  email: string;
  telefon: string | null;
  acompanyants: number;
  comentaris: string | null;
  creat_a: string;
};

function rowToInscripcio(r: Row): Inscripcio {
  return {
    id: r.id,
    activitatSlug: r.activitat_slug,
    nom: r.nom,
    email: r.email,
    telefon: r.telefon ?? undefined,
    acompanyants: r.acompanyants,
    comentari: r.comentaris ?? undefined,
    creatA: r.creat_a,
  };
}

export async function getInscripcions(activitatSlug?: string) {
  try {
    let q = supabaseAdmin
      .from("inscripcions")
      .select("*")
      .order("creat_a", { ascending: false });
    if (activitatSlug) q = q.eq("activitat_slug", activitatSlug);
    const { data, error } = await q;
    if (error) throw error;
    return (data as Row[]).map(rowToInscripcio);
  } catch (err) {
    console.warn("[inscripcions] getInscripcions failed:", err);
    return [] as Inscripcio[];
  }
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
  const { error } = await supabaseAdmin.from("inscripcions").insert({
    id: item.id,
    activitat_slug: item.activitatSlug,
    nom: item.nom,
    email: item.email,
    telefon: item.telefon ?? null,
    acompanyants: item.acompanyants,
    comentaris: item.comentari ?? null,
    creat_a: item.creatA,
  });
  if (error) throw error;
  return item;
}

export async function deleteInscripcio(id: string) {
  const { error } = await supabaseAdmin
    .from("inscripcions")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
