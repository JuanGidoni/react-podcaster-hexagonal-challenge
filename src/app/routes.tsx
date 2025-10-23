// src/app/routes.tsx

import App from "./App";
import { HomePage } from "@/features/catalog/ui/pages/";
import { PodcastDetailPage } from "@/features/catalog/ui/pages/PodcastDetailPage";
import { EpisodeDetailPage } from "@/features/catalog/ui/pages/EpisodeDetailPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "podcast/:podcastId", element: <PodcastDetailPage /> },
      {
        path: "podcast/:podcastId/episode/:episodeId",
        element: <EpisodeDetailPage />,
      },
      {
        path: "*",
        element: (
          <main style={{ padding: "1rem" }}>
            <h2>404 — Not found</h2>
          </main>
        ),
      },
    ],
  },
]);
