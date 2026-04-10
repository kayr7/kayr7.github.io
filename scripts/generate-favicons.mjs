// Generates all favicon and app-icon formats from public/favicon.svg.
// Run with `npm run favicons`.
//
// Outputs (all in /public):
//   - favicon.ico              (multi-res 16/32/48, legacy fallback)
//   - favicon-16.png           (legacy png)
//   - favicon-32.png           (legacy png)
//   - apple-touch-icon.png     (180x180, iOS home screen)
//   - icon-192.png             (PWA manifest, Android home screen)
//   - icon-512.png             (PWA manifest, splash)
//
// favicon.svg itself is hand-edited in /public and is the primary icon
// served to modern browsers via <link rel="icon" type="image/svg+xml">.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

const svgPath = path.join(publicDir, "favicon.svg");
const svg = await readFile(svgPath);

// PNG sizes we need to ship.
const sizes = {
  "favicon-16.png": 16,
  "favicon-32.png": 32,
  "apple-touch-icon.png": 180,
  "icon-192.png": 192,
  "icon-512.png": 512,
};

// Render each PNG from the SVG. We pass the SVG buffer directly to sharp,
// which uses librsvg to rasterize. The SVG uses a generic serif fallback
// (Georgia / Times New Roman) so it renders deterministically across systems.
for (const [filename, size] of Object.entries(sizes)) {
  const out = path.join(publicDir, filename);
  await sharp(svg, { density: Math.max(72, size * 4) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  wrote ${filename} (${size}x${size})`);
}

// favicon.ico bundles 16, 32, and 48 pixel PNGs so older browsers and
// pinned bookmarks always have a crisp icon.
const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map((size) =>
    sharp(svg, { density: Math.max(72, size * 4) })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  ),
);
const ico = await pngToIco(icoBuffers);
await writeFile(path.join(publicDir, "favicon.ico"), ico);
console.log(`  wrote favicon.ico (${icoSizes.join(", ")})`);

console.log("\nFavicon generation complete.");
