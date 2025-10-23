// src/app/ui/components/SearchInput/SearchInput.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchInput } from "@/app/ui/components";

test("Controlled and dispatch onChange", () => {
  let value = "";
  const onChange = (v: string) => {
    value = v;
  };
  render(<SearchInput value={value} onChange={onChange} />);
  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "itx" } });
  expect(value).toBe("itx");
});
