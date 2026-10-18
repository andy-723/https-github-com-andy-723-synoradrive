import { describe, expect, it } from "vitest";
import { monthlyGroupPrice } from "@/lib/dealership-pricing";

describe("Per-rooftop monthly pricing", () => {
  it("charges one Core rooftop $1,490 AUD", () => expect(monthlyGroupPrice(1)).toBe(1490));
  it("includes two rooftops at $1,190 each", () => expect(monthlyGroupPrice(2)).toBe(2380));
  it("bills every rooftop through the nine-location group boundary", () => expect(monthlyGroupPrice(9)).toBe(10710));
  it("requires a custom volume agreement from ten rooftops", () => expect(monthlyGroupPrice(10)).toBeNull());
});