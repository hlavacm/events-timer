# Repository Guidelines

## Project Structure & Module Organization

This is a Vue 3 single-page app built with Vite. Application code lives in `src/`: `main.ts` boots the app, `App.vue` is the root component, reusable UI pieces are in `src/components/`, shared helpers are in `src/utils/`, Pinia stores are in `src/stores/`, composables are in `src/composables/`, types are in `src/types/`, and global styles are in `src/styles/main.css`. Static source assets belong in `public/`. The `docs/` directory contains the generated production build used for publishing; do not edit it by hand unless you are intentionally updating deployed artifacts.

## Build, Test, and Development Commands

Run `npm install` to install dependencies from `package-lock.json`. Use `npm run dev` to launch the hot-reload dev server. Use `npm run build` to create the production bundle in `docs/`. Run `npm run lint` before committing. Run `npm run typecheck` for TypeScript validation. Run `npm run test:unit` for Vitest unit tests. Run `npm run test:coverage` for unit tests with coverage thresholds. Run `npm run test:e2e` for Playwright end-to-end tests.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, two-space indentation, final newlines, and no trailing whitespace. ESLint uses `typescript-eslint` and `eslint-plugin-vue`. Prefer semicolon-free TypeScript, single quotes, and idiomatic Vue `<script setup lang="ts">` components. Name Vue components in PascalCase, such as `SettingsModal.vue` and `ControlPanel.vue`. Keep shared logic in `src/utils/` or Pinia stores rather than duplicating it across components.

## Testing Guidelines

Unit tests live in `tests/unit/`. End-to-end tests live in `e2e/`. Add or update coverage when user-facing timer controls, settings, navigation, or rendered text change. Keep tests deterministic and target visible UI states, for example `getByTestId('countdown-display')`.

## Commit & Pull Request Guidelines

Keep commit messages concise and focused on one change. Pull requests should include a clear description, testing performed (`npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run test:e2e`, or build output), linked issues when available, and screenshots or screen recordings for visual changes. Mention when `docs/` was rebuilt for deployment.

## Security & Configuration Tips

Do not commit local secrets or machine-specific settings. Vite configuration lives in `vite.config.ts`. Prefer environment-specific changes there over hard-coded values in components.
