import { createClient } from "@supabase/supabase-js";
(async () => {
  const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data } = await s.from("content").select("data").eq("key","estacions").single();
  for (const e of (data!.data as any[])) console.log(e.ordre, e.slug, "|", e.nom, "|", e.imatge);
})();
