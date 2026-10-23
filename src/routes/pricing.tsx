import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero, SectionHead } from "@/components/marketing";
import { pricingPlans } from "@/lib/dealership-pricing";
import { estimateRoi, roiDefaults } from "@/lib/roi-estimator";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing, SynoraDrive" },
      { name: "description", content: "Simple monthly pricing per rooftop, a 90-day pilot, and onboarding on your floor. Estimate your time saved." },
      { property: "og:title", content: "Pricing, SynoraDrive" },
      { property: "og:description", content: "Simple monthly pricing per rooftop, a 90-day pilot, and onboarding on your floor. Estimate your time saved." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const faqs = [
  {
    q: "Do we have to replace our DMS?",
    a: "No. SynoraDrive sits after your DMS. Your team keeps producing the Contract of Sale in Pentana eraPower, then uploads or emails it to SynoraDrive, which runs the post-contract paperwork, workflow and delivery.",
  },
  {
    q: "Will our staff actually use it?",
    a: "It was built on a working dealership floor to remove data entry. Consultants don't re-type contract details, and each department gets deal-specific notifications instead of hunting through spreadsheets.",
  },
  {
    q: "How does document retention affect OEM or tax audits?",
    a: "DocuSign keeps the signed record, and completed packs can be downloaded to your own records for as long as you need them. SynoraDrive keeps its own copies only for a short period to reduce privacy risk.",
  },
  {
    q: "Do we pay per user?",
    a: "No. Every rooftop subscription includes all your staff.",
  },
  {
    q: "Which states' registration forms are supported?",
    a: "Victoria (VicRoads) registration and transfer forms are built and running today. NSW and QLD are next on the roadmap.",
  },
  {
    q: "Do we need our own DocuSign account?",
    a: "We'll confirm the DocuSign licensing arrangement for your dealership as part of your pricing conversation.",
  },
] as const;

const onboarding = [
  ["Packs and branding", "We load your branding, set up your rooftop's dealer and OEM forms, and map your DMS contract."],
  ["On-floor training", "We train sales admin, Business Managers, consultants and workshop leads on your floor, using real deals."],
  ["90-day pilot, then rollout", "Prove the time saved and audit readiness on one rooftop, then roll out across your group."],
] as const;

function RoiEstimator() {
  const [deals, setDeals] = useState<number>(roiDefaults.dealsPerMonth);
  const [minutes, setMinutes] = useState<number>(roiDefaults.minutesPerDeal);
  const [rate, setRate] = useState<number>(roiDefaults.hourlyCostAud);
  const [fpDays, setFpDays] = useState("");
  const [fpCost, setFpCost] = useState("");

  const result = useMemo(() => {
    const days = fpDays === "" ? undefined : Number(fpDays);
    const cost = fpCost === "" ? undefined : Number(fpCost);
    return estimateRoi({
      dealsPerMonth: deals,
      minutesPerDeal: minutes,
      hourlyCostAud: rate,
      ...(days != null && cost != null ? { floorplanDaysSaved: days, floorplanCostPerDayAud: cost } : {}),
    });
  }, [deals, minutes, rate, fpDays, fpCost]);

  const fmt = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 });
  const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

  const field = "w-full rounded-lg border bg-background px-3 py-2 text-sm";
  const label = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div className="grid gap-10 rounded-2xl border bg-card p-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className={label} htmlFor="roi-deals">Deliveries per month</label>
          <input id="roi-deals" type="number" min={0} className={field} value={deals} onChange={(e) => setDeals(Number(e.target.value))} />
        </div>
        <div>
          <label className={label} htmlFor="roi-minutes">Minutes preparing and chasing each deal pack</label>
          <input id="roi-minutes" type="number" min={0} className={field} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
        </div>
        <div>
          <label className={label} htmlFor="roi-rate">Staff cost per hour (A$)</label>
          <input id="roi-rate" type="number" min={0} className={field} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="roi-fpdays">Floorplan days saved per car (optional)</label>
            <input id="roi-fpdays" type="number" min={0} className={field} value={fpDays} onChange={(e) => setFpDays(e.target.value)} placeholder="—" />
          </div>
          <div>
            <label className={label} htmlFor="roi-fpcost">Holding cost per day (A$, optional)</label>
            <input id="roi-fpcost" type="number" min={0} className={field} value={fpCost} onChange={(e) => setFpCost(e.target.value)} placeholder="—" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6 rounded-xl bg-accent/40 p-8">
        <div>
          <div className="font-display text-4xl font-semibold text-primary">{fmt.format(result.staffHoursPerYear)} hrs</div>
          <div className="mt-1 text-sm text-muted-foreground">staff hours returned to the floor per year</div>
        </div>
        <div>
          <div className="font-display text-4xl font-semibold text-primary">{money.format(result.staffCostSavedPerYearAud)}</div>
          <div className="mt-1 text-sm text-muted-foreground">estimated staff cost saved per year</div>
        </div>
        {result.floorplanSavedPerYearAud != null && (
          <div>
            <div className="font-display text-4xl font-semibold text-primary">{money.format(result.floorplanSavedPerYearAud)}</div>
            <div className="mt-1 text-sm text-muted-foreground">estimated floorplan saving per year</div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Estimates only, based on your inputs. Actual results depend on volume, deal mix and workflow.</p>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="Pricing"
          title="Flat per-rooftop pricing. No legacy-vendor bloat."
          intro="One predictable monthly subscription per rooftop, with unlimited staff logins and no per-seat fees."
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((t) => (
              <div key={t.n} className={`relative rounded-lg border p-8 ${t.hi ? "border-primary/60 bg-card shadow-elegant" : "bg-background"}`}>
                {t.tag && (
                  <span className={`absolute -top-3 left-8 rounded-full px-3 py-0.5 text-xs font-semibold ${t.hi ? "bg-brand text-primary-foreground" : "border bg-background text-muted-foreground"}`}>
                    {t.tag}
                  </span>
                )}
                <div className="text-sm text-muted-foreground">{t.s}</div>
                <h2 className="mt-1 text-xl font-semibold">{t.n}</h2>
                <div className="mt-6 font-display text-2xl font-semibold">Prices on request</div>
                <ul className="mt-8 space-y-3 text-sm">
                  {t.f.map((f) => (
                    <li key={f} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />{f}</li>
                  ))}
                </ul>
                <Link to="/demo" className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold transition ${t.hi ? "bg-brand text-primary-foreground" : "border hover:bg-secondary"}`}>
                  Talk to us about pricing
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <SectionHead eyebrow="Estimate your rooftop" title="See what manual deal folders cost your rooftop." />
            <div className="mt-12">
              <RoiEstimator />
            </div>
          </div>

          <div className="mt-24">
            <SectionHead eyebrow="Onboarding" title="Onboarding in weeks, not months." body="A fixed one-off onboarding fee per rooftop, not a six-figure implementation project." />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {onboarding.map(([t, b], i) => (
                <div key={t} className="rounded-xl border bg-card p-7">
                  <div className="font-mono text-xs text-primary">STEP 0{i + 1}</div>
                  <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <SectionHead eyebrow="Dealer FAQ" title="Questions dealers ask us." />
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border bg-card p-6">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-3">
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              Talk to us about pricing <ArrowRight className="size-4" />
            </Link>
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent">
              Book a rooftop demo
            </Link>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
