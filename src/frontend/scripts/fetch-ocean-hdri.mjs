#!/usr/bin/env node
/**
 * Downloads a CC0 sunset HDRI (1k JPG) from Poly Haven for ocean reflections.
 * Run: node scripts/fetch-ocean-hdri.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/assets/ocean/hdri");

const HDRI_URL =
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/jpg/1k/sunset_fairway_1k.jpg";

async function main() {
  await mkdir(outDir, { recursive: true });
  const dest = path.join(outDir, "sunset_1k.jpg");
  console.log("Fetching HDRI from Poly Haven...");
  const res = await fetch(HDRI_URL, {
    headers: { "User-Agent": "gaetano-portfolio-setup/1.0" },
  });
  if (!res.ok) {
    throw new Error(`HDRI download failed: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`Saved ${dest} (${(buf.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
