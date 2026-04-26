import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { estacioFields } from "../../../_components/field-defs";

const empty = {
  slug: "",
  ordre: 0,
  nom: "",
  subtitol: "",
  descripcio: "",
  imatge: "/images/estacions/",
  coordenades: "",
  altitud: undefined,
};

export default function NewEstacioPage() {
  return (
    <div>
      <PageHeader
        title="Nova localització"
        back={{ href: "/admin/estacions", label: "Localitzacions" }}
      />
      <EntityForm
        entity="estacions"
        initialData={empty}
        fields={estacioFields}
        submitLabel="Crea"
      />
    </div>
  );
}
