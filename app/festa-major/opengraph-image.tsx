import { renderOgCard, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Festa Major de Segura 2026";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOgCard({
    kicker: "FM·26",
    meta: "22 · 23 · 24 maig 2026",
    title: "Festa Major de Segura",
    subtitle: "Tres dies de festa, truita, rom cremat i ball.",
    imatge: "/images/festa-major/havaneres.jpg",
  });
}
