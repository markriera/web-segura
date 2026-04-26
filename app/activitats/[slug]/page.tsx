import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { ActivitatShare } from "@/components/sections/activitat-share";
import { InscripcioForm } from "@/components/sections/inscripcio-form";
import { getActivitat, getActivitats } from "@/lib/content";
import { countInscripcions } from "@/lib/inscripcions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://segura.cat";

export async function generateStaticParams() {
  const activitats = await getActivitats();
  return activitats.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getActivitat(slug);
  if (!a) return {};
  const url = `${SITE_URL}/activitats/${slug}`;
  return {
    title: a.nom,
    description: a.descripcio,
    openGraph: {
      title: `${a.nom} · ${a.data}`,
      description: a.descripcio,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.nom} · ${a.data}`,
      description: a.descripcio,
    },
  };
}

export default async function ActivitatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activitat = await getActivitat(slug);
  if (!activitat) notFound();
  if (activitat.linkOverride) redirect(activitat.linkOverride);

  const url = `${SITE_URL}/activitats/${slug}`;
  const inscritsActuals = activitat.inscripcionsObertes
    ? await countInscripcions(slug)
    : 0;

  return (
    <article className="pt-32 pb-24">
      <Container size="lg">
        <Link
          href="/#activitats"
          className="font-mono text-xs uppercase tracking-[0.18em] text-stone hover:text-ink"
        >
          ← Activitats
        </Link>

        <header className="mt-8">
          <span className="block font-display text-[clamp(2rem,1.5rem+2vw,3.25rem)] leading-none tracking-tight text-rust">
            {activitat.data}
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] leading-[1] text-ink">
            {activitat.nom}
          </h1>
          {(activitat.hora || activitat.ubicacio) && (
            <p className="mt-4 font-display italic text-xl text-stone">
              {activitat.hora && <span>{activitat.hora}h</span>}
              {activitat.hora && activitat.ubicacio && " · "}
              {activitat.ubicacio}
            </p>
          )}
        </header>

        <div className="mt-12 relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-ink">
          <Image
            src={activitat.imatge}
            alt={activitat.nom}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink">
              {activitat.descripcio}
            </p>

            <div className="mt-12 border-t-2 border-ink/10 pt-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-stone">
                Comparteix
              </h2>
              <div className="mt-5">
                <ActivitatShare
                  nom={activitat.nom}
                  data={activitat.data}
                  url={url}
                />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <dl className="space-y-5 rounded-md border-2 border-ink/10 bg-paper p-6">
              <Detail label="Quan" value={activitat.data} />
              {activitat.hora && (
                <Detail label="Hora" value={`${activitat.hora}h`} />
              )}
              {activitat.ubicacio && (
                <Detail label="On" value={activitat.ubicacio} />
              )}
              {activitat.recurrent && (
                <Detail label="Format" value="Esdeveniment recurrent" />
              )}
            </dl>
          </aside>
        </div>

        {activitat.inscripcionsObertes && (
          <section
            id="inscripcio"
            className="mt-20 rounded-md border-2 border-moss/30 bg-moss/5 p-8 sm:p-12"
            aria-labelledby="inscripcio-heading"
          >
            <SectionKicker>Inscripció</SectionKicker>
            <h2
              id="inscripcio-heading"
              className="mt-4 font-display text-3xl sm:text-4xl text-ink"
            >
              Apunta-t&apos;hi
            </h2>
            <p className="mt-3 max-w-xl text-base text-stone">
              Així ens fem una idea de quanta gent vindrà i us preparem millor
              l&apos;activitat.
            </p>
            <div className="mt-8">
              <InscripcioForm
                slug={slug}
                capacitat={activitat.capacitat}
                inscritsActuals={inscritsActuals}
              />
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
        {label}
      </dt>
      <dd className="mt-1 text-base text-ink">{value}</dd>
    </div>
  );
}
