import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Falten env vars");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

(async () => {
  const { data: existing } = await supabase.storage.getBucket("images");
  if (existing) {
    console.log("✓ bucket 'images' ja existeix");
    return;
  }
  const { error } = await supabase.storage.createBucket("images", {
    public: true,
    fileSizeLimit: 12 * 1024 * 1024,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ],
  });
  if (error) {
    console.error("✗", error.message);
    process.exit(1);
  }
  console.log("✓ bucket 'images' creat (públic)");
})();
