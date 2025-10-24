// src/app/routes.tsx

import App from "./App";
import { HomePage } from "@/features/catalog/ui/pages/HomePage";
import { PodcastDetailPage } from "@/features/catalog/ui/pages/PodcastDetailPage";
import { EpisodeDetailPage } from "@/features/catalog/ui/pages/EpisodeDetailPage";
import { ErrorPage } from "@/app/ui/pages/";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "podcast/:podcastId", element: <PodcastDetailPage /> },
      {
        path: "podcast/:podcastId/episode/:episodeId",
        element: <EpisodeDetailPage />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
