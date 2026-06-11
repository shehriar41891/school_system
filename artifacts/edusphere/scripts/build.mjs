import { rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

process.env.PORT = process.env.PORT || "5173";
process.env.BASE_PATH = process.env.BASE_PATH || "/";

rmSync(resolve(pkgRoot, "node_modules", ".vite-temp"), {
  recursive: true,
  force: true,
});

const { build } = await import("vite");

await build({
  configFile: resolve(pkgRoot, "vite.config.ts"),
});
