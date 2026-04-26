import { getEstacio } from "@/lib/content";
import { renderOgCard, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Localització de la visita virtual a Segura";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const e = await getEstacio(params.slug);
  const meta = e ? `Localització ${String(e.ordre).padStart(2, "0")}` : null;
  return renderOgCard({
    kicker: "Visita virtual",
    meta,
    title: e?.nom ?? "Localització",
    subtitle: e?.subtitol ?? null,
    imatge: e?.imatge,
  });
}
