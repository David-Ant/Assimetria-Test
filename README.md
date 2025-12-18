# Assimetria-Test

Lightweight publishing demo combining a Node.js + Prisma backend with a React + Vite frontend.

This repository contains three main areas:

- `backend/` — REST API, Prisma schema and background jobs (AI integration, article processing)
- `frontend/` — React + Vite app for browsing articles
- `infra/` — convenience files for deployment and local compose (`docker-compose.yml`, buildspec, env examples)

See the service-level READMEs for details: `backend/README.md` and `frontend/README.md`.

Quick goals
- Local developer-friendly setup for iterating on frontend and backend
- Docker setup for running both services together
- Prisma for schema/migrations

Prerequisites
- Node.js v16+ and npm (or yarn)
- Docker & Docker Compose (recommended for combined runs)

Local development

- Start backend only:

```bash
cd backend
npm install
copy .env.example .env   # PowerShell (Windows)
# edit .env to add DATABASE_URL and AI keys
node .
```

- Start frontend only:

```bash
cd frontend
npm install
copy .env.example .env   # set VITE_API_BASE to backend API URL
npm run dev
```

Run both with Docker Compose (recommended for consistency):

```bash
docker-compose up --build
```

Notes about environment variables
- Each service ships an `.env.example` (`backend/.env.example`, `frontend/.env.example`, `infra/.env.example`). Copy to `.env` and fill values before running.
- Frontend uses `VITE_`-prefixed variables (e.g. `VITE_API_BASE`) to expose config to the browser.

Database & Prisma
- The Prisma schema is at `prisma/schema.prisma` (backend). If you change the schema run migrations locally:

```bash
cd backend
npx prisma migrate dev --schema=prisma/schema.prisma
```

Docker images
- Individual Dockerfiles are present at `frontend/Dockerfile` and `backend/Dockerfile`.
- The repo-level `infra/docker-compose.yml` can orchestrate both services for local or CI use.

Project structure (high-level)
- `backend/` — API, jobs, prisma, migrations
- `frontend/` — React app, components, pages, API client
- `infra/` — compose, env templates, CI buildspec