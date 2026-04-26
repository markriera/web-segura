import { PageHeader } from "../../../_components/page-header";
import { EntityForm } from "../../../_components/entity-form";
import { activitatFields } from "../../../_components/field-defs";

const empty = {
  slug: "",
  nom: "",
  data: "",
  dataIso: "",
  hora: "",
  ubicacio: "",
  capacitat: 0,
  inscripcionsObertes: false,
  epoca: "primavera",
  descripcio: "",
  imatge: "/images/activitats/",
  recurrent: false,
};

export default function NewActivitatPage() {
  return (
    <div>
      <PageHeader
        title="Nova activitat"
        back={{ href: "/admin/activitats", label: "Activitats" }}
      />
      <EntityForm
        entity="activitats"
        initialData={empty}
        fields={activitatFields}
        submitLabel="Crea"
      />
    </div>
  );
}
