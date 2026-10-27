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

  it("prices Core at $499, Full Pipeline at $1,490, Enterprise on request", () => {
    expect(pricingPlans.map((p) => p.price)).toEqual(["$499", "$1,490", null]);
  });

  it("offers the three recommended add-ons", () => {
    expect(pricingAddOns).toHaveLength(3);
  });
});
