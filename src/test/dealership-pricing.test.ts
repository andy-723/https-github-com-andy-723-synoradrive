import { describe, expect, it } from "vitest";
import { pricingAddOns, pricingPlans } from "@/lib/dealership-pricing";

describe("Pricing plans", () => {
  it("offers the three rooftop tiers", () => {
    expect(pricingPlans.map((p) => p.n)).toEqual(["Document & Compliance Core", "Full Pipeline & DealBoard", "Multi-Rooftop Enterprise Group"]);
  });

  it("shows no 'Most popular' badge", () => {
    expect(pricingPlans.some((p) => p.tag === "Most popular")).toBe(false);
  });

  it("includes unlimited staff logins on every tier", () => {
    for (const plan of pricingPlans) expect(plan.f).toContain("Unlimited staff logins per rooftop");
  });

  it("never names a DMS vendor", () => {
    expect(JSON.stringify([pricingPlans, pricingAddOns])).not.toMatch(/pentana|erapower/i);
  });

  it("publishes no dollar figures until commercially set", () => {
    expect(JSON.stringify([pricingPlans, pricingAddOns])).not.toMatch(/\$\d/);
  });

  it("offers the three recommended add-ons", () => {
    expect(pricingAddOns).toHaveLength(3);
  });
});
