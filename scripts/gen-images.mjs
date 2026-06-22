// Generate responsive, next-gen image variants from the source PNGs.
// Produces <base>-{400,800,1200,1600}w.webp + a <base>-1200w.jpg fallback,
// which OptimizedImage / Hero / PageHero reference. Run with `npm run gen:images`.
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Full-resolution originals live outside public/ so they never ship to dist;
// only the resized variants written into public/images are deployed.
const srcDir = join(__dirname, "..", "image-sources");
const outDir = join(__dirname, "..", "public", "images");

const SOURCES = ["kayak", "paddle"];
const WIDTHS = [400, 800, 1200, 1600];

async function main() {
  // All variants are independent — generate them concurrently.
  const tasks = SOURCES.flatMap((base) => {
    const input = join(srcDir, `${base}.png`);
    const webp = WIDTHS.map(async (w) => {
      await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(join(outDir, `${base}-${w}w.webp`));
      console.log(`  ${base}-${w}w.webp`);
    });
    const jpg = (async () => {
      await sharp(input).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(join(outDir, `${base}-1200w.jpg`));
      console.log(`  ${base}-1200w.jpg`);
    })();
    return [...webp, jpg];
  });
  await Promise.all(tasks);
  console.log("Image variants generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
