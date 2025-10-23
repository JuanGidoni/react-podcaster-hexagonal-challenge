// src/app/routes.tsx

/**
 * @file Application routes configuration.
 * @description
 * Defines the SPA routes using React Router v6:
 *  - "/" (Home)
 *  - "/podcast/:podcastId" (Podcast detail)  [placeholder for now]
 *  - "/podcast/:podcastId/episode/:episodeId" (Episode detail)  [placeholder for now]
 * Includes a catch-all 404 and attaches the App layout as the parent element.
 */

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// HomePage lives under the feature folder (feature-first architecture)
// If you created a barrel (index.ts) next to HomePage, you can import from that instead.
import { HomePage } from "@/features/catalog/ui/pages/HomePage/HomePage";

/**
 * Minimal placeholders to keep the router healthy
 * until real pages are implemented.
 */
const PodcastDetailPlaceholder = () => (
  <main style={{ padding: "1rem" }}>
    <h2>Podcast Detail (coming soon)</h2>
  </main>
);
const EpisodeDetailPlaceholder = () => (
  <main style={{ padding: "1rem" }}>
    <h2>Episode Detail (coming soon)</h2>
  </main>
);
const NotFound = () => (
  <main style={{ padding: "1rem" }}>
    <h2>404 — Not found</h2>
  </main>
);

/**
 * Main router declaration.
 * Uses the App layout as the parent element with nested child routes.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "podcast/:podcastId", element: <PodcastDetailPlaceholder /> },
      {
        path: "podcast/:podcastId/episode/:episodeId",
        element: <EpisodeDetailPlaceholder />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
