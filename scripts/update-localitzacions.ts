import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "node:fs";

(async () => {
  const s = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  // 1) Upload new cafè photo
  const cafeStamp = Date.now().toString(36);
  const cafePath = `estacions/cafe-${cafeStamp}.jpg`;
  const cafeBuf = await fs.readFile("/tmp/cafe-segura-new.jpg");
  const upCafe = await s.storage.from("images").upload(cafePath, cafeBuf, {
    contentType: "image/jpeg", cacheControl: "31536000", upsert: false,
  });
  if (upCafe.error) throw upCafe.error;
  const cafeUrl = s.storage.from("images").getPublicUrl(cafePath).data.publicUrl;
  console.log("✓ cafè:", cafeUrl);

  // 2) Upload escola photo
  const escolaStamp = Date.now().toString(36) + "x";
  const escolaPath = `estacions/escola-${escolaStamp}.jpg`;
  const escolaBuf = await fs.readFile("/tmp/escola-segura.jpeg");
  const upEsc = await s.storage.from("images").upload(escolaPath, escolaBuf, {
    contentType: "image/jpeg", cacheControl: "31536000", upsert: false,
  });
  if (upEsc.error) throw upEsc.error;
  const escolaUrl = s.storage.from("images").getPublicUrl(escolaPath).data.publicUrl;
  console.log("✓ escola:", escolaUrl);

  // 3) Read estacions, update cafè, append escola
  const { data: row, error } = await s.from("content").select("data").eq("key", "estacions").single();
  if (error) throw error;
  const items = row!.data as any[];

  const cafe = items.find((i) => i.slug === "el-cafe-de-segura");
  if (cafe) cafe.imatge = cafeUrl;

  const maxOrdre = Math.max(0, ...items.map((i: any) => i.ordre ?? 0));
  items.push({
    slug: "escola",
    nom: "L'Escola",
    subtitol: "Promoguda per Isidre Gassol i Civit · 1914",
    descripcio:
      "L'edifici de l'escola de Segura va ser promogut per Isidre Gassol i Civit, natural del poble, i donat a la comunitat l'agost de 1914, com consta a la placa commemorativa de la façana. És una peça de memòria educativa anterior a la dictadura franquista, testimoni d'una època en què Segura ja apostava per la formació dels seus infants.",
    imatge: escolaUrl,
    ordre: maxOrdre + 1,
    font: "guimera.blog",
    fontUrl:
      "https://www.guimera.blog/tribuna/in-memoriam-escola-de-segura-anterior-a-la-dictadura-franquista-savalla-del-comtat-la-conca-de-barbera-tarragona-catalunya/",
  });

  const { error: writeErr } = await s.from("content").upsert({
    key: "estacions", data: items, updated_at: new Date().toISOString(),
  });
  if (writeErr) throw writeErr;
  console.log("✓ DB updated");
})();
