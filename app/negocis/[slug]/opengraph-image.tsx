import { getNegoci } from "@/lib/content";
import { renderOgCard, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Negoci de Segura";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const n = await getNegoci(params.slug);
  return renderOgCard({
    kicker: "Negoci",
    meta: n?.categoria ?? null,
    title: n?.nom ?? "Negoci",
    subtitle: null,
    imatge: n?.imatges?.[0],
  });
}
