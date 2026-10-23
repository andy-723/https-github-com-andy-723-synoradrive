import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ProductPreview } from "@/components/product-preview";

afterEach(cleanup);
describe("interactive fictional deal cards", () => {
  it("opens the clicked customer and reveals the trade-in and simulated settlement", () => {
    render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: /DEMO-001 Alex Morgan/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "View trade-in" }));
    expect(screen.getByText("2018 Volkswagen Golf 110TSI")).toBeInTheDocument();
    expect(screen.getByText("$86,100")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Simulate final settlement" }));
    expect(screen.getByText("$0", { exact: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sample settlement recorded" })).toBeDisabled();
  });
  it("keeps an already delivery-ready deal settled", () => {
    render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: /DEMO-007 Example Studio/ }));
    expect(screen.getByRole("button", { name: "Sample settlement recorded" })).toBeDisabled();
    expect(screen.getByText("$0", { exact: true })).toBeInTheDocument();
  });
});