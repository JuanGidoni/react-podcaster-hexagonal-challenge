// src/features/catalog/ui/pages/HomePage/HomePage.test.tsx

/**
 * @file Unit tests for the HomePage component.
 * @description
 * Ensures the HomePage renders correctly, filters items as the user types,
 * and displays the correct count in CounterBadge.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePage } from "./HomePage";
import { mockPodcasts } from "./mockPodcasts";

describe("HomePage", () => {
  /**
   * @test Renders all podcasts initially.
   */
  it("renders all podcasts on load", () => {
    render(<HomePage initialData={mockPodcasts} />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(mockPodcasts.length);
  });

  /**
   * @test Filters podcasts by query (title or author).
   */
  it("filters podcasts by search query", () => {
    render(<HomePage initialData={mockPodcasts} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "React" } });
    const filtered = screen.getAllByRole("listitem");
    expect(filtered).toHaveLength(1);
    expect(screen.getByText(/React Universe/i)).toBeInTheDocument();
  });

  /**
   * @test Updates the counter when filter changes.
   */
  it("updates CounterBadge when filter changes", () => {
    render(<HomePage initialData={mockPodcasts} />);
    const counter = screen.getByText(mockPodcasts.length.toString());
    expect(counter).toBeInTheDocument();
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Tech" } });
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
