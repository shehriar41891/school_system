import { spawnSync } from "node:child_process";
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

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const result = spawnSync(
  pnpm,
  ["exec", "vite", "build", "--config", "vite.config.ts"],
  {
    cwd: pkgRoot,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  },
);

process.exit(result.status ?? 1);
