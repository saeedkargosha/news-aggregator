import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "./Button";
import { vi } from "vitest";

describe("Button component", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("should call onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
