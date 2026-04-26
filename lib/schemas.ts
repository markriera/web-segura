import { z } from "zod";

export const epocaSchema = z.enum(["primavera", "estiu", "tardor", "hivern"]);
export const categoriaNegociSchema = z.enum([
  "allotjament",
  "restauracio",
  "serveis",
]);

export const pobleSchema = z.object({
  nom: z.string(),
  subtitol: z.string(),
  habitants: z.number(),
  habitantsNota: z.string(),
  altitud: z.number(),
  altitudCastell: z.number(),
  coordenades: z.object({
    lat: z.string(),
    lon: z.string(),
    decimal: z.object({ lat: z.number(), lon: z.number() }),
  }),
  municipi: z.string(),
  comarca: z.string(),
  provincia: z.string(),
  distanciaCapMunicipi: z.string(),
  historia: z.array(z.object({ titol: z.string(), text: z.string() })),
  fitesHistoriques: z.array(z.object({ any: z.string(), fet: z.string() })),
});

export const estacioSchema = z.object({
  slug: z.string(),
  nom: z.string(),
  subtitol: z.string(),
  descripcio: z.string(),
  coordenades: z.string().optional(),
  altitud: z.number().optional(),
  imatge: z.string(),
  ordre: z.number(),
  font: z.string().optional(),
  fontUrl: z.string().optional(),
});

const optionalString = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.string().optional(),
);

const optionalNumber = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.number().optional(),
);

export const activitatSchema = z.object({
  slug: z.string(),
  nom: z.string(),
  data: z.string(),
  dataIso: optionalString,
  hora: optionalString,
  ubicacio: optionalString,
  capacitat: optionalNumber,
  inscripcionsObertes: z.boolean().optional(),
  epoca: epocaSchema,
  descripcio: z.string(),
  imatge: z.string(),
  recurrent: z.boolean(),
  ordre: z.number().optional(),
  linkOverride: z.string().optional(),
});

export const negociSchema = z.object({
  slug: z.string(),
  nom: z.string(),
  categoria: categoriaNegociSchema,
  descripcio: z.string(),
  telefon: z.string(),
  email: z.string(),
  web: z.string(),
  imatges: z.array(z.string()),
});

export const inscripcioSchema = z.object({
  id: z.string(),
  activitatSlug: z.string(),
  nom: z.string().min(1, "Falta el nom"),
  email: z.string().email("Email no vàlid"),
  telefon: z.string().optional(),
  acompanyants: z.number().int().min(0).max(20),
  comentari: z.string().optional(),
  creatA: z.string(),
});

export const inscripcionsSchema = z.array(inscripcioSchema);

export const anunciSchema = z.object({
  id: z.string(),
  titol: z.string(),
  data: z.string(),
  categoria: z.string(),
  text: z.string(),
});

export const estacionsSchema = z.array(estacioSchema);
export const activitatsSchema = z.array(activitatSchema);
export const negocisSchema = z.array(negociSchema);
export const anuncisSchema = z.array(anunciSchema);
