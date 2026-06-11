# Deploy EduSphere on Vercel

This repo is a **frontend-only** Vercel deploy. The Express API in `artifacts/api-server` is **not** deployed to Vercel.

## Vercel project settings (required)

Open **Project → Settings → General** and set:

| Setting | Value |
|---------|--------|
| **Repository** | `shehriar41891/school_system` |
| **Production Branch** | `main` |
| **Root Directory** | *(empty — repo root)* **OR** `artifacts/edusphere` |
| **Framework Preset** | Other |
| **Build Command** | *(empty — uses `vercel.json` or `vercel-build` script)* |
| **Output Directory** | *(empty — uses `vercel.json`)* |
| **Install Command** | *(empty — uses `vercel.json`)* |

**Do not** set Root Directory to `artifacts/api-server`. That folder is a backend stub; Vercel will try to compile it as a serverless API and fail with `pino-http` / `src/app.ts` errors.

If you previously set Root Directory to `artifacts/api-server`, change it to empty or `artifacts/edusphere`, then redeploy.

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
