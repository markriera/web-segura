import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { anunciFields } from "../../../_components/field-defs";

const empty = {
  id: String(Date.now()),
  titol: "",
  data: new Date().toISOString().slice(0, 10),
  categoria: "general",
  text: "",
};

export default function NewAnunciPage() {
  return (
    <div>
      <PageHeader
        title="Nou anunci"
        back={{ href: "/admin/anuncis", label: "Anuncis" }}
      />
      <EntityForm
        entity="anuncis"
        initialData={empty}
        fields={anunciFields}
        submitLabel="Crea"
      />
    </div>
  );
}
