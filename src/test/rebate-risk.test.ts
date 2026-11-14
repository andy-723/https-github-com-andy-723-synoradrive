import { describe, expect, it } from "vitest";
import { estimateRebateRisk, rooftopPresets } from "@/lib/rebate-risk";

describe("rebate risk model", () => {
  const m = estimateRebateRisk(rooftopPresets.medium.inputs);
  it("medium: A$43,200 campaign slippage a year", () => expect(m.campaignSlippagePerYear).toBe(43200));
  it("medium: A$42,000 cliff-edge per event", () => expect(m.cliffEdgePerEvent).toBe(42000));
  it("medium: about A$33,534 holdback erosion a year", () => expect(m.holdbackErosionPerYear).toBe(33534));
  it("small and large scale campaign slippage", () => {
    expect(estimateRebateRisk(rooftopPresets.small.inputs).campaignSlippagePerYear).toBe(21600);
    expect(estimateRebateRisk(rooftopPresets.large.inputs).campaignSlippagePerYear).toBe(86400);
  });
  it("large: A$84,000 cliff-edge per event", () => expect(estimateRebateRisk(rooftopPresets.large.inputs).cliffEdgePerEvent).toBe(84000));
  it("rejects negatives", () => expect(() => estimateRebateRisk({ ...rooftopPresets.small.inputs, unitsPerMonth: -1 })).toThrow());
});
