import { notFound } from "next/navigation";
import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { serveiFields } from "../../../_components/field-defs";
import { findItem } from "@/lib/admin/store";

export default async function EditServeiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await findItem("serveis", decodeURIComponent(slug));
  if (!item) notFound();

  return (
    <div>
      <PageHeader
        title={(item as { nom: string }).nom}
        back={{ href: "/admin/serveis", label: "Serveis" }}
      />
      <EntityForm
        entity="serveis"
        initialData={item as Record<string, unknown>}
        fields={serveiFields}
        originalKey={(item as { slug: string }).slug}
      />
    </div>
  );
}
