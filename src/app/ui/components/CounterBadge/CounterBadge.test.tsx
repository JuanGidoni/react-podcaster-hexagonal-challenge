import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CounterBadge } from "@/app/ui/components";

test("shows counter value", () => {
  render(<CounterBadge count={42} />);
  expect(screen.getByText("42")).toBeInTheDocument();
});
