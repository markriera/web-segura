import { getActivitat } from "@/lib/content";
import { renderOgCard, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Activitat a Segura";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const a = await getActivitat(params.slug);
  const subtitle = [a?.hora ? `${a.hora}h` : null, a?.ubicacio]
    .filter(Boolean)
    .join(" · ");
  return renderOgCard({
    kicker: "Activitat",
    meta: a?.data ?? null,
    title: a?.nom ?? "Activitat",
    subtitle: subtitle || null,
    imatge: a?.imatge,
  });
}
