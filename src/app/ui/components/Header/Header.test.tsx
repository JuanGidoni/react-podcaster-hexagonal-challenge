// src/app/ui/components/Header/Header.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the child that needs the context:
jest.mock("@/app/ui/components/HeaderLoadingDot/HeaderLoadingDot", () => ({
  HeaderLoadingDot: () => <span data-testid="loading-dot" />,
}));

import { Header } from "@/app/ui/components";

test("cliquea el título y dispara callback", () => {
  const onClick = jest.fn();
  render(<Header title="Podcaster" onTitleClick={onClick} />);
  fireEvent.click(screen.getByRole("button", { name: /ir al inicio/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
