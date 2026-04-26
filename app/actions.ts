"use server";

import { revalidatePath } from "next/cache";
import { addInscripcio, countInscripcions } from "@/lib/inscripcions";
import { getActivitat } from "@/lib/content";

export interface InscripcioState {
  ok: boolean;
  message?: string;
}

export async function inscriureAction(
  _prev: InscripcioState | null,
  formData: FormData,
): Promise<InscripcioState> {
  const slug = String(formData.get("slug") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const acompanyants = Math.max(
    0,
    Math.min(20, Number(formData.get("acompanyants") ?? 0) || 0),
  );
  const comentari = String(formData.get("comentari") ?? "").trim();

  if (!nom) return { ok: false, message: "Cal el nom." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Email no vàlid." };
  }

  const activitat = await getActivitat(slug);
  if (!activitat) return { ok: false, message: "Activitat no trobada." };
  if (!activitat.inscripcionsObertes) {
    return { ok: false, message: "Inscripcions tancades." };
  }

  if (activitat.capacitat && activitat.capacitat > 0) {
    const ja = await countInscripcions(slug);
    if (ja + 1 + acompanyants > activitat.capacitat) {
      return {
        ok: false,
        message: `Només queden ${activitat.capacitat - ja} places.`,
      };
    }
  }

  await addInscripcio({
    activitatSlug: slug,
    nom,
    email,
    telefon: telefon || undefined,
    acompanyants,
    comentari: comentari || undefined,
  });

  revalidatePath(`/activitats/${slug}`);
  revalidatePath("/admin/activitats");

  return { ok: true, message: "Inscripció rebuda. Gràcies!" };
}
