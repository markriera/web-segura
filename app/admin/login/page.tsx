import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";
import { loginAction } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone">
          Segura · Admin
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight">
          Entra al panell
        </h1>

        <form action={loginAction} className="mt-10 space-y-6">
          <label className="block">
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
              Contrasenya
            </span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="mt-2 block h-14 w-full border-2 border-ink/20 bg-bone px-4 text-base text-ink rounded-md focus:border-ink focus:outline-none"
            />
          </label>

          {error && (
            <p className="text-sm text-rust">Contrasenya incorrecta.</p>
          )}

          <button
            type="submit"
            className="inline-flex h-14 w-full items-center justify-center rounded-md bg-ink px-8 text-base font-semibold text-bone hover:bg-moss transition-colors shadow-sm"
          >
            Entra
          </button>
        </form>
      </div>
    </div>
  );
}
