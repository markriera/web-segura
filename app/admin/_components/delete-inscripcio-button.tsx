"use client";

import { deleteInscripcioAction } from "../actions";

export function DeleteInscripcioButton({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  return (
    <form
      action={deleteInscripcioAction}
      onSubmit={(e) => {
        if (!confirm("Esborrar aquesta inscripció?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="__id" value={id} />
      <input type="hidden" name="__slug" value={slug} />
      <button
        type="submit"
        className="text-xs font-mono uppercase tracking-[0.18em] text-stone hover:text-rust"
      >
        Esborra
      </button>
    </form>
  );
}
