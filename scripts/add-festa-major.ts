import { createClient } from "@supabase/supabase-js";
(async () => {
  const s = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { data: row, error } = await s.from("content").select("data").eq("key","activitats").single();
  if (error) throw error;
  const items = row!.data as any[];
  if (items.some((i) => i.slug === "festa-major-2026")) {
    console.log("· ja existeix, l'actualitzo");
  }
  const filtered = items.filter((i) => i.slug !== "festa-major-2026");
  const fm = {
    slug: "festa-major-2026",
    nom: "Festa Major de Segura 2026",
    data: "22-23-24 de maig",
    dataIso: "2026-05-22",
    hora: "",
    ubicacio: "Plaça del Pi · Cafè · Plaça Major",
    capacitat: undefined,
    inscripcionsObertes: false,
    epoca: "primavera",
    descripcio: "Tres dies de festa, truita, rom cremat i ball fins que surti el sol.",
    imatge: "/images/festa-major/seguraroom-poster.png",
    recurrent: true,
    ordre: 0,
    linkOverride: "/festa-major",
  };
  // Put at the start
  filtered.unshift(fm);
  const { error: w } = await s.from("content").upsert({ key: "activitats", data: filtered, updated_at: new Date().toISOString() });
  if (w) throw w;
  console.log("✓ Festa Major afegida com a activitat (i en primera posició)");
})();
