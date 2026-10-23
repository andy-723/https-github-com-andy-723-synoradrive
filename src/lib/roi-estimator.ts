/**
 * ROI estimator for the Pricing page. Defaults are the business plan's
 * estimates (60 deals a month, 45 minutes a deal, A$45 an hour) — always
 * labelled as estimates in the UI until pilot numbers are in.
 */
export const roiDefaults = {
  dealsPerMonth: 60,
  minutesPerDeal: 45,
  hourlyCostAud: 45,
} as const;

export interface RoiInputs {
  dealsPerMonth: number;
  minutesPerDeal: number;
  hourlyCostAud: number;
  /** Optional floorplan inputs — saving is only reported when BOTH are set. */
  floorplanDaysSaved?: number;
  floorplanCostPerDayAud?: number;
}

export interface RoiResult {
  staffHoursPerYear: number;
  staffCostSavedPerYearAud: number;
  floorplanSavedPerYearAud: number | null;
}

function assertNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${name} must be a non-negative number`);
  }
}

export function estimateRoi(inputs: RoiInputs): RoiResult {
  const { dealsPerMonth, minutesPerDeal, hourlyCostAud, floorplanDaysSaved, floorplanCostPerDayAud } = inputs;
  assertNonNegative("dealsPerMonth", dealsPerMonth);
  assertNonNegative("minutesPerDeal", minutesPerDeal);
  assertNonNegative("hourlyCostAud", hourlyCostAud);

  const staffHoursPerYear = (dealsPerMonth * minutesPerDeal * 12) / 60;
  const staffCostSavedPerYearAud = staffHoursPerYear * hourlyCostAud;

  let floorplanSavedPerYearAud: number | null = null;
  if (floorplanDaysSaved != null && floorplanCostPerDayAud != null) {
    assertNonNegative("floorplanDaysSaved", floorplanDaysSaved);
    assertNonNegative("floorplanCostPerDayAud", floorplanCostPerDayAud);
    floorplanSavedPerYearAud = dealsPerMonth * 12 * floorplanDaysSaved * floorplanCostPerDayAud;
  }

  return { staffHoursPerYear, staffCostSavedPerYearAud, floorplanSavedPerYearAud };
}
