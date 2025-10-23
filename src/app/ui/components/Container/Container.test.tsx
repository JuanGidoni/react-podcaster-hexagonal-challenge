// src/app/ui/components/Container/Container.test.tsx

/**
 * @file Unit tests for the Container component.
 * @description
 * Verifies that:
 *  - It renders children correctly.
 *  - It supports changing the underlying HTML tag via the `as` prop.
 *  - It merges custom class names with the base `.app-container` class.
 *  - (Accessibility) The wrapper is present in the document and queryable.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Container } from "@/app/ui/components";

describe("Container", () => {
  /**
   * Ensures children are rendered inside the container.
   */
  it("renders children content", () => {
    render(
      <Container>
        <h2 data-testid="child">Hello</h2>
      </Container>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });

  /**
   * Confirms the `as` prop changes the underlying HTML element.
   */
  it("renders as the specified HTML tag via `as` prop", () => {
    render(
      <Container as="section">
        <span>Content</span>
      </Container>
    );
    const el = screen.getByText("Content").closest("section");
    expect(el).toBeInTheDocument();
  });

  /**
   * Validates that custom classes are merged with the base class.
   */
  it("merges custom className with base `.app-container`", () => {
    render(<Container className="custom-class">X</Container>);
    const el = screen.getByText("X").parentElement;
    expect(el).toHaveClass("app-container");
    expect(el).toHaveClass("custom-class");
  });
});
