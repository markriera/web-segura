import { notFound } from "next/navigation";
import { PageHeader } from "../../../../_components/page-header";
import { Flash } from "../../../../_components/flash";
import { DeleteInscripcioButton } from "../../../../_components/delete-inscripcio-button";
import { getActivitat } from "@/lib/content";
import { getInscripcions, countInscripcions } from "@/lib/inscripcions";

export default async function InscripcionsAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ deleted?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const decoded = decodeURIComponent(slug);
  const activitat = await getActivitat(decoded);
  if (!activitat) notFound();

  const inscripcions = await getInscripcions(decoded);
  const total = await countInscripcions(decoded);

  return (
    <div>
      <PageHeader
        title={activitat.nom}
        kicker={`Inscripcions · ${activitat.data}`}
        back={{
          href: `/admin/activitats/${slug}`,
          label: "Edita activitat",
        }}
      />
      <Flash deleted={sp.deleted} />

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Stat label="Inscrits" value={String(inscripcions.length)} />
        <Stat label="Persones totals" value={String(total)} />
        <Stat
          label="Capacitat"
          value={
            activitat.capacitat && activitat.capacitat > 0
              ? `${total} / ${activitat.capacitat}`
              : "Sense límit"
          }
        />
      </div>

      {inscripcions.length === 0 ? (
        <div className="rounded-md border-2 border-dashed border-ink/15 bg-paper px-8 py-16 text-center">
          <p className="text-base text-stone">
            Encara no hi ha cap inscripció.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border-2 border-ink/15">
          <table className="w-full text-left">
            <thead className="bg-paper">
              <tr className="border-b-2 border-ink/15">
                <Th>Nom</Th>
                <Th>Email</Th>
                <Th>Telèfon</Th>
                <Th className="text-center">Veniu</Th>
                <Th>Data</Th>
                <Th className="text-right">Accions</Th>
              </tr>
            </thead>
            <tbody>
              {inscripcions.map((i) => (
                <tr
                  key={i.id}
                  className="border-b border-ink/10 last:border-b-0"
                >
                  <Td className="font-medium text-ink">
                    {i.nom}
                    {i.comentari && (
                      <p className="mt-1 text-sm font-normal text-stone">
                        {i.comentari}
                      </p>
                    )}
                  </Td>
                  <Td>
                    <a
                      href={`mailto:${i.email}`}
                      className="text-ink hover:underline"
                    >
                      {i.email}
                    </a>
                  </Td>
                  <Td>
                    {i.telefon ? (
                      <a
                        href={`tel:${i.telefon}`}
                        className="text-ink hover:underline"
                      >
                        {i.telefon}
                      </a>
                    ) : (
                      <span className="text-stone">—</span>
                    )}
                  </Td>
                  <Td className="text-center">{1 + i.acompanyants}</Td>
                  <Td className="text-stone text-sm">
                    {new Date(i.creatA).toLocaleDateString("ca-ES")}
                  </Td>
                  <Td className="text-right">
                    <DeleteInscripcioButton id={i.id} slug={slug} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border-2 border-ink/15 bg-paper p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-stone ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-5 py-4 align-top ${className}`}>{children}</td>;
}
