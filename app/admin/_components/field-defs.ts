import type { FieldDef } from "./entity-form";

export const pobleFields: FieldDef[] = [
  { name: "nom", label: "Nom", kind: "text", required: true },
  { name: "subtitol", label: "Subtítol", kind: "text", required: true },
  { name: "habitants", label: "Habitants", kind: "number", required: true },
  {
    name: "habitantsNota",
    label: "Nota habitants",
    kind: "text",
    hint: "Ex: 'Dada del 2005 — pendent actualització'",
  },
  { name: "altitud", label: "Altitud (m)", kind: "number", required: true },
  {
    name: "altitudCastell",
    label: "Altitud castell (m)",
    kind: "number",
    required: true,
  },
  { name: "coordenades.lat", label: "Latitud (text)", kind: "text" },
  { name: "coordenades.lon", label: "Longitud (text)", kind: "text" },
  {
    name: "coordenades.decimal.lat",
    label: "Latitud decimal",
    kind: "number",
  },
  {
    name: "coordenades.decimal.lon",
    label: "Longitud decimal",
    kind: "number",
  },
  { name: "municipi", label: "Municipi", kind: "text" },
  { name: "comarca", label: "Comarca", kind: "text" },
  { name: "provincia", label: "Província", kind: "text" },
  { name: "distanciaCapMunicipi", label: "Distància a la capital", kind: "text" },
  {
    name: "historia",
    label: "Blocs d'història",
    kind: "object-array",
    itemFields: [
      { name: "titol", label: "Títol", kind: "text", required: true },
      { name: "text", label: "Text", kind: "textarea", required: true },
    ],
  },
  {
    name: "fitesHistoriques",
    label: "Fites cronològiques",
    kind: "object-array",
    itemFields: [
      { name: "any", label: "Any", kind: "text", required: true },
      { name: "fet", label: "Fet", kind: "text", required: true },
    ],
  },
];

export const estacioFields: FieldDef[] = [
  {
    name: "slug",
    label: "Slug",
    kind: "text",
    required: true,
    hint: "Identificador URL (sense espais ni accents)",
  },
  { name: "ordre", label: "Ordre", kind: "number", required: true },
  { name: "nom", label: "Nom", kind: "text", required: true },
  { name: "subtitol", label: "Subtítol", kind: "text", required: true },
  { name: "descripcio", label: "Descripció", kind: "textarea", required: true },
  {
    name: "imatge",
    label: "Imatge",
    kind: "image",
    required: true,
    uploadFolder: "estacions",
  },
  { name: "coordenades", label: "Coordenades", kind: "text" },
  { name: "altitud", label: "Altitud (m)", kind: "number" },
];

export const activitatFields: FieldDef[] = [
  { name: "slug", label: "Slug", kind: "text", required: true },
  { name: "nom", label: "Nom", kind: "text", required: true },
  {
    name: "dataIso",
    label: "Data exacta",
    kind: "date",
    hint: "Tria la data al calendari (genera automàticament la data visible)",
  },
  {
    name: "data",
    label: "Data visible",
    kind: "text",
    required: true,
    hint: "Com es mostrarà al públic (ex: '15 de maig')",
  },
  { name: "hora", label: "Hora", kind: "time", hint: "Opcional" },
  { name: "ubicacio", label: "Ubicació", kind: "text", hint: "Opcional" },
  {
    name: "epoca",
    label: "Època",
    kind: "select",
    required: true,
    options: [
      { value: "primavera", label: "Primavera" },
      { value: "estiu", label: "Estiu" },
      { value: "tardor", label: "Tardor" },
      { value: "hivern", label: "Hivern" },
    ],
  },
  { name: "descripcio", label: "Descripció", kind: "textarea", required: true },
  {
    name: "imatge",
    label: "Imatge",
    kind: "image",
    required: true,
    uploadFolder: "activitats",
  },
  {
    name: "inscripcionsObertes",
    label: "Inscripcions obertes",
    kind: "boolean",
    hint: "Si està activat, els visitants poden inscriure's a l'activitat",
  },
  {
    name: "capacitat",
    label: "Capacitat màxima",
    kind: "number",
    hint: "0 o buit = sense límit",
  },
  { name: "recurrent", label: "Recurrent", kind: "boolean" },
];

export const serveiFields: FieldDef[] = [
  { name: "slug", label: "Slug", kind: "text", required: true },
  { name: "nom", label: "Nom", kind: "text", required: true },
  {
    name: "categoria",
    label: "Categoria",
    kind: "select",
    required: true,
    options: [
      { value: "allotjament", label: "Allotjament" },
      { value: "restauracio", label: "Restauració" },
      { value: "serveis", label: "Serveis" },
    ],
  },
  { name: "descripcio", label: "Descripció", kind: "textarea", required: true },
  { name: "telefon", label: "Telèfon", kind: "text" },
  { name: "email", label: "Email", kind: "text" },
  { name: "web", label: "Web", kind: "text" },
  {
    name: "imatges",
    label: "Imatges",
    kind: "image-array",
    uploadFolder: "negocis",
  },
];

export const anunciFields: FieldDef[] = [
  { name: "id", label: "ID", kind: "text", required: true },
  { name: "titol", label: "Títol", kind: "text", required: true },
  {
    name: "data",
    label: "Data (YYYY-MM-DD)",
    kind: "text",
    required: true,
  },
  { name: "categoria", label: "Categoria", kind: "text", required: true },
  { name: "text", label: "Text", kind: "textarea", required: true },
];
