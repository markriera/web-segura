import QRCode from "qrcode";

export const metadata = {
  title: "QR · Segura Room",
  robots: { index: false, follow: false },
};

const PISTES = [
  { id: "1", label: "Pista 1 — 16 escales" },
] as const;

function getBaseUrl() {
  // VERCEL_PROJECT_PRODUCTION_URL is set automatically by Vercel on prod builds.
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export default async function QrPage() {
  const base = getBaseUrl();

  const items = await Promise.all(
    PISTES.map(async (p) => {
      const url = `${base}/pista/${p.id}`;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 600,
        margin: 2,
        errorCorrectionLevel: "H",
        color: { dark: "#111111", light: "#FFFFFF" },
      });
      return { ...p, url, dataUrl };
    }),
  );

  return (
    <main className="min-h-screen bg-bone px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-ink">Segura Room — QR de pistes</h1>
        <p className="mt-3 text-stone">
          Escaneja o descarrega cada QR per imprimir-lo. Cada QR porta a la
          imatge de la pista corresponent.
        </p>

        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="flex flex-col items-center gap-4">
              <div className="rounded-md border border-ink/10 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.dataUrl}
                  alt={`QR ${item.label}`}
                  width={300}
                  height={300}
                  className="block h-[300px] w-[300px]"
                />
              </div>
              <h2 className="font-display text-xl text-ink">{item.label}</h2>
              <a
                href={item.url}
                className="font-mono text-xs text-stone break-all hover:text-rust"
                target="_blank"
                rel="noreferrer"
              >
                {item.url}
              </a>
              <a
                href={item.dataUrl}
                download={`qr-pista-${item.id}.png`}
                className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-xs font-semibold uppercase tracking-[0.22em] text-bone hover:bg-rust transition-colors"
              >
                Descarregar PNG
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
