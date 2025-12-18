# Assimetria-Test — Backend

Brief backend for the Assimetria project. This service provides article-related APIs, background jobs and integrates with AI services and a Prisma-backed database.

## Quick Start

Prerequisites:
- Node.js (v16+ recommended)
- npm (or yarn)
- Optional: Docker & Docker Compose

Install dependencies:

```bash
cd backend
npm install
```

Create your environment file from the example and fill the values:

```bash
cd backend
# Unix/macOS
cp .env.example .env
# Windows PowerShell
copy .env.example .env
```

Common environment variables (defined in `.env.example`):
- `DATABASE_URL` — your database connection string for Prisma
- `OPENAI_API_KEY` (or other AI provider keys) — API key for AI client
- `PORT` — HTTP server port (optional)

If you use Prisma migrations:

```bash
npx prisma migrate dev --schema=prisma/schema.prisma
```

Run the service (examples):

```bash
# Run with Node
node .
```

## Project layout (important files)
- `src/index.js` — application entry
- `src/routes/articleRoutes.js` — article API routes
- `src/services/aiClient.js` — AI integration helper
- `src/services/articleJob.js` and `src/jobs/runArticleJob.js` — background job logic
- `prisma/schema.prisma` — Prisma schema

## Docker

There is a `Dockerfile` in the backend folder and a `docker-compose.yml` in the repo's infra folder. To build and run the backend image locally:

```bash
cd backend
docker build -t assimetria-backend .
# then run with appropriate env and network settings
```

Or use the repository `docker-compose.yml` to start services together:

```bash
docker-compose up --build
```

## Notes for developers
- Background jobs are implemented under `src/jobs/` — ensure required environment variables are set when running scheduled jobs.

## Debugging & Logs
- Check console logs from `node .` for startup errors.
- Ensure the `.env` values are correct — missing keys (AI or DB) will cause failures.