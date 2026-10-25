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
  it("opens document automation directly in the document tab", () => {
    render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: /Document Automation/ }));
    expect(screen.getByRole("tab", { name: "Document Vault" })).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("dialog")).toHaveTextContent("Jordan Riley");
  });
  it("shares the $86,100 simulated settlement with the modal without clearing other gates", () => {
    render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Simulate final $0 settlement" }));
    expect(screen.getByText("Settlement cleared · other gates pending")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Trade-in & Settlement/ }));
    expect(screen.getByRole("tab", { name: "Financials" })).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("button", { name: "Sample settlement recorded" })).toBeDisabled();
    expect(screen.getByText("$0", { exact: true })).toBeInTheDocument();
  });
  it("reveals RACI gate owners on the five columns", () => {
    render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: "RACI Accountability Matrix Overlay" }));
    expect(screen.getByLabelText("Finance & Approvals RACI roles")).toHaveTextContent("Business Manager");
    expect(screen.getByLabelText("Ready for Delivery RACI roles")).toHaveTextContent("Handover Manager");
  });
});