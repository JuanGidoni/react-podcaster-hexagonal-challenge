// src/features/catalog/ui/pages/EpisodeDetailPage/EpisodeDetailPage.test.tsx

/**
 * @file Unit tests for EpisodeDetailPage (placeholder).
 * @description Verifies that the page renders the heading and basic episode/podcast IDs.
 */

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EpisodeDetailPage } from "./EpisodeDetailPage";

describe("EpisodeDetailPage (placeholder)", () => {
  /**
   * @test Renders heading and IDs from route params.
   */
  it("renders heading and IDs from route params", () => {
    render(
      <MemoryRouter initialEntries={["/podcast/77/episode/999"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetailPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /episode detail/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Podcast ID:/)).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
    expect(screen.getByText(/Episode ID:/)).toBeInTheDocument();
    expect(screen.getByText("999")).toBeInTheDocument();
  });
});
