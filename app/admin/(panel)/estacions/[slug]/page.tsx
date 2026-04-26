import { notFound } from "next/navigation";
import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { estacioFields } from "../../../_components/field-defs";
import { findItem } from "@/lib/admin/store";

export default async function EditEstacioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await findItem("estacions", decodeURIComponent(slug));
  if (!item) notFound();

  return (
    <div>
      <PageHeader
        title={(item as { nom: string }).nom}
        back={{ href: "/admin/estacions", label: "Localitzacions" }}
      />
      <EntityForm
        entity="estacions"
        initialData={item as Record<string, unknown>}
        fields={estacioFields}
        originalKey={(item as { slug: string }).slug}
      />
    </div>
  );
}
