# Deploy EduSphere on Vercel

## Recommended Vercel project settings

| Setting | Value |
|---------|--------|
| **Repository** | `shehriar41891/school_system` |
| **Production Branch** | `main` |
| **Root Directory** | *(leave empty — use repo root)* |
| **Framework Preset** | Other |
| **Build Command** | *(leave empty — uses `vercel.json`)* |
| **Output Directory** | *(leave empty — uses `vercel.json`)* |
| **Install Command** | *(leave empty — uses `vercel.json`)* |

If **Root Directory** is set to `artifacts/api-server`, the build will fail — that folder is a backend stub, not the website. Clear it or set it to `artifacts/edusphere`.

## After changing settings

1. Deployments → latest deployment → **Redeploy**
2. Enable **Clear build cache**
3. Confirm the commit is `980b066` or newer

## Local build test

```bash
pnpm install
pnpm --filter @workspace/edusphere run build
```

Output should be in `artifacts/edusphere/dist/public`.
