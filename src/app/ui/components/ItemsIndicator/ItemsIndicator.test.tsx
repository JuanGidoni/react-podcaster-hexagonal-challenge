// src/app/ui/components/ItemsIndicator/ItemsIndicator.test.tsx

/**
 * @file Unit tests for ItemsIndicator.
 * @description Verifies singular/plural labeling and rendering of count.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ItemsIndicator } from "./ItemsIndicator";

describe("ItemsIndicator", () => {
  /**
   * @test Renders plural by default when count !== 1.
   */
  it("renders plural label for counts other than one", () => {
    render(<ItemsIndicator count={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(/items/i)).toBeInTheDocument();
  });

  /**
   * @test Renders singular when count === 1.
   */
  it("renders singular label for count of one", () => {
    render(<ItemsIndicator count={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/item/i)).toBeInTheDocument();
  });

  /**
   * @test Supports custom labels.
   */
  it("supports custom singular/plural labels", () => {
    render(<ItemsIndicator count={2} singular="podcast" plural="podcasts" />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/podcasts/i)).toBeInTheDocument();
  });
});
