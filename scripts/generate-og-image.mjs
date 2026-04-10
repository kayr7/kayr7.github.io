// Generates the social-share Open Graph image (1200x630) from an SVG
// template + the existing portrait. Run with `node scripts/generate-og-image.mjs`.
//
// Output: public/og-image.png - referenced from Layout.astro as `og:image`.
//
// Why a script and not Astro's <Image>: og:image needs to be a static
// PNG/JPG at a stable URL that social crawlers can fetch without
// running JavaScript. Generating it once and committing the result is
// the simplest reliable path.

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const portraitPath = join(root, "src/assets/kayhochkant.jpg");
const outPath = join(root, "public/og-image.png");

// Render the portrait to a circular 480x480 buffer that we'll composite
// onto the SVG background.
const portraitSize = 380;
const portraitBuffer = await sharp(portraitPath)
  .resize(portraitSize, portraitSize, { fit: "cover", position: "top" })
  .composite([
    {
      // Circular mask
      input: Buffer.from(
        `<svg width="${portraitSize}" height="${portraitSize}"><circle cx="${portraitSize / 2}" cy="${portraitSize / 2}" r="${portraitSize / 2}" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

// Background SVG. Matches the site's brand: warm off-white paper,
// deep ink-blue accent, serif headline.
const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbfaf7"/>
      <stop offset="100%" stop-color="#f1ede2"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Left vertical accent rule -->
  <rect x="80" y="80" width="4" height="470" fill="#1e3a8a"/>

  <!-- Eyebrow -->
  <text x="110" y="145"
    font-family="ui-sans-serif, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    font-size="22" font-weight="600" fill="#1e3a8a"
    letter-spacing="3">
    PROFESSOR · CONSULTANT · BUILDER
  </text>

  <!-- Name (serif), two lines so it fits with the portrait on the right -->
  <text x="110" y="225"
    font-family="ui-serif, Georgia, 'Times New Roman', serif"
    font-size="64" font-weight="600" fill="#0b1221">
    Prof. Dr.
  </text>
  <text x="110" y="295"
    font-family="ui-serif, Georgia, 'Times New Roman', serif"
    font-size="64" font-weight="600" fill="#0b1221">
    Kay Rottmann
  </text>

  <!-- Tagline line 1 -->
  <text x="110" y="370"
    font-family="ui-serif, Georgia, 'Times New Roman', serif"
    font-size="32" fill="#2b3245">
    Angewandte
    <tspan font-style="italic" fill="#1e3a8a">AI &amp; Daten</tspan>,
  </text>

  <!-- Tagline line 2 -->
  <text x="110" y="412"
    font-family="ui-serif, Georgia, 'Times New Roman', serif"
    font-size="32" fill="#2b3245">
    von der Forschung in die Produktion.
  </text>

  <!-- Credentials row -->
  <text x="110" y="475"
    font-family="ui-sans-serif, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    font-size="22" fill="#5b6577">
    HdM Stuttgart · r7net GmbH · Meta · Bosch · Amazon
  </text>

  <!-- Domain -->
  <text x="110" y="555"
    font-family="ui-sans-serif, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    font-size="20" font-weight="600" fill="#1e3a8a"
    letter-spacing="1">
    kay-rottmann.de
  </text>
</svg>
`;

const bgBuffer = Buffer.from(bg);

// Composite portrait onto the right side of the background
await sharp(bgBuffer)
  .composite([
    {
      input: portraitBuffer,
      top: 75,
      left: 1200 - portraitSize - 80, // 80px right margin
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

const stats = await sharp(outPath).metadata();
console.log(
  `Wrote ${outPath} (${stats.width}x${stats.height}, ${stats.format})`,
);
