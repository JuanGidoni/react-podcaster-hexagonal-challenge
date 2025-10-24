// src/features/catalog/ui/components/PodcastCard/PodcastCard.test.tsx

/**
 * @file Unit tests for PodcastCard.
 * @description Verifies rendering and selection behavior.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PodcastCard } from "./PodcastCard";

describe("PodcastCard", () => {
  /**
   * @test Renders title, author, and image with alt text.
   */
  it("renders content correctly", () => {
    render(
      <PodcastCard
        id="1"
        title="React Universe"
        author="Carlos Vega"
        image="https://via.placeholder.com/150"
      />
    );
    expect(
      screen.getByRole("img", { name: /react universe cover/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /react universe/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/carlos vega/i)).toBeInTheDocument();
  });

  /**
   * @test Calls onSelect when clicked.
   */
  it("invokes onSelect on click", () => {
    const onSelect = jest.fn();
    render(
      <PodcastCard
        id="1"
        title="React Universe"
        author="Carlos Vega"
        image="https://via.placeholder.com/150"
        onSelect={onSelect}
      />
    );
    fireEvent.click(
      screen.getByRole("button", { name: /open podcast react universe/i })
    );
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
