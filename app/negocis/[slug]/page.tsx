import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { getNegoci, getNegocis } from "@/lib/content";

export async function generateStaticParams() {
  const negocis = await getNegocis();
  return negocis.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = await getNegoci(slug);
  if (!n) return {};
  return { title: n.nom, description: n.descripcio };
}

export default async function NegociPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const negoci = await getNegoci(slug);
  if (!negoci) notFound();

  return (
    <article className="pt-32 pb-24">
      <Container size="lg">
        <Link
          href="/negocis"
          className="font-mono text-xs uppercase tracking-[0.18em] text-stone hover:text-ink"
        >
          ← Negocis
        </Link>

        <header className="mt-8">
          <SectionKicker>{negoci.categoria}</SectionKicker>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] leading-[1] text-ink">
            {negoci.nom}
          </h1>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 relative aspect-[4/5] overflow-hidden rounded-sm bg-ink">
            <Image
              src={negoci.imatges[0] ?? "/images/placeholders/portrait.svg"}
              alt={negoci.nom}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink">{negoci.descripcio}</p>
            <dl className="mt-10 space-y-6 border-t border-ink/10 pt-6">
              <Field label="Telèfon" value={negoci.telefon} />
              <Field label="Email" value={negoci.email} />
              <Field label="Web" value={negoci.web} />
            </dl>
          </div>
        </div>
      </Container>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        {label}
      </dt>
      <dd className="mt-1 text-base text-ink break-words">{value}</dd>
    </div>
  );
}
