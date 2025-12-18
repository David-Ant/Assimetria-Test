# Assimetria-Test — Frontend

Minimal React + Vite frontend for the Assimetria project. This app communicates with the backend APIs and provides a simple UI for browsing articles.

## Quick Start

Prerequisites:
- Node.js (v16+ recommended)
- npm (or yarn)

Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

Open the app at the URL printed by Vite (typically `http://localhost:5173` for local development).

## Environment

Copy the example env file and set any necessary values:

```bash
cd frontend
copy .env.example .env
```

Common variables (see `.env.example`):
- `VITE_API_BASE` — base URL for the backend API

The app uses Vite's `VITE_` prefix for env variables accessible in the browser.

## Scripts

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — build production assets into `dist/`
- `npm run preview` — locally preview the production build

Run the build:

```bash
cd frontend
npm run build
npm run preview
```

## Project Structure (key files)

- `index.html` — app HTML entry
- `src/main.jsx` — React bootstrapping
- `src/App.jsx` — top-level app component
- `src/pages/ArticlePage.jsx` — article view
- `src/components/BlogCard.jsx` — article card component
- `src/api/client.js` — API client (uses `VITE_API_BASE`)
- `src/*.css` — styles

## Connecting to Backend

Set `VITE_API_BASE` to point to the backend. The frontend expects the backend to expose article APIs under a REST path used in `src/api/client.js`.

If you run both services locally using the project root `docker-compose.yml`, ensure the frontend's `VITE_API_BASE` points to the backend service name or mapped host/port.

## Docker

There is a `Dockerfile` in the frontend folder. To build the image:

```bash
cd frontend
docker build -t assimetria-frontend .
```

You can also use the repository-level `docker-compose.yml` to run both frontend and backend together.

## Notes for Developers

- The frontend was initialized with Vite; feel free to migrate to TypeScript if you want stronger typing.
- Keep the `VITE_` env prefix for variables exposed to client code.
- Update `src/api/client.js` if backend routes change.