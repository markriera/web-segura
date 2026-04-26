import { notFound } from "next/navigation";
import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { anunciFields } from "../../../_components/field-defs";
import { findItem } from "@/lib/admin/store";

export default async function EditAnunciPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await findItem("anuncis", decodeURIComponent(id));
  if (!item) notFound();

  return (
    <div>
      <PageHeader
        title={(item as { titol: string }).titol}
        back={{ href: "/admin/anuncis", label: "Anuncis" }}
      />
      <EntityForm
        entity="anuncis"
        initialData={item as Record<string, unknown>}
        fields={anunciFields}
        originalKey={(item as { id: string }).id}
      />
    </div>
  );
}
