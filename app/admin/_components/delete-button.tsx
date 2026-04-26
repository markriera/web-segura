"use client";

import { deleteItemAction } from "../actions";

export function DeleteButton({
  entity,
  itemKey,
}: {
  entity: string;
  itemKey: string;
}) {
  return (
    <form
      action={deleteItemAction}
      onSubmit={(e) => {
        if (!confirm("Segur que vols esborrar aquest element?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="__entity" value={entity} />
      <input type="hidden" name="__key" value={itemKey} />
      <button
        type="submit"
        className="inline-flex h-11 items-center rounded-md border-2 border-rust/30 px-4 text-sm font-semibold text-rust hover:border-rust hover:bg-rust hover:text-bone transition-colors"
      >
        Esborra
      </button>
    </form>
  );
}
