import Image from "next/image";
import { notFound } from "next/navigation";

const PISTES: Record<string, { src: string; alt: string }> = {
  "1": {
    src: "/images/segura-room/pista-1.jpg",
    alt: "Pista 1 del Segura Room",
  },
  "2": {
    src: "/images/segura-room/pista-2.jpg",
    alt: "Pista 2 del Segura Room",
  },
};

export async function generateStaticParams() {
  return Object.keys(PISTES).map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pista = PISTES[id];
  if (!pista) return {};
  return {
    title: `Pista ${id} · Segura Room`,
    robots: { index: false, follow: false },
  };
}

export default async function PistaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pista = PISTES[id];
  if (!pista) notFound();

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative h-full w-full">
        <Image
          src={pista.src}
          alt={pista.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>
    </main>
  );
}
