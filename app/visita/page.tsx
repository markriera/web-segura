import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { getEstacions } from "@/lib/content";

export default async function VisitaPage() {
  const estacions = await getEstacions();

  return (
    <Container size="xl" as="article" className="pt-32 pb-24">
      <SectionKicker>Visita virtual</SectionKicker>
      <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] leading-[1] text-ink">
        Sis estacions per recórrer Segura
      </h1>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {estacions.map((estacio) => (
          <li key={estacio.slug}>
            <Link
              href={`/visita/${estacio.slug}`}
              className="group block overflow-hidden rounded-sm bg-paper"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image
                  src={estacio.imatge}
                  alt={estacio.nom}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-rust">
                  Estació {String(estacio.ordre).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-xl text-ink">{estacio.nom}</h2>
                <p className="mt-1 font-display italic text-sm text-stone">
                  {estacio.subtitol}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
