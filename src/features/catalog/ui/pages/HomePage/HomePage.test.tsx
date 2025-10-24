// src/features/catalog/ui/pages/HomePage/HomePage.test.tsx

/**
 * @file Unit tests for the HomePage component.
 * @description
 * Ensures the HomePage renders correctly, filters items as the user types,
 * updates the counter, and navigates to /podcast/:id when a card is clicked.
 */

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePage } from "./HomePage";
import { mockPodcasts } from "./mockPodcasts";

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/podcast/:podcastId"
          element={
            <main>
              <h2>Podcast Detail</h2>
              <span data-testid="podcast-id">OK</span>
            </main>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("HomePage", () => {
  /**
   * @test Renders all podcasts initially.
   */
  it("renders all podcasts on load", () => {
    renderWithRouter();
    // Each podcast renders a PodcastCard button
    const cards = screen.getAllByRole("button", { name: /open podcast/i });
    expect(cards).toHaveLength(mockPodcasts.length);
  });

  /**
   * @test Filters podcasts by query (title or author).
   */
  it("filters podcasts by search query", () => {
    renderWithRouter();
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "React" } });

    const cards = screen.getAllByRole("button", { name: /open podcast/i });
    expect(cards).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: /react universe/i })
    ).toBeInTheDocument();
  });

  /**
   * @test Updates the counter when filter changes.
   */
  it("updates CounterBadge when filter changes", () => {
    renderWithRouter();
    expect(
      screen.getByText(mockPodcasts.length.toString())
    ).toBeInTheDocument();

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Tech" } });
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  /**
   * @test Navigates to /podcast/:id when a card is clicked.
   */
  it("navigates to podcast detail on card click", () => {
    renderWithRouter();

    const first = mockPodcasts[0];
    const button = screen.getByRole("button", {
      name: new RegExp(`open podcast ${first?.title}`, "i"),
    });

    fireEvent.click(button);

    expect(
      screen.getByRole("heading", { name: /podcast detail/i })
    ).toBeInTheDocument();
  });
});
