"use client";

import { moveItemAction } from "../actions";

export function MoveButtons({
  entity,
  itemKey,
  isFirst,
  isLast,
}: {
  entity: string;
  itemKey: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <form action={moveItemAction}>
        <input type="hidden" name="__entity" value={entity} />
        <input type="hidden" name="__key" value={itemKey} />
        <input type="hidden" name="__dir" value="up" />
        <button
          type="submit"
          disabled={isFirst}
          aria-label="Mou amunt"
          className="flex h-5 w-7 items-center justify-center rounded border border-ink/15 text-xs text-stone hover:border-ink hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone disabled:cursor-not-allowed transition-colors"
        >
          ↑
        </button>
      </form>
      <form action={moveItemAction}>
        <input type="hidden" name="__entity" value={entity} />
        <input type="hidden" name="__key" value={itemKey} />
        <input type="hidden" name="__dir" value="down" />
        <button
          type="submit"
          disabled={isLast}
          aria-label="Mou avall"
          className="flex h-5 w-7 items-center justify-center rounded border border-ink/15 text-xs text-stone hover:border-ink hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone disabled:cursor-not-allowed transition-colors"
        >
          ↓
        </button>
      </form>
    </div>
  );
}
