#!/usr/bin/env node
/**
 * Downloads a CC0 coral GLB for the reef footer.
 * Run: node scripts/fetch-ocean-models.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/assets/ocean/models");

const SOURCES = [
  {
    name: "coral_cluster.glb",
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb",
  },
];

async function download(url: string, dest: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "gaetano-portfolio-setup/1.0" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`Saved ${dest} (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const src of SOURCES) {
    try {
      await download(src.url, path.join(outDir, src.name));
    } catch (err) {
      console.warn(`Skip ${src.name}:`, err.message);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
