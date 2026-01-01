# Copilot / AI agent instructions — crm (concise)

Purpose
- Short, actionable notes to help an AI agent be productive in this repo (architecture, commands, patterns, key files).

High-level architecture
- Symfony 7.4 PHP app (backend) + React frontend assets managed by Webpack Encore.
- Backend structure: controllers in `src/Controller/*`, APIs in `src/Controller/Crm/Api/*` and DTOs under `src/Api/Crm/*`.
- Domain model: Doctrine entities in `src/Entity/*` with repositories in `src/Repository/*`.
- Frontend: two app bundles under `assets/crm/` and `assets/front/` (React lives under `assets/crm/modules`).
- Templates: twig templates in `templates/`; CRM single-page React app mounts in `templates/crm/index.html.twig` at `<div id="root"></div>`.

Key developer workflows (commands)
- Install PHP deps: `composer install`.
- Install Node deps: `npm ci` (or `npm install`).
- Run JS dev server (hot reload): `npm run dev` or `npm run dev-server` for encore dev-server.
- Watch assets: `npm run watch`.
- Build production assets: `npm run build`.
- Storybook: `npm run storybook`, build Storybook with `npm run build-storybook`.
- Run tests: `./bin/phpunit`.
- Run Symfony console: `./bin/console` (migrations, fixtures, etc.).
- DB via Docker Compose: `docker compose up -d` (see `compose.yaml` + `compose.override.yaml` for local ports). Useful commands: `docker compose up -d database`.
- Migrations: `./bin/console doctrine:migrations:diff` then `./bin/console doctrine:migrations:migrate`.
- Load fixtures: `./bin/console doctrine:fixtures:load -n` (see `src/DataFixtures/AppFixtures.php`).

Project-specific conventions & patterns
- Routing via PHP attributes (e.g., `#[Route('/crm/{reactRouting}', ...)]` in `src/Controller/Crm/*`).
- API responses use a Data wrapper: `App\Api\Crm\Data` (returned via `$this->json(...)`), and serializer groups (example: `cms_read`, `cms_view` in `src/Entity/CmsPage.php`).
- DTO and validation via attributes: `#[MapRequestPayload()]` and `#[Assert]` on DTOs (e.g., `src/Api/Crm/Cms/Dto/PagePutDto.php`).
- Entity features: Gedmo extensions are in use (translations `Gedmo\Translatable`, soft-deletes `Gedmo\SoftDeleteable`) — check entities like `CmsPage` and translation classes.
- Frontend routing: React Router is used inside `assets/crm/modules/*` (example: `assets/crm/modules/cms/Cms.jsx` mounts routes). Keep URLs and Symfony routes in sync.
- Templates + frontend: Twig provides global `window.AppConfig` values and an element to mount React (`templates/crm/index.html.twig`).

Integration points / external dependencies to watch
- Symfony UX / Stimulus bridge: `@symfony/stimulus-bridge` used in assets; see `assets/front/stimulus_bootstrap.js` and `config/packages/ux_turbo.yaml`.
- Webpack Encore outputs to `public/build/` per configuration in `webpack.config.js`.
- Database and mail are often run via Docker (`compose.yaml`).
- Storybook uses MSW (mock service worker) for stories; see `msw` and `msw-storybook-addon` in `package.json`.

Testing & debugging notes
- Tests bootstrap loads env from `.env` / `.env.test` (`tests/bootstrap.php`).
- Use `APP_DEBUG=1` and Symfony web profiler (dev environment) for request inspection (routes, logs, queries).
- Logs and cache: `var/log/` and `var/cache/` respectively; clear cache with `./bin/console cache:clear`.

Where to look for common tasks (quick map)
- API examples: `src/Controller/Crm/Api/*` and `src/Api/Crm/*` (DTOs, Data wrapper).
- Frontend components & routes: `assets/crm/modules/**` and `assets/front/**`.
- Twig and mount point: `templates/crm/index.html.twig` and `templates/crm.html.twig`.
- Fixtures: `src/DataFixtures/AppFixtures.php`.
- Doctrine entities: `src/Entity/` (search for `#[Gedmo` for translation/soft-delete patterns).
- Migrations: `migrations/`.

Style & code expectations
- PHP: modern (PHP 8.2), attributes, PSR-12-like idioms; use typed properties & return types.
- JS: React 19+, use React Router for SPA, Storybook for component development; keep components under `assets/*`.

Examples to copy/paste
- Serve dev (backend + db + assets):
  1. `docker compose up -d` (postgres/mail)
  2. `composer install && npm ci`
  3. `./bin/console doctrine:migrations:migrate -n`
  4. `npm run dev` (or `npm run watch`) and `symfony server:start` (or `php -S` if you prefer)
- Add API: use attribute routes + DTOs + `$this->json($data, 200, [], ['groups'=>'cms_read'])`.

If anything is missing or unclear, tell me which area (backend, frontend, build, or tests) to expand with more concrete examples or commands. Please review and mark any sections you want me to expand or alter.

## AI guardrails (important)
- Do NOT change existing API routes or response shapes unless explicitly asked.
- Do NOT introduce new frontend frameworks or build tools.
- Do NOT refactor across backend/frontend boundaries without confirmation.
- Ask before large or cross-module refactors.
- Do not add additional dependencies without approval.

## Design philosophy
- Prefer simple, readable solutions over abstractions.
- Avoid overengineering (extra layers, reducers, patterns) unless justified.

## Testing
- When refactoring, keep existing test behavior unchanged.
- Add tests only when explicitly requested or when necessary to ensure correctness.