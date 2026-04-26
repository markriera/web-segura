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
  type CollectionKey,
} from "@/lib/admin/store";
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

export async function deleteItemAction(formData: FormData) {
  await ensureAuth();
  const entity = String(formData.get("__entity") ?? "") as CollectionKey;
  const key = String(formData.get("__key") ?? "");
  await deleteItem(entity, key);
  revalidatePath("/", "layout");
  revalidatePath("/[locale]", "layout");
  redirect(`/admin/${entity}?deleted=1`);
}
