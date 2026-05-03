/**
 * Nach `vite build`: schreibt dist/env.json aus Vercel-/CI-Umgebungsvariablen,
 * falls gesetzt; sonst Kopie von ./env.json (lokales Default).
 *
 * Vercel UI (Production / Preview): optional setzen:
 * - BACKEND_HOST
 * - BACKEND_CANISTER_ID
 * - PROJECT_ID
 * - II_DERIVATION_ORIGIN
 *
 * Vite-/ICP-Build-Zeit: weiterhin CANISTER_*, DFX_* in Vercel (siehe vite.config.js).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const distEnvPath = path.join(distDir, "env.json");
const srcEnvPath = path.join(root, "env.json");

const ENV_KEYS = [
  "BACKEND_HOST",
  "BACKEND_CANISTER_ID",
  "PROJECT_ID",
  "II_DERIVATION_ORIGIN",
];

function hasRuntimeOverrides() {
  return ENV_KEYS.some((k) => {
    const v = process.env[k];
    return v !== undefined && v !== "" && v !== "undefined";
  });
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error("write-env-dist: dist/ fehlt — zuerst vite build ausführen.");
    process.exit(1);
  }

  if (hasRuntimeOverrides()) {
    const payload = {
      backend_host:
        process.env.BACKEND_HOST &&
        process.env.BACKEND_HOST !== "undefined"
          ? process.env.BACKEND_HOST
          : "undefined",
      backend_canister_id:
        process.env.BACKEND_CANISTER_ID &&
        process.env.BACKEND_CANISTER_ID !== "undefined"
          ? process.env.BACKEND_CANISTER_ID
          : "undefined",
      project_id:
        process.env.PROJECT_ID && process.env.PROJECT_ID !== "undefined"
          ? process.env.PROJECT_ID
          : "undefined",
      ii_derivation_origin:
        process.env.II_DERIVATION_ORIGIN &&
        process.env.II_DERIVATION_ORIGIN !== "undefined"
          ? process.env.II_DERIVATION_ORIGIN
          : "undefined",
    };
    fs.writeFileSync(distEnvPath, `${JSON.stringify(payload, null, 2)}\n`);
    return;
  }

  if (!fs.existsSync(srcEnvPath)) {
    console.error("write-env-dist: env.json fehlt unter src/frontend/.");
    process.exit(1);
  }

  fs.copyFileSync(srcEnvPath, distEnvPath);
}

main();
