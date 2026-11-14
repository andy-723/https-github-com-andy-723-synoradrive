import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero, SectionHead } from "@/components/marketing";
import { pricingAddOns, pricingNote, pricingPlans } from "@/lib/dealership-pricing";
import { estimateRoi, roiDefaults } from "@/lib/roi-estimator";
import { RebateRiskCalculator } from "@/components/rebate-risk";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing, SynoraDrive" },
      { name: "description", content: "Per-rooftop SynoraDrive subscription tiers with unlimited staff logins, recommended add-ons and an interactive ROI estimator." },
      { property: "og:title", content: "Pricing, SynoraDrive" },
      { property: "og:description", content: "Per-rooftop SynoraDrive subscription tiers with unlimited staff logins, recommended add-ons and an interactive ROI estimator." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/pricing` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/pricing` }],
  }),
  component: PricingPage,
});

const faqs = [
  {
    q: "Do we have to replace our DMS?",
    a: "No. Your team keeps producing the contract of sale in your DMS, then uploads the PDF to SynoraDrive, or it arrives via Microsoft Graph mailbox intake configured for your group. SynoraDrive extracts the deal data, prepares the deal pack for staff to check and runs the car across the 5-stage Dealership Board.",
  },
  {
    q: "Will our staff actually use it?",
    a: "It is designed to reduce data entry. SynoraDrive reads the contract details so staff check them rather than re-type them. Departments are notified on the deal itself, so nobody has to chase.",
  },
  {
    q: "How does document retention affect OEM or tax audits?",
    a: "Your dealership should download completed packs and keep them in its own records for as long as the law and your OEM agreements require. SynoraDrive is not an archive. Our retention period is generally 30 days. With the DocuSign add-on, signed documents are held in your dealership's own DocuSign account.",
  },
  {
    q: "Do we pay per user?",
    a: "No. Every rooftop subscription includes unlimited staff logins.",
  },
  {
    q: "Which states' registration forms are supported?",
    a: "SynoraDrive prepares Victorian and NSW registration and transfer forms. Other states are configured during onboarding.",
  },
  {
    q: "Do we need our own DocuSign account?",
    a: "Yes. The Customer Experience & DocuSign add-on connects to your dealership’s own DocuSign licence.",
  },
] as const;

const onboarding = [
  ["Packs and branding", "We load your branding, set up your rooftop's dealer and OEM forms, and map your DMS contract."],
  ["On-floor training", "We train sales admin, Business Managers, consultants and workshop leads on your floor, using sample or de-identified deals. Live deals are used only once a signed pilot agreement covering data handling is in place."],
  ["Pilot, then rollout", "Pilots open from 30 November 2026, under a signed Pilot Order Form. A pilot is designed to measure time saved on one rooftop before any wider rollout."],
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
          <label className={label} htmlFor="roi-minutes">Minutes you expect to save per deal pack (your estimate)</label>
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
          <div className="mt-1 text-sm text-muted-foreground">illustrative staff hours per year</div>
        </div>
        <div>
          <div className="font-display text-4xl font-semibold text-primary">{money.format(result.staffCostSavedPerYearAud)}</div>
          <div className="mt-1 text-sm text-muted-foreground">illustrative staff cost per year</div>
        </div>
        {result.floorplanSavedPerYearAud != null && (
          <div>
            <div className="font-display text-4xl font-semibold text-primary">{money.format(result.floorplanSavedPerYearAud)}</div>
            <div className="mt-1 text-sm text-muted-foreground">illustrative floorplan cost per year</div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Illustrative estimate only. Hours = deliveries per month × minutes saved per deal ÷ 60 × 12. Cost = hours × staff cost per hour. Illustrative calculation based on your custom inputs and workflow assumptions; actual time savings are measured during your rooftop pilot.</p>
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
          title="Simple per-rooftop pricing."
          intro="A monthly subscription per rooftop, with unlimited staff logins. No seat limits."
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
                <div className="mt-6 font-display text-2xl font-semibold">{t.price ? <>{t.price}<span className="text-sm font-normal text-muted-foreground"> /rooftop/month excl. GST</span></> : "Prices on request"}</div>
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
          <p className="mt-6 text-center text-xs text-muted-foreground">{pricingNote}</p>

          <div className="mt-20">
            <SectionHead eyebrow="Upgrades" title="Recommended rooftop add-ons." />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pricingAddOns.map((a) => (
                <div key={a.n} className="rounded-xl border bg-card p-7">
                  <h3 className="text-lg font-semibold">{a.n}</h3>
                  {"roadmap" in a && a.roadmap && <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">Enhanced CX emails · On the roadmap</p>}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <SectionHead eyebrow="Estimate your rooftop" title="An illustrative time estimate for your rooftop." />
            <div className="mt-12">
              <RoiEstimator />
            </div>
          </div>

          <div className="mt-24">
            <SectionHead eyebrow="Missed OEM rebates" title="What delivery bottlenecks could cost your rooftop." />
            <div className="mt-12">
              <RebateRiskCalculator editable />
            </div>
          </div>

          <div className="mt-24">
            <SectionHead eyebrow="Onboarding" title="Onboarding, configured per rooftop." body="Onboarding time depends on your forms and DMS. An onboarding fee may apply, confirmed in writing before any pilot." />
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
              Book a rooftop walkthrough
            </Link>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
