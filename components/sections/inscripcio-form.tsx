"use client";

import { useActionState } from "react";
import { inscriureAction, type InscripcioState } from "@/app/actions";

interface Props {
  slug: string;
  capacitat?: number;
  inscritsActuals: number;
}

const initial: InscripcioState | null = null;

export function InscripcioForm({ slug, capacitat, inscritsActuals }: Props) {
  const [state, formAction, isPending] = useActionState(
    inscriureAction,
    initial,
  );

  const placesLliures =
    capacitat && capacitat > 0
      ? Math.max(0, capacitat - inscritsActuals)
      : null;
  const ple = placesLliures !== null && placesLliures === 0;

  if (state?.ok) {
    return (
      <div className="rounded-md border-2 border-moss bg-moss/10 p-8 text-center">
        <p className="font-display text-2xl text-moss">Gràcies!</p>
        <p className="mt-3 text-base text-ink">
          Hem rebut la teva inscripció. Et veiem ben aviat.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="slug" value={slug} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom i cognoms" name="nom" required />
        <Field label="Correu electrònic" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telèfon (opcional)" name="telefon" type="tel" />
        <Field
          label="Quants veniu en total?"
          name="acompanyants"
          type="number"
          defaultValue="0"
          min={0}
          max={20}
          hint="Inclou-te a tu sumant els acompanyants. Ex: 0 si vens sol/a, 2 si veniu 3."
        />
      </div>
      <Field label="Comentari (opcional)" name="comentari" textarea />

      {state && !state.ok && state.message && (
        <p className="text-sm font-medium text-rust">{state.message}</p>
      )}

      {placesLliures !== null && (
        <p className="text-sm text-stone">
          {ple
            ? "Aforament complet."
            : `Queden ${placesLliures} places disponibles.`}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || ple}
        className="inline-flex h-14 items-center justify-center rounded-full bg-ink px-10 text-base font-semibold text-bone hover:bg-moss disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {isPending ? "Enviant…" : "Confirma la inscripció"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  textarea = false,
  hint,
  defaultValue,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  hint?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/80">
        {label}
        {required && <span className="ml-1 text-rust">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className="mt-2 block w-full resize-y border-2 border-ink/20 bg-bone px-4 py-3 text-base text-ink focus:border-ink focus:outline-none rounded-md"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          min={min}
          max={max}
          className="mt-2 block h-12 w-full border-2 border-ink/20 bg-bone px-4 text-base text-ink focus:border-ink focus:outline-none rounded-md"
        />
      )}
      {hint && <span className="mt-1 block text-xs text-stone">{hint}</span>}
    </label>
  );
}
