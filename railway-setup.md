# Railway Deployment Guide

## 1. Environment Variables

In your Railway project settings, add the following environment variable:

```bash
DATABASE_URL="file:/mnt/data/dev.db"
```

This ensures the application looks for the SQLite database in the persistent volume we configured in `railway.json`.

## 2. Persistence

Ensure `railway.json` is present in the root of your repository:

```json
{
  "deploy": {
    "persistence": {
      "data": "/mnt/data"
    }
  }
}
```

## 3. Deployment

Push your changes to GitHub. Railway will automatically detect the changes and deploy.

- The `build` command (`npx prisma generate && next build`) will run.
- The `start` command (`next start`) will run.
- The database will be seeded automatically if you configured a post-deploy script, otherwise you may need to run `npx prisma db seed` manually via the Railway CLI or console if needed (though typically for SQLite we rely on the file existing or being created by the app/seed).
