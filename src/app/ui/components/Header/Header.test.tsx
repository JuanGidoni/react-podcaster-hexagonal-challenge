// src/app/ui/components/Header/Header.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/app/ui/components";

test("cliquea el título y dispara callback", () => {
  const onClick = jest.fn();
  render(<Header title="Podcaster" onTitleClick={onClick} />);
  fireEvent.click(screen.getByRole("button", { name: /ir al inicio/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
