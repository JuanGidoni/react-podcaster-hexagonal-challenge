// src/features/catalog/ui/pages/PodcastDetailPage/PodcastDetailPage.test.tsx

/**
 * @file Unit tests for PodcastDetailPage (placeholder).
 * @description Verifies that the page renders the heading and basic layout.
 */

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PodcastDetailPage } from "./PodcastDetailPage";

describe("PodcastDetailPage (placeholder)", () => {
  /**
   * @test Renders the heading and uses the URL param as ID.
   */
  it("renders heading and ID from route params", () => {
    render(
      <MemoryRouter initialEntries={["/podcast/123"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /podcast detail/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });
});
