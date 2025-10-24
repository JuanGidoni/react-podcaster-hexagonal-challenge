// src/features/catalog/ui/components/EpisodeCard/EpisodeCard.test.tsx

/**
 * @file Unit tests for EpisodeCard.
 * @description Verifies content rendering, date formatting, and selection behavior.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EpisodeCard } from "./EpisodeCard";

describe("EpisodeCard", () => {
  /**
   * @test Renders title, formatted date, and duration.
   */
  it("renders content with formatted date/duration", () => {
    render(
      <EpisodeCard
        id="e1"
        title="Episode One"
        dateISO="2024-05-10T12:00:00Z"
        durationMs={65_000} // 1m05s
      />
    );
    expect(
      screen.getByRole("button", { name: /open episode episode one/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Episode One/i)).toBeInTheDocument();
    // Date (en-GB): 10/05/2024
    expect(screen.getByText(/10\/05\/2024/)).toBeInTheDocument();
    // Duration: 01:05
    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  /**
   * @test Calls onSelect when clicked.
   */
  it("invokes onSelect on click", () => {
    const onSelect = jest.fn();
    render(
      <EpisodeCard
        id="e2"
        title="Episode Two"
        dateISO="2024-05-11T12:00:00Z"
        onSelect={onSelect}
      />
    );
    fireEvent.click(
      screen.getByRole("button", { name: /open episode episode two/i })
    );
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
