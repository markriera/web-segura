import Link from "next/link";
import { PageHeader } from "../_components/page-header";
import {
  readPoble,
  readCollection,
} from "@/lib/admin/store";

const CARDS: { key: "poble" | "estacions" | "activitats" | "serveis" | "anuncis"; label: string; href: string; description: string }[] = [
  {
    key: "poble",
    label: "Poble",
    href: "/admin/poble",
    description: "Dades generals, història i fites cronològiques.",
  },
  {
    key: "estacions",
    label: "Estacions",
    href: "/admin/estacions",
    description: "Visita virtual: punts del recorregut.",
  },
  {
    key: "activitats",
    label: "Activitats",
    href: "/admin/activitats",
    description: "Calendari del poble.",
  },
  {
    key: "serveis",
    label: "Serveis",
    href: "/admin/serveis",
    description: "Allotjaments, restauració i altres negocis.",
  },
  {
    key: "anuncis",
    label: "Anuncis",
    href: "/admin/anuncis",
    description: "Avisos pels veïns al punt de trobada.",
  },
];

export default async function AdminDashboard() {
  const [estacions, activitats, serveis, anuncis] = await Promise.all([
    readCollection("estacions"),
    readCollection("activitats"),
    readCollection("serveis"),
    readCollection("anuncis"),
  ]);
  await readPoble();

  const counts: Record<string, number> = {
    poble: 1,
    estacions: estacions.length,
    activitats: activitats.length,
    serveis: serveis.length,
    anuncis: anuncis.length,
  };

  return (
    <div>
      <PageHeader title="Inici" kicker="Panell de control" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="group block rounded-md border-2 border-ink/15 bg-paper p-7 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl text-ink">{c.label}</h2>
              <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-semibold text-bone">
                {counts[c.key]}
              </span>
            </div>
            <p className="mt-3 text-base text-stone leading-relaxed">
              {c.description}
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-ink group-hover:text-moss">
              Gestiona →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
