import { useId, useMemo, useState } from "react";
import { estimateRebateRisk, rooftopPresets, type RebateRiskInputs, type RooftopSize } from "@/lib/rebate-risk";

const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
const money2 = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const sizes: RooftopSize[] = ["small", "medium", "large"];

const fields: { key: keyof RebateRiskInputs; label: string }[] = [
  { key: "unitsPerMonth", label: "New deliveries / month" },
  { key: "slippedUnitsPerMonth", label: "Cars missing month-end cutoff" },
  { key: "avgRebateAud", label: "Avg campaign rebate (A$)" },
  { key: "tier1BonusAud", label: "Tier 1 bonus / unit (A$)" },
  { key: "tier2BonusAud", label: "Tier 2 bonus / unit (A$)" },
  { key: "daysDelayed", label: "Days stuck in bottleneck" },
  { key: "wholesaleValueAud", label: "Avg wholesale value (A$)" },
  { key: "bailmentRatePct", label: "Bailment rate (% p.a.)" },
  { key: "clawbackPct", label: "Audit clawback (% of pool)" },
];

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.2v3.4" />
      <path d="M8 4.9h.01" />
    </svg>
  );
}

export function RebateRiskCalculator({ editable = false }: { editable?: boolean }) {
  const [size, setSize] = useState<RooftopSize>("medium");
  const [inputs, setInputs] = useState<RebateRiskInputs>(rooftopPresets.medium.inputs);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const assumptionsId = useId();
  const r = useMemo(() => estimateRebateRisk(inputs), [inputs]);

  const pick = (s: RooftopSize) => { setSize(s); setInputs(rooftopPresets[s].inputs); };

  const levers = [
    { t: "Expiring campaign slippage", v: r.campaignSlippagePerYear, s: "per year", o: "General Sales Manager" },
    { t: "Floorplan & holdback erosion", v: r.holdbackErosionPerYear, s: "per year", o: "CFO / Financial Controller" },
    { t: "Audit clawbacks", v: r.auditClawbackPerYear, s: "per year", o: "Dealership Admin / CFO" },
  ];

  const deliveriesPerYear = inputs.unitsPerMonth * 12;

  const assumptions = [
    { t: "New deliveries", v: `${inputs.unitsPerMonth} / month` },
    { t: "Cars missing month-end cutoff", v: `${inputs.slippedUnitsPerMonth} / month` },
    { t: "Avg campaign rebate", v: money.format(inputs.avgRebateAud) },
    { t: "Tier 1 bonus / unit", v: money.format(inputs.tier1BonusAud) },
    { t: "Tier 2 bonus / unit", v: money.format(inputs.tier2BonusAud) },
    { t: "Days stuck in bottleneck", v: `${inputs.daysDelayed} days` },
    { t: "Avg wholesale invoice", v: money.format(inputs.wholesaleValueAud) },
    { t: "Bailment rate", v: `${inputs.bailmentRatePct}% p.a.` },
    { t: "Audit clawback", v: `${inputs.clawbackPct}% of rebate pool` },
  ];

  const formulas = [
    {
      t: "Expiring campaign slippage",
      f: `${inputs.slippedUnitsPerMonth} cars/mo × ${money.format(inputs.avgRebateAud)} × 12 = ${money.format(r.campaignSlippagePerYear)} / yr`,
    },
    {
      t: "Bailment interest per car per day",
      f: `${money.format(inputs.wholesaleValueAud)} × ${inputs.bailmentRatePct}% ÷ 365 = ${money2.format(r.interestPerCarPerDay)} / car / day`,
    },
    {
      t: "Floorplan & holdback erosion",
      f: `${inputs.unitsPerMonth}/mo × 12 = ${deliveriesPerYear} deliveries/yr × ${inputs.daysDelayed} days × ${money2.format(r.interestPerCarPerDay)} = ${money.format(r.holdbackErosionPerYear)} / yr`,
    },
    {
      t: "Audit clawbacks",
      f: `${deliveriesPerYear} deliveries/yr × ${money.format(inputs.tier1BonusAud)} × ${inputs.clawbackPct}% = ${money.format(r.auditClawbackPerYear)} / yr`,
    },
    {
      t: "1-car-short cliff edge (per event)",
      f: `${inputs.unitsPerMonth} units × (${money.format(inputs.tier1BonusAud)} − ${money.format(inputs.tier2BonusAud)}) = ${money.format(r.cliffEdgePerEvent)} / event`,
    },
    {
      t: "Illustrative annual exposure",
      f: `${money.format(r.campaignSlippagePerYear)} + ${money.format(r.holdbackErosionPerYear)} + ${money.format(r.auditClawbackPerYear)} = ${money.format(r.annualTotal)} / yr`,
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-6 text-card-foreground md:p-8">
      <div role="group" aria-label="Rooftop size" className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button key={s} type="button" aria-pressed={size === s} onClick={() => pick(s)}
            className={`min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors ${size === s ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}>
            {rooftopPresets[s].label} · {rooftopPresets[s].inputs.unitsPerMonth}/mo
          </button>
        ))}
      </div>

      {editable && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={`rr-${f.key}`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</label>
              <input id={`rr-${f.key}`} type="number" min={0} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                value={inputs[f.key]} onChange={(e) => setInputs({ ...inputs, [f.key]: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-xl bg-accent/40 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Illustrative annual exposure</div>
          <div className="mt-2 font-display text-5xl font-semibold text-primary">{money.format(r.annualTotal)}</div>
          <div className="mt-6 space-y-4">
            {levers.map((l) => (
              <div key={l.t} className="flex items-baseline justify-between gap-4 border-t pt-3">
                <div>
                  <div className="text-sm font-semibold">{l.t}</div>
                  <div className="text-xs text-muted-foreground">{l.o}</div>
                </div>
                <div className="text-right font-mono text-sm font-semibold">{money.format(l.v)} <span className="text-xs text-muted-foreground">{l.s}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-primary/40 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">The 1-car-short cliff edge</div>
          <div className="mt-2 font-display text-4xl font-semibold">{money.format(r.cliffEdgePerEvent)}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Lost in a single night when one sold car — waiting on an RWC, reclean or trade-in payout — misses the month-end cutoff and drops all {inputs.unitsPerMonth} units from Tier 1 to Tier 2.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Each day a sold car sits unsettled costs about {money2.format(r.interestPerCarPerDay)} in bailment interest, eaten from holdback.
          </p>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Illustrative risk model only, based on the assumptions shown, not your dealership's results. OEM rebates, tiers and audits are governed by each manufacturer's agreement. Cliff-edge exposure is per event and not included in the annual total.
      </p>

      <div className="mt-2">
        <button type="button" aria-expanded={showAssumptions} aria-controls={assumptionsId}
          onClick={() => setShowAssumptions((v) => !v)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 text-xs font-semibold text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground">
          <InfoIcon />
          {showAssumptions ? "Hide assumptions" : "View assumptions"}
        </button>

        {showAssumptions && (
          <div id={assumptionsId} className="mt-1 rounded-xl border bg-background/60 p-4 md:p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assumptions used</div>
            <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {assumptions.map((a) => (
                <div key={a.t} className="flex items-baseline justify-between gap-3 border-b border-dashed pb-1.5">
                  <dt className="text-xs text-muted-foreground">{a.t}</dt>
                  <dd className="text-xs font-semibold">{a.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">How each figure is calculated</div>
            <ul className="mt-3 space-y-2">
              {formulas.map((f) => (
                <li key={f.t} className="text-xs leading-relaxed">
                  <span className="font-semibold">{f.t}: </span>
                  <span className="font-mono text-muted-foreground">{f.f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Yearly figures are rounded to whole dollars. Bailment interest per car per day is shown to the cent because it compounds across every unsettled vehicle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
