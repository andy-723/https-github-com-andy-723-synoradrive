import { describe, expect, it } from "vitest";
import { pricingPlans } from "@/lib/dealership-pricing";

describe("Pricing plans (Website Copy v4: prices on request)", () => {
  it("offers the three v4 plans", () => {
    expect(pricingPlans.map((p) => p.n)).toEqual(["Document & Compliance", "Pipeline", "Insights & Forecasting"]);
  });

  it("marks Pipeline as the single most-popular plan", () => {
    expect(pricingPlans.filter((p) => p.hi).map((p) => p.n)).toEqual(["Pipeline"]);
  });

  it("publishes no dollar figures until commercially set", () => {
    for (const plan of pricingPlans) {
      expect(JSON.stringify(plan)).not.toMatch(/\$\d/);
    }
  });

  it("labels Insights & Forecasting as a roadmap add-on, not a shipped plan", () => {
    expect(pricingPlans.find((p) => p.n === "Insights & Forecasting")?.tag).toBe("Roadmap add-on");
  });
});
