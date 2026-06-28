# Events Timer

[![Live demo](https://img.shields.io/badge/demo-online-22c55e?style=flat-square)](https://hlavacm.github.io/events-timer/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/hlavacm/events-timer/pages.yml?branch=master&style=flat-square&label=deploy&logo=githubactions&logoColor=white)](https://github.com/hlavacm/events-timer/actions/workflows/pages.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D24-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-BSD%203--Clause-blue?style=flat-square)](LICENSE)

A fullscreen countdown for speakers at talks, meetups, and conferences. Color-coded stages warn you before time runs out, so you can pace the presentation without glancing at a watch.

**[Open live demo](https://hlavacm.github.io/events-timer/)**

<p align="center">
  <a href="https://hlavacm.github.io/events-timer/">
    <img src="https://hlavacm.github.io/events-timer/static/screenshot.png" alt="Events Timer screenshot" width="720">
  </a>
</p>

## Features

- **Large, readable display** — built for projectors and stage monitors
- **Two warning thresholds** — amber warning and red final alert, by time or percentage of total duration
- **Visual states** — background color reflects idle, running, warning, danger, and paused
- **Automatic dark mode** — settings and dialogs follow your operating system theme
- **Quick presets** — common talk lengths from 5 to 120 minutes
- **Optional stopwatch** — track elapsed time alongside the countdown
- **Keyboard control** — `Space` to start/pause, `Esc` to reset while running
- **Persistent settings** — preferences saved in the browser

## Quick start

**Requirements:** Node.js 24 or newer

```bash
git clone https://github.com/hlavacm/events-timer.git
cd events-timer
npm install
npx playwright install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript check |
| `npm test` | Typecheck, unit tests, and end-to-end tests |
| `npm run test:ci` | Typecheck, coverage, and end-to-end tests |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:coverage` | Unit tests with coverage report |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run screenshot` | Rebuild and refresh the README screenshot |

## Tech stack

Vue 3 · TypeScript · Vite · Pinia · Tailwind CSS · Vitest · Playwright · lucide-vue-next

## Deployment

The site is published to [GitHub Pages](https://hlavacm.github.io/events-timer/) via the [Deploy to GitHub Pages](.github/workflows/pages.yml) workflow.

On every push to `master`, GitHub Actions:

1. installs dependencies with Node.js 24
2. runs lint and unit tests
3. runs `npm run build`
4. deploys the `dist/` output as a Pages artifact

To enable this in the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

For a local production build:

```bash
npm run build
```

Do not commit production build output by hand — GitHub Actions builds and deploys it from source.

## License

[BSD 3-Clause License](LICENSE) · Copyright (c) Martin Hlaváč
