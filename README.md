# React Podcaster — Hexagonal Challenge

A from-scratch React + TypeScript app configured with Webpack (no CRA, no Vite), applying Hexagonal Architecture in the frontend.
It lists top podcasts, shows podcast detail, episode list, and an episode page with an inline audio player.
CSS is native (no UI libs), with unit tests (Jest + RTL) and optional E2E (Cypress).

---

## Common Commands

```shell
npm ci

# Start dev server (Webpack Dev Server on http://localhost:5173)
npm run dev

npm run test:watch

npm run build

npm test

npm run e2e
```

---

## Minimum versions

- Node.js ≥ `18.17.0` (LTS)

- npm ≥ `9.x`

- Browsers: last 2 Chrome/Edge/Firefox/Safari (ES2019+).

If you use nvm: `nvm use 18`

# Getting started

```bash
git clone <your-repo-url> react-podcaster-hexagonal-challenge

cd react-podcaster-hexagonal-challenge

npm ci

npm run dev
```

Development started at: http://localhost:5173

---

## Available scripts

```json
{
  "scripts": {
    "dev": "webpack serve --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js",
    "test": "jest",
    "e2e": "cypress open"
  }
}
```

## Project structure

```bash
src/
  app/
    App.tsx
    routes.tsx
    ui/
      components/
        Container/
          Container.tsx
          Container.css
          Container.test.tsx
        Header/
          HeaderLoadingDot.tsx
          HeaderLoadingDot.css
        Header/
          Header.tsx
          Header.css
          Header.test.tsx
        LoadingSpinner/
          LoadingSpinner.tsx
          LoadingSpinner.css
          LoadingSpinner.test.tsx
        ItemsIndicator/
          ItemsIndicator.tsx
          ItemsIndicator.css
          ItemsIndicator.test.tsx
        SearchInput/
          SearchInput.tsx
          SearchInput.css
          SearchInput.test.tsx
        index.ts
      pages/
        HomePage/
          HomePage.tsx
          HomePage.css
          HomePage.test.tsx
        ErrorPage/
          ErrorPage.tsx
          ErrorPage.css
          index.ts
  core/
    di/
      container.ts
    http/
      HttpClient.ts
      FetchHttpClient.ts
    cache/
      LocalStorageCache.ts
  features/
    catalog/
      domain/
        Podcast.ts
        Episode.ts
        PodcastId.ts
        EpisodeId.ts
        PodcastRepository.ts
      app/
        GetTop100.ts
        GetPodcastDetail.ts
        GetPodcastEpisodes.ts
      infra/
        adapters/
          RestPodcastRepository.ts
      ui/
        components/
          PodcastItemCard/
            PodcastItemCard.tsx
            PodcastItemCard.css
            PodcastItemCard.test.tsx
          EpisodeCard/
            EpisodeCard.tsx
            EpisodeCard.css
            EpisodeCard.test.tsx
        pages/
          PodcastDetailPage/
            PodcastDetailPage.tsx
            PodcastDetailPage.css
          EpisodeDetailPage/
            EpisodeDetailPage.tsx
            EpisodeDetailPage.css
index.html
main.tsx

```

`CSS is colocated next to components, no CSS libraries.`

---

## Architecture (Hexagonal in the Frontend)

- Domain (`features/*/domain`): Entities (e.g., `Podcast`, `Episode`ﬁ) are framework-agnostic.

- Application (`features/*/app`): Use cases orchestrate domain logic (e.g., `GetTop100`).

- Ports: interfaces (e.g., `PodcastRepository`).

- Adapters (`infra/adapters`): concrete implementations (e.g., REST/iTunes).

- Composition Root (`core/di/container.ts`): builds the object graph, wiring ports to adapters.

- UI (`app/ui` + `features/*/ui`): React components + pages consume use cases, never adapters directly.

## Data flow (happy path)

UI → Use Case (App) → Port (Domain) → Adapter (Infra) → HTTP → Adapter → Entities (Domain) → UI DTO

## API details & normalizers

- iTunes lookup returns mixed shapes:
  - Podcast meta: `wrapperType: 'collection'` or `wrapperType: 'track'` with `kind: 'podcast'`

  - Episodes: `wrapperType: 'track'` + `kind: 'podcast-episode'` or `wrapperType: 'podcastEpisode'`

  - Audio URL may be `episodeUrl` or `previewUrl`

- The adapter filters by `collectionId`, deduplicates, sorts DESC by date, and caps by `EPISODE_LIMIT`ﬁ.

- Local dev can enable CORS proxy via `VITE_CORS_PROXY`.

## Caching

LocalStorage cache for GETs with TTL (configurable in `RestPodcastRepository` / `LocalStorageCache`).

Entities remain pure; JSON DTOs are created at the UI edge via `.toJSON()` or tolerant DTO transforms.

## Error handling & loading

Route-level `errorElement` (React Router) → `ErrorPage`.

Pages use `Promise.allSettled` to avoid all-or-nothing failures (meta and episodes can fail independently).

Clear, user-friendly messages with optional “Details” link.

## Accessibility

Focusable interactive elements, labelled indicators, `role="status"`/`role="alert"` for loading and errors.

Images have alt text (e.g., `“Podcast cover”`).

Keyboard navigation verified in `E2E`.

## Testing

Unit tests (Jest + React Testing Library)

Located next to components and modules: `_.test.tsx` / `_.test.ts`.

Run:

```bash
npm test
npm run test:watch
npm run test:cov
```

### What we cover:

- UI components render/props/ARIA + interactions.

- Use cases call ports correctly (ports mocked).

- Adapters normalize iTunes shapes (podcastEpisode vs track+podcast-episode, episodeUrl fallback).

### E2E tests (Cypress)

- TODO

Run:

```bash
npm run e2e
```

## Code quality

- TypeScript strict mode enabled.

- TODO: Scripts to run linter, pre-commits and checks before pushing, etc...

## Known trade-offs

- We call iTunes directly from the browser to avoid adding a backend. For real production, a tiny BFF would:
  - Guarantee CORS,

  - Add caching/ETag/conditional requests,

- We keep CSS vanilla per requirement; in a larger app we’d consider CSS Modules or a design token system.

## Pending TODOs

- Improvements in the error handlers and error page.

- If needed and the app grows, we need to use a global react context or decide if we use redux, zustand, etc...

- More componetization (we can make more reusable components, this is just for a challenge)

# Author: (Juan Ignacio Gidoni)[https://juani.dev]

# Version: 0.0.4
