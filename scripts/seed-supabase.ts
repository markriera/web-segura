import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Falten NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const ROOT = path.join(process.cwd(), "content", "ca");

const FILES = [
  { file: "poble.json", key: "poble" },
  { file: "estacions.json", key: "estacions" },
  { file: "activitats.json", key: "activitats" },
  { file: "negocis.json", key: "negocis" },
  { file: "anuncis.json", key: "anuncis" },
];

async function readJSON(file: string) {
  const raw = await fs.readFile(path.join(ROOT, file), "utf-8");
  return JSON.parse(raw);
}

async function seedContent() {
  for (const { file, key } of FILES) {
    const data = await readJSON(file);
    const { error } = await supabase
      .from("content")
      .upsert({ key, data, updated_at: new Date().toISOString() });
    if (error) {
      console.error(`✗ ${key}: ${error.message}`);
      process.exit(1);
    }
    console.log(`✓ content[${key}]`);
  }
}

async function seedInscripcions() {
  const data = await readJSON("inscripcions.json").catch(() => []);
  if (!Array.isArray(data) || data.length === 0) {
    console.log("· inscripcions: cap entrada");
    return;
  }
  const rows = data.map(
    (i: {
      id: string;
      activitatSlug: string;
      nom: string;
      email: string;
      telefon?: string;
      acompanyants: number;
      comentari?: string;
      creatA: string;
    }) => ({
      id: i.id,
      activitat_slug: i.activitatSlug,
      nom: i.nom,
      email: i.email,
      telefon: i.telefon ?? null,
      acompanyants: i.acompanyants,
      comentaris: i.comentari ?? null,
      creat_a: i.creatA,
    }),
  );
  const { error } = await supabase.from("inscripcions").upsert(rows);
  if (error) {
    console.error(`✗ inscripcions: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ inscripcions (${rows.length})`);
}

(async () => {
  await seedContent();
  await seedInscripcions();
  console.log("\nFet ✅");
})();
