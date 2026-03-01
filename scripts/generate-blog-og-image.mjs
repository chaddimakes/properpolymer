import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 1200;
const H = 630;

// SVG: dark background, PP mark top-left, centered title + subtitle
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- solid dark background -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#0d0d0d" />

  <!-- PP mark — top left -->
  <rect x="60" y="50" width="56" height="56" rx="10" fill="#e07b39" />
  <text
    x="88"
    y="86"
    font-family="'Courier New', Courier, monospace"
    font-size="24"
    font-weight="700"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
  >PP</text>

  <!-- title line 1 (orange) -->
  <text
    x="${W / 2}"
    y="${H / 2 - 60}"
    font-family="Arial Black, Arial, sans-serif"
    font-size="52"
    font-weight="900"
    fill="#e07b39"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-1"
  >I Built an E-Commerce Website</text>

  <!-- title line 2 (orange) -->
  <text
    x="${W / 2}"
    y="${H / 2 + 2}"
    font-family="Arial Black, Arial, sans-serif"
    font-size="52"
    font-weight="900"
    fill="#e07b39"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-1"
  >with Zero Coding Experience</text>

  <!-- subtitle (white) -->
  <text
    x="${W / 2}"
    y="${H / 2 + 80}"
    font-family="Arial, sans-serif"
    font-size="28"
    font-weight="400"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
    opacity="0.85"
  >The side business was always the plan.</text>

  <text
    x="${W / 2}"
    y="${H / 2 + 118}"
    font-family="Arial, sans-serif"
    font-size="28"
    font-weight="400"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
    opacity="0.85"
  >The website was always the excuse.</text>
</svg>
`.trim();

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(join(root, "public", "blog-og-image.jpg"));

console.log("blog-og-image.jpg written to public/");
