// src/app/ui/components/LoadingSpinner/LoadingSpinner.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingSpinner } from "@/app/ui/components";

test("renders with role status and aria-label", () => {
  render(<LoadingSpinner ariaLabel="Loading data..." />);
  const el = screen.getByRole("status");
  expect(el).toHaveAttribute("aria-label", "Loading data...");
});
