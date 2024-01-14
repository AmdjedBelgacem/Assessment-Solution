import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LanguageToggle from "../src/app/components/LanguageToggle"

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => ({ slice: jest.fn(() => "mockedPathname") })),
}));

describe("LanguageToggle Component", () => {
  it("renders LanguageToggle component", () => {
    render(<LanguageToggle />);
    
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
    expect(screen.getByText("Türkçe")).toBeInTheDocument();
  });

  it("toggles language dropdown when the button is clicked", () => {
    render(<LanguageToggle />);

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByRole("button"));
  });
});
