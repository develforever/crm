# Copilot / AI agent instructions — crm

Purpose
- Short, actionable instructions for AI coding agents working in this repository.
- This file defines architectural rules, workflows, and guardrails AI must follow.

---

## High-level architecture
- Backend: Symfony 7.4 (PHP 8.2+)
- Frontend: React (Webpack Encore)
- API-first architecture

### Backend structure
- Controllers: `src/Controller/*`
- CRM API controllers: `src/Controller/Crm/Api/*`
- DTOs & API layer: `src/Api/Crm/*`
- Domain model: Doctrine entities in `src/Entity/*`
- Repositories: `src/Repository/*`

### Frontend structure
- CRM SPA: `assets/crm/`
- Public frontend: `assets/front/`
- React modules live in `assets/crm/modules/**`
- SPA mount point: `templates/crm/index.html.twig` (`<div id="root"></div>`)

---

## Backend rules (IMPORTANT)
- Controllers must stay thin.
- Business logic belongs in services.
- Do NOT return Doctrine entities directly in API responses.
- Use DTOs + serializer groups for all API responses.
- Do NOT change existing API routes, HTTP methods, or response shapes unless explicitly asked.
- Routing is defined via PHP attributes.

---

## Frontend rules (IMPORTANT)
- Use functional React components.
- Use React Router inside `assets/crm/modules/*`.
- Keep frontend routes in sync with Symfony routes.
- Avoid overengineering:
  - no unnecessary hooks
  - no reducers unless clearly justified
  - no premature abstractions
- Validation logic should live outside JSX when possible.

---

## Design philosophy
- Prefer simple, readable solutions over clever abstractions.
- Maintain existing behavior unless explicitly asked to change it.
- Small, localized refactors are preferred over large rewrites.

---

## AI guardrails (STRICT)
- Do NOT introduce new frameworks, build tools, or architectural patterns.
- Do NOT refactor across backend/frontend boundaries without confirmation.
- Do NOT modify unrelated files.
- Ask before large or cross-module refactors.
- If uncertain, ask clarifying questions before making changes.
- Always prioritize maintainability and clarity.
- Follow existing coding styles and conventions.
- Do not modify files, always preserve the original content unless explicitly instructed to change them.
- Do not propose commits if not explicitly instructed.

---

## Tooling & workflows
- PHP deps: `composer install`
- JS deps: `npm ci`
- Dev assets: `npm run dev` or `npm run dev-server`
- Watch assets: `npm run watch`
- Prod build: `npm run build`
- Storybook: `npm run storybook`, `npm run build-storybook`
- Tests: `./bin/phpunit`
- Console: `./bin/console`

---

## Infrastructure
- Docker Compose: `compose.yaml` + `compose.override.yaml`
- Common: `docker compose up -d`
- Database only: `docker compose up -d database`
- Migrations:
  - `./bin/console doctrine:migrations:diff`
  - `./bin/console doctrine:migrations:migrate`
- Fixtures: `./bin/console doctrine:fixtures:load -n`
- Storybook CRM module stories: `assets/crm/**/stories*.jsx`

---

## Framework & integrations
- Gedmo extensions in use:
  - Translatable
  - SoftDeleteable
- Symfony UX / Stimulus Bridge:
  - `assets/front/stimulus_bootstrap.js`
  - `config/packages/ux_turbo.yaml`
- Webpack Encore output: `public/build/`
- Storybook uses MSW (`msw`, `msw-storybook-addon`)

---

## Testing & debugging
- Test bootstrap: `tests/bootstrap.php`
- Env: `.env`, `.env.test`
- Logs: `var/log/`
- Cache: `var/cache/`
- Clear cache: `./bin/console cache:clear`

---

## Quick map
- API controllers: `src/Controller/Crm/Api/*`
- DTOs & API data: `src/Api/Crm/*`
- React modules: `assets/crm/modules/**`
- Twig mount: `templates/crm/index.html.twig`
- Fixtures: `src/DataFixtures/AppFixtures.php`
- Entities: `src/Entity/*`
- Migrations: `migrations/`
