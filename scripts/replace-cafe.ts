import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "node:fs";

(async () => {
  const s = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const stamp = Date.now().toString(36);
  const objectPath = `estacions/cafe-${stamp}.png`;
  const buf = await fs.readFile("/Users/marcrieramadurga/Desktop/Segura/cafeok.png");
  const up = await s.storage.from("images").upload(objectPath, buf, {
    contentType: "image/png", cacheControl: "31536000", upsert: false,
  });
  if (up.error) throw up.error;
  const url = s.storage.from("images").getPublicUrl(objectPath).data.publicUrl;
  console.log("✓ uploaded:", url);

  const { data: row, error } = await s.from("content").select("data").eq("key","estacions").single();
  if (error) throw error;
  const items = row!.data as any[];
  const cafe = items.find((i) => i.slug === "el-cafe-de-segura");
  if (!cafe) { console.error("no cafè found"); process.exit(1); }
  cafe.imatge = url;

  const { error: wErr } = await s.from("content").upsert({
    key: "estacions", data: items, updated_at: new Date().toISOString(),
  });
  if (wErr) throw wErr;
  console.log("✓ DB updated");
})();
