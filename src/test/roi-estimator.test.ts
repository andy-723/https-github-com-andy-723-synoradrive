import { describe, expect, it } from "vitest";
import { estimateRoi, roiDefaults } from "@/lib/roi-estimator";

describe("ROI estimator (business plan defaults: 60 deals, 45 min, A$45/hr)", () => {
  it("returns 540 staff hours a year at the plan defaults", () => {
    expect(estimateRoi({ ...roiDefaults }).staffHoursPerYear).toBe(540);
  });

  it("returns A$24,300 staff cost saved a year at the plan defaults", () => {
    expect(estimateRoi({ ...roiDefaults }).staffCostSavedPerYearAud).toBe(24300);
  });

  it("reports no floorplan saving unless both floorplan inputs are given", () => {
    expect(estimateRoi({ ...roiDefaults }).floorplanSavedPerYearAud).toBeNull();
    expect(estimateRoi({ ...roiDefaults, floorplanDaysSaved: 2 }).floorplanSavedPerYearAud).toBeNull();
  });

  it("computes floorplan saving when days saved and daily cost are both set", () => {
    const r = estimateRoi({ ...roiDefaults, floorplanDaysSaved: 2, floorplanCostPerDayAud: 13 });
    expect(r.floorplanSavedPerYearAud).toBe(60 * 12 * 2 * 13);
  });

  it("rejects negative inputs", () => {
    expect(() => estimateRoi({ dealsPerMonth: -1, minutesPerDeal: 45, hourlyCostAud: 45 })).toThrow();
  });
});
