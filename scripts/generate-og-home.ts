import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

(async () => {
  const W = 1200;
  const H = 630;
  const root = process.cwd();
  const heroPath = path.join(root, "public", "images", "hero", "segura-portada.png");
  const outDir = path.join(root, "public", "og");
  await fs.mkdir(outDir, { recursive: true });

  const hero = sharp(heroPath).resize(W, H, { fit: "cover", position: "center" });

  const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.20)"/>
      <stop offset="55%" stop-color="rgba(0,0,0,0.55)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.92)"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>

  <!-- top strip -->
  <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="20" fill="#f0c89a" letter-spacing="4">
    <text x="70" y="80" font-weight="400">— CONCA DE BARBERÀ · TARRAGONA</text>
    <text x="${W - 70}" y="80" text-anchor="end" font-weight="400">41°32′39″N · 1°15′54″E</text>
  </g>

  <!-- kicker -->
  <text x="70" y="${H - 320}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="26" fill="#f0c89a" letter-spacing="6">· LLOGARET MEDIEVAL ·</text>

  <!-- title -->
  <g font-family="Fraunces, Georgia, serif">
    <text x="70" y="${H - 220}" font-size="120" font-weight="600" fill="#f4efe6" letter-spacing="-3">La web de</text>
    <text x="70" y="${H - 80}" font-size="220" font-style="italic" font-weight="300" fill="#f0c89a" letter-spacing="-6">Segura</text>
  </g>

  <!-- footer -->
  <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="20" letter-spacing="4">
    <text x="70" y="${H - 30}" fill="#f4efe6">SEGURA.CAT</text>
    <text x="${W - 70}" y="${H - 30}" text-anchor="end" fill="#f0c89a">· VISITA · ACTIVITATS · FESTA MAJOR</text>
  </g>
</svg>`;

  const out = await hero
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

  const outPath = path.join(outDir, "home.jpg");
  await fs.writeFile(outPath, out);
  const stats = await fs.stat(outPath);
  console.log(`✓ ${outPath} (${(stats.size / 1024).toFixed(0)} KB)`);
})();
