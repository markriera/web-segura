import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "node:fs";
(async () => {
  const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
  const stamp = Date.now().toString(36);
  const objectPath = `estacions/castell-${stamp}.png`;
  const buf = await fs.readFile("/tmp/castell-upright.png");
  const up = await s.storage.from("images").upload(objectPath, buf, { contentType: "image/png", cacheControl: "31536000", upsert: false });
  if (up.error) throw up.error;
  const url = s.storage.from("images").getPublicUrl(objectPath).data.publicUrl;
  console.log("✓", url);
  const { data: row, error } = await s.from("content").select("data").eq("key","estacions").single();
  if (error) throw error;
  const items = row!.data as any[];
  const cas = items.find((i) => i.slug === "castell");
  if (!cas) { console.error("no castell"); process.exit(1); }
  cas.imatge = url;
  const { error: wErr } = await s.from("content").upsert({ key: "estacions", data: items, updated_at: new Date().toISOString() });
  if (wErr) throw wErr;
  console.log("✓ DB updated");
})();
