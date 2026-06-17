import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets", "ocean", "videos");
mkdirSync(root, { recursive: true });

const VIDEOS = [
  {
    name: "sunset-shore.mp4",
    url: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
  },
  {
    name: "underwater.mp4",
    url: "https://videos.pexels.com/video-files/5159863/5159863-hd_1920_1080_25fps.mp4",
  },
];

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-asset-fetch/1.0)",
      Referer: "https://www.pexels.com/",
    },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

for (const { name, url } of VIDEOS) {
  const dest = join(root, name);
  process.stdout.write(`Downloading ${name}… `);
  try {
    await download(url, dest);
    process.stdout.write("ok\n");
  } catch (e) {
    process.stdout.write(`failed (${e.message})\n`);
  }
}
