import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RebateRiskCalculator } from "@/components/rebate-risk";

afterEach(cleanup);

describe("rebate risk assumptions disclosure", () => {
  it("starts closed and opens the assumption formulas from the fine print", () => {
    render(<RebateRiskCalculator />);
    const toggle = screen.getByRole("button", { name: "View assumptions" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Assumptions used")).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Hide assumptions" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Assumptions used")).toBeInTheDocument();
    expect(screen.getByText("How each figure is calculated")).toBeInTheDocument();
  });

  it("shows the exact assumptions a financial controller needs", () => {
    render(<RebateRiskCalculator />);
    fireEvent.click(screen.getByRole("button", { name: "View assumptions" }));
    expect(screen.getByText("Avg wholesale invoice")).toBeInTheDocument();
    expect(screen.getByText("$50,000")).toBeInTheDocument();
    expect(screen.getByText("8.5% p.a.")).toBeInTheDocument();
    expect(screen.getByText("1% of rebate pool")).toBeInTheDocument();
    expect(screen.getByText("4 days")).toBeInTheDocument();
    expect(screen.getAllByText("$1,800", { selector: "dd" })).toHaveLength(2);
  });

  it("prints the formula behind the small-rooftop A$16,767 holdback erosion", () => {
    render(<RebateRiskCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /Small rooftop/ }));
    fireEvent.click(screen.getByRole("button", { name: "View assumptions" }));
    expect(screen.getByText(/360 deliveries\/yr × 4 days × \$11\.64 = \$16,767 \/ yr/)).toBeInTheDocument();
    expect(screen.getByText(/\$50,000 × 8\.5% ÷ 365 = \$11\.64 \/ car \/ day/)).toBeInTheDocument();
    expect(screen.getByText(/\$21,600 \+ \$16,767 \+ \$6,480 = \$44,847 \/ yr/)).toBeInTheDocument();
  });

  it("follows the rooftop size the visitor picks", () => {
    render(<RebateRiskCalculator />);
    fireEvent.click(screen.getByRole("button", { name: "View assumptions" }));
    expect(screen.getByText(/720 deliveries\/yr × 4 days × \$11\.64 = \$33,534 \/ yr/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Large rooftop/ }));
    expect(screen.getByText(/1440 deliveries\/yr × 4 days × \$11\.64 = \$67,068 \/ yr/)).toBeInTheDocument();
    expect(screen.queryByText(/720 deliveries\/yr/)).not.toBeInTheDocument();
  });

  it("wires the toggle to the panel it controls", () => {
    render(<RebateRiskCalculator />);
    const toggle = screen.getByRole("button", { name: "View assumptions" });
    fireEvent.click(toggle);
    const panel = document.getElementById(toggle.getAttribute("aria-controls") ?? "");
    expect(panel).not.toBeNull();
    expect(panel).toHaveTextContent("How each figure is calculated");
    fireEvent.click(screen.getByRole("button", { name: "Hide assumptions" }));
    expect(screen.queryByText("Assumptions used")).not.toBeInTheDocument();
  });
});
