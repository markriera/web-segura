import { Hero } from "@/components/sections/hero";
import { PobleSection } from "@/components/sections/poble";
import { VisitaVirtual } from "@/components/sections/visita-virtual";
import { ActivitatsSection } from "@/components/sections/activitats";
import { FestaMajorBanner } from "@/components/sections/festa-major-banner";
import { NegocisSection } from "@/components/sections/negocis";
import { TrobadaDigital } from "@/components/sections/trobada-digital";
import { ContacteSection } from "@/components/sections/contacte";
import {
  getPoble,
  getEstacions,
  getActivitats,
  getNegocis,
  getAnuncis,
} from "@/lib/content";

export default async function HomePage() {
  const [poble, estacions, activitats, negocis, anuncis] = await Promise.all([
    getPoble(),
    getEstacions(),
    getActivitats(),
    getNegocis(),
    getAnuncis(),
  ]);

  return (
    <>
      <Hero poble={poble} />
      <FestaMajorBanner />
      <PobleSection poble={poble} />
      <VisitaVirtual estacions={estacions} />
      <ActivitatsSection activitats={activitats} />
      <NegocisSection negocis={negocis} />
      <TrobadaDigital anuncis={anuncis} />
      <ContacteSection poble={poble} />
    </>
  );
}
