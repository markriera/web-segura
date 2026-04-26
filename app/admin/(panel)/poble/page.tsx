import { PageHeader } from "../../_components/page-header";
import { Flash } from "../../_components/flash";
import { EntityForm } from "../../_components/entity-form";
import { pobleFields } from "../../_components/field-defs";
import { readPoble } from "@/lib/admin/store";

export default async function PobleAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const poble = await readPoble();

  return (
    <div>
      <PageHeader title="Poble" kicker="Dades generals" />
      <Flash saved={saved} />
      <EntityForm
        entity="poble"
        initialData={poble as unknown as Record<string, unknown>}
        fields={pobleFields}
      />
    </div>
  );
}
