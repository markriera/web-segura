export type Epoca = "primavera" | "estiu" | "tardor" | "hivern";
export type CategoriaNegoci = "allotjament" | "restauracio" | "serveis";

export interface FitaHistorica {
  any: string;
  fet: string;
}

export interface BlocHistoria {
  titol: string;
  text: string;
}

export interface Poble {
  nom: string;
  subtitol: string;
  habitants: number;
  habitantsNota: string;
  altitud: number;
  altitudCastell: number;
  coordenades: {
    lat: string;
    lon: string;
    decimal: { lat: number; lon: number };
  };
  municipi: string;
  comarca: string;
  provincia: string;
  distanciaCapMunicipi: string;
  historia: BlocHistoria[];
  fitesHistoriques: FitaHistorica[];
}

export interface Estacio {
  slug: string;
  nom: string;
  subtitol: string;
  descripcio: string;
  coordenades?: string;
  altitud?: number;
  imatge: string;
  ordre: number;
}

export interface Activitat {
  slug: string;
  nom: string;
  data: string;
  dataIso?: string;
  hora?: string;
  ubicacio?: string;
  capacitat?: number;
  inscripcionsObertes?: boolean;
  epoca: Epoca;
  descripcio: string;
  imatge: string;
  recurrent: boolean;
  ordre?: number;
  linkOverride?: string;
}

export interface Inscripcio {
  id: string;
  activitatSlug: string;
  nom: string;
  email: string;
  telefon?: string;
  acompanyants: number;
  comentari?: string;
  creatA: string;
}

export interface Negoci {
  slug: string;
  nom: string;
  categoria: CategoriaNegoci;
  descripcio: string;
  telefon: string;
  email: string;
  web: string;
  imatges: string[];
}

export interface Anunci {
  id: string;
  titol: string;
  data: string;
  categoria: string;
  text: string;
}
