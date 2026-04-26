import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { activitatFields } from "../../../_components/field-defs";
import { findItem } from "@/lib/admin/store";
import { countInscripcions, getInscripcions } from "@/lib/inscripcions";

export default async function EditActivitatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const item = await findItem("activitats", decoded);
  if (!item) notFound();

  const [inscrits, total] = await Promise.all([
    getInscripcions(decoded),
    countInscripcions(decoded),
  ]);

  return (
    <div>
      <PageHeader
        title={(item as { nom: string }).nom}
        back={{ href: "/admin/activitats", label: "Activitats" }}
        actions={
          <Link
            href={`/admin/activitats/${slug}/inscripcions`}
            className="inline-flex h-12 items-center rounded-md border-2 border-ink px-6 text-sm font-semibold text-ink hover:bg-ink hover:text-bone transition-colors"
          >
            Inscripcions ({inscrits.length} · {total} pers.)
          </Link>
        }
      />
      <EntityForm
        entity="activitats"
        initialData={item as Record<string, unknown>}
        fields={activitatFields}
        originalKey={(item as { slug: string }).slug}
      />
    </div>
  );
}
