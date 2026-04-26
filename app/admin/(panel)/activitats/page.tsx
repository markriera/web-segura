import Link from "next/link";
import { PageHeader } from "../../_components/page-header";
import { Flash } from "../../_components/flash";
import { CollectionList } from "../../_components/collection-list";
import { readCollection } from "@/lib/admin/store";

export default async function ActivitatsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const sp = await searchParams;
  const items = await readCollection("activitats");

  return (
    <div>
      <PageHeader
        title="Activitats"
        kicker="Calendari"
        actions={
          <Link
            href="/admin/activitats/nou"
            className="inline-flex h-12 items-center rounded-md bg-ink px-6 text-sm font-semibold text-bone hover:bg-moss transition-colors shadow-sm"
          >
            + Nova
          </Link>
        }
      />
      <Flash saved={sp.saved} deleted={sp.deleted} />
      <CollectionList items={items} entity="activitats" />
    </div>
  );
}
