# Deploy EduSphere on Vercel

This repo is a **frontend-only** Vercel deploy. The Express API in `artifacts/api-server` is **not** deployed to Vercel.

## Vercel project settings (required)

Open **Project → Settings → General** and set:

| Setting | Value |
|---------|--------|
| **Repository** | `shehriar41891/school_system` |
| **Production Branch** | `main` |
| **Root Directory** | `artifacts/edusphere` *(recommended)* or empty (repo root) |
| **Framework Preset** | Other |
| **Build Command** | None — override **disabled** ✓ |
| **Output Directory** | None — override **disabled** ✓ |
| **Install Command** | None — override **disabled** ✓ |

Vercel reads commands from `vercel.json` automatically when overrides are off.

### If Root Directory = `artifacts/edusphere` (recommended)

Uses `artifacts/edusphere/vercel.json`:
- Install: `cd ../.. && pnpm install`
- Build: `PORT=5173 BASE_PATH=/ pnpm run build`
- Output: `dist/public`

### If Root Directory = empty (repo root)

Uses root `vercel.json`:
- Install: `pnpm install`
- Build: `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/edusphere run build`
- Output: `artifacts/edusphere/dist/public`

**Do not** set Root Directory to `artifacts/api-server`.

## Redeploy

1. **Deployments** → latest → **Redeploy**
2. Check **Clear build cache**
3. Confirm the deployment commit is the latest on `main`

## Local build test

```bash
pnpm install
pnpm run build
```

Output: `artifacts/edusphere/dist/public`
