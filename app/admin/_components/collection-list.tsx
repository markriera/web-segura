import Link from "next/link";
import { DeleteButton } from "./delete-button";
import type { CollectionKey } from "@/lib/admin/store";

interface Item {
  slug?: string;
  id?: string;
  nom?: string;
  titol?: string;
  imatge?: string;
  imatges?: string[];
}

export function CollectionList({
  items,
  entity,
  emptyLabel = "Encara no hi ha cap element.",
}: {
  items: Item[];
  entity: CollectionKey;
  emptyLabel?: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-md border-2 border-dashed border-ink/15 bg-paper px-8 py-16 text-center">
        <p className="text-base text-stone">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const key = (item.slug ?? item.id) as string;
        const title = item.nom ?? item.titol ?? key;
        const thumb = item.imatge ?? item.imatges?.[0];
        return (
          <li
            key={key}
            className="flex items-center gap-5 rounded-md border-2 border-ink/15 bg-paper p-4 transition-colors hover:border-ink"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-ink/10 bg-bone">
              {thumb && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={thumb}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl text-ink truncate">{title}</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone truncate">
                {key}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/${entity}/${encodeURIComponent(key)}`}
                className="inline-flex h-11 items-center rounded-md border-2 border-ink/15 px-5 text-sm font-semibold text-ink hover:border-ink hover:bg-ink hover:text-bone transition-colors"
              >
                Edita
              </Link>
              <DeleteButton entity={entity} itemKey={key} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
