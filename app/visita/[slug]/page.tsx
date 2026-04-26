import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { getEstacio, getEstacions } from "@/lib/content";

export async function generateStaticParams() {
  const estacions = await getEstacions();
  return estacions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const estacio = await getEstacio(slug);
  if (!estacio) return {};
  return {
    title: estacio.nom,
    description: estacio.descripcio,
  };
}

export default async function EstacioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const estacio = await getEstacio(slug);
  if (!estacio) notFound();

  return (
    <article className="pt-32 pb-24">
      <Container size="lg">
        <Link
          href="/visita"
          className="font-mono text-xs uppercase tracking-[0.18em] text-stone hover:text-ink"
        >
          ← Visita virtual
        </Link>

        <header className="mt-8">
          <SectionKicker>
            Estació {String(estacio.ordre).padStart(2, "0")}
          </SectionKicker>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] leading-[1] text-ink">
            {estacio.nom}
          </h1>
          <p className="mt-3 font-display italic text-xl text-stone">
            {estacio.subtitol}
          </p>
        </header>

        <div className="mt-12 relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-ink">
          <Image
            src={estacio.imatge}
            alt={estacio.nom}
            fill
            priority
            sizes="(min-width: 1024px) 80rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <p className="lg:col-span-8 text-lg leading-relaxed text-ink">
            {estacio.descripcio}
          </p>
          <dl className="lg:col-span-4 space-y-6 border-t border-ink/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {estacio.coordenades && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
                  Coordenades
                </dt>
                <dd className="mt-1 font-mono text-sm text-ink">{estacio.coordenades}</dd>
              </div>
            )}
            {estacio.altitud && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
                  Altitud
                </dt>
                <dd className="mt-1 font-mono text-sm text-ink">{estacio.altitud} m</dd>
              </div>
            )}
          </dl>
        </div>
      </Container>
    </article>
  );
}
