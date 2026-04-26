import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { serveiFields } from "../../../_components/field-defs";

const empty = {
  slug: "",
  nom: "",
  categoria: "allotjament",
  descripcio: "",
  telefon: "",
  email: "",
  web: "",
  imatges: [],
};

export default function NewServeiPage() {
  return (
    <div>
      <PageHeader
        title="Nou servei"
        back={{ href: "/admin/serveis", label: "Serveis" }}
      />
      <EntityForm
        entity="serveis"
        initialData={empty}
        fields={serveiFields}
        submitLabel="Crea"
      />
    </div>
  );
}
