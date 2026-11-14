/**
 * Executive delivery-bottleneck risk model (illustrative). Four levers:
 * expiring campaign slippage, target cliff-edge, floorplan/holdback erosion,
 * audit clawbacks. Defaults come from the Executive ROI Model brief.
 */
export type RooftopSize = "small" | "medium" | "large";

export interface RebateRiskInputs {
  unitsPerMonth: number;
  slippedUnitsPerMonth: number;
  avgRebateAud: number;
  tier1BonusAud: number;
  tier2BonusAud: number;
  wholesaleValueAud: number;
  bailmentRatePct: number;
  daysDelayed: number;
  clawbackPct: number;
}

const base = {
  avgRebateAud: 1800,
  tier1BonusAud: 1800,
  tier2BonusAud: 1100,
  wholesaleValueAud: 50000,
  bailmentRatePct: 8.5,
  daysDelayed: 4,
  clawbackPct: 1,
};

export const rooftopPresets: Record<RooftopSize, { label: string; inputs: RebateRiskInputs }> = {
  small: { label: "Small rooftop", inputs: { ...base, unitsPerMonth: 30, slippedUnitsPerMonth: 1 } },
  medium: { label: "Medium rooftop", inputs: { ...base, unitsPerMonth: 60, slippedUnitsPerMonth: 2 } },
  large: { label: "Large rooftop", inputs: { ...base, unitsPerMonth: 120, slippedUnitsPerMonth: 4 } },
};

export interface RebateRiskResult {
  campaignSlippagePerYear: number;
  cliffEdgePerEvent: number;
  holdbackErosionPerYear: number;
  interestPerCarPerDay: number;
  auditClawbackPerYear: number;
  annualTotal: number;
}

export function estimateRebateRisk(i: RebateRiskInputs): RebateRiskResult {
  for (const [k, v] of Object.entries(i)) {
    if (!Number.isFinite(v) || v < 0) throw new Error(`${k} must be a non-negative number`);
  }
  const campaignSlippagePerYear = i.slippedUnitsPerMonth * i.avgRebateAud * 12;
  const cliffEdgePerEvent = i.unitsPerMonth * Math.max(0, i.tier1BonusAud - i.tier2BonusAud);
  const interestPerCarPerDay = (i.wholesaleValueAud * (i.bailmentRatePct / 100)) / 365;
  const holdbackErosionPerYear = Math.round(i.unitsPerMonth * 12 * i.daysDelayed * interestPerCarPerDay);
  const auditClawbackPerYear = Math.round(i.unitsPerMonth * 12 * i.tier1BonusAud * (i.clawbackPct / 100));
  return {
    campaignSlippagePerYear,
    cliffEdgePerEvent,
    holdbackErosionPerYear,
    interestPerCarPerDay,
    auditClawbackPerYear,
    annualTotal: campaignSlippagePerYear + holdbackErosionPerYear + auditClawbackPerYear,
  };
}
