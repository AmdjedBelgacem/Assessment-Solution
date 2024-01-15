import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../app/components/ThemeToggle";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

const classListMock = {
  add: jest.fn(),
  remove: jest.fn(),
};

global.document.documentElement.classList = classListMock;
global.localStorage = localStorageMock;

describe("ThemeToggle component", () => {
  it("renders ThemeToggle component", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("loads initial theme mode from local storage", () => {
    // Setting the initial theme mode in the mock localStorage.
    localStorageMock.getItem.mockReturnValueOnce("dark");

    render(<ThemeToggle />);
  });
});
