# Events Timer

A simple countdown application with two time dependent notifications for speakers at events, conferences, and similar talks.

## Online Version

- **https://hlavacm.github.io/events-timer/**

## Requirements

- Node.js 20 or newer

## Local Setup

```bash
npm install
npx playwright install
npm run dev
```

The dev server runs on `http://localhost:5173`.

## Commands

```bash
npm run dev         # local development with hot reload
npm run build       # production build into docs/
npm run preview     # preview the production build locally
npm run lint        # ESLint
npm run typecheck   # TypeScript check
npm test            # typecheck, unit tests, and e2e tests
npm run test:ci     # typecheck, coverage, and e2e tests
npm run test:unit   # Vitest unit tests
npm run test:coverage  # unit tests with coverage report
npm run test:e2e    # Playwright end-to-end tests
```

## Stack

- Vue 3 + TypeScript
- Vite
- Pinia
- Tailwind CSS
- Vitest
- Playwright
- lucide-vue-next

## Deployment

Production output is generated into `docs/` for GitHub Pages deployment. Do not edit files in `docs/` manually; rebuild with `npm run build`.
