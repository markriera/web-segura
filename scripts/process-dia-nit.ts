import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "/Users/marcrieramadurga/Desktop/dia nit";
const OUT = path.join(process.cwd(), "public", "images", "poble", "dia-nit");

(async () => {
  await fs.mkdir(OUT, { recursive: true });
  for (let i = 1; i <= 6; i++) {
    const src = path.join(SRC, `${i}.png`);
    const dst = path.join(OUT, `${i}.jpg`);
    const out = await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toBuffer();
    await fs.writeFile(dst, out);
    const stats = await fs.stat(dst);
    console.log(`✓ ${i}.jpg  ${(stats.size / 1024).toFixed(0)} KB`);
  }
})();
