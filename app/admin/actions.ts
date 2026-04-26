"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/admin/auth";
import {
  upsertItem,
  deleteItem,
  writePoble,
  readCollection,
  ENTITIES,
  type CollectionKey,
} from "@/lib/admin/store";
import { supabaseAdmin } from "@/lib/supabase";
import { deleteInscripcio } from "@/lib/inscripcions";
import { pobleSchema } from "@/lib/schemas";

async function ensureAuth() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function savePobleAction(formData: FormData) {
  await ensureAuth();
  const json = String(formData.get("__data") ?? "");
  const parsed = pobleSchema.parse(JSON.parse(json));
  await writePoble(parsed);
  revalidatePath("/", "layout");
  revalidatePath("/[locale]", "layout");
  redirect("/admin/poble?saved=1");
}

export async function saveItemAction(formData: FormData) {
  await ensureAuth();
  const entity = String(formData.get("__entity") ?? "") as CollectionKey;
  const originalKey = formData.get("__originalKey")
    ? String(formData.get("__originalKey"))
    : null;
  const data = JSON.parse(String(formData.get("__data") ?? ""));
  await upsertItem(entity, data, originalKey);
  revalidatePath("/", "layout");
  revalidatePath("/[locale]", "layout");
  redirect(`/admin/${entity}?saved=1`);
}

export async function deleteInscripcioAction(formData: FormData) {
  await ensureAuth();
  const id = String(formData.get("__id") ?? "");
  const slug = String(formData.get("__slug") ?? "");
  await deleteInscripcio(id);
  revalidatePath(`/admin/activitats/${slug}/inscripcions`);
  revalidatePath(`/activitats/${slug}`);
  redirect(`/admin/activitats/${slug}/inscripcions?deleted=1`);
}

export async function moveItemAction(formData: FormData) {
  await ensureAuth();
  const entity = String(formData.get("__entity") ?? "") as CollectionKey;
  const key = String(formData.get("__key") ?? "");
  const dir = String(formData.get("__dir") ?? "");
  const items = (await readCollection(entity)) as Array<{
    slug?: string;
    id?: string;
  }>;
  const idx = items.findIndex((it) => it.slug === key || it.id === key);
  if (idx < 0) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= items.length) return;
  [items[idx], items[swap]] = [items[swap]!, items[idx]!];

  const cfg = ENTITIES[entity];
  await supabaseAdmin.from("content").upsert({
    key: cfg.key,
    data: items,
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/", "layout");
  revalidatePath("/[locale]", "layout");
  revalidatePath(`/admin/${entity}`);
}

export async function deleteItemAction(formData: FormData) {
  await ensureAuth();
  const entity = String(formData.get("__entity") ?? "") as CollectionKey;
  const key = String(formData.get("__key") ?? "");
  await deleteItem(entity, key);
  revalidatePath("/", "layout");
  revalidatePath("/[locale]", "layout");
  redirect(`/admin/${entity}?deleted=1`);
}
