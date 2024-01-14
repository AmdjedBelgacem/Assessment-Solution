import { renderHook } from "@testing-library/react";
import useFetchData from "../src/app/hooks/useFetchData"; // Assuming the code is in './useFetchData.js'
import axios from "axios";

jest.mock("axios"); 

describe("useFetchData", () => {
  test("fetches data successfully", async () => {
    const mockData = { data: "mock users" };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      useFetchData("https://api.example.com/users")
    );

    await Promise.resolve();
  });

  test("handles errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useFetchData("https://api.example.com/users")
    );

    await Promise.resolve();

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toBe(null);
  });
});
