import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How a deal moves, SynoraDrive" },
      { name: "description", content: "From signed contract to keys in five gated stages. See what each department does and what clears each gate." },
      { property: "og:title", content: "How a deal moves, SynoraDrive" },
      { property: "og:description", content: "From signed contract to keys in five gated stages. See what each department does and what clears each gate." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/how-it-works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const stages = [
  {
    n: 1,
    name: "In Queue",
    who: "Sales admin, stock control",
    what: "The Contract of Sale arrives by upload or the shared mailbox and becomes a deal card. SyncZero reads buyer, vehicle and trade-in details.",
    gate: "Signed order on file and an estimated delivery date set.",
  },
  {
    n: 2,
    name: "Document Prep",
    who: "Sales consultant, sales admin, customer",
    what: "The checklist for the deal type is set, forms are filled and the pack is generated. The customer gets a portal link to upload their documents and sign.",
    gate: "Deal pack generated and signed order on file.",
  },
  {
    n: 3,
    name: "Finance & Approvals",
    who: "Business Manager, Sales Manager",
    what: "Deposit, finance path and Business Manager checks. The ASIC four-clear-day blackout is tracked. Stalled external finance is escalated.",
    gate: "Finance path cleared.",
  },
  {
    n: 4,
    name: "Workshop & PDI",
    who: "Workshop, PDI, aftermarket, rego",
    what: "Workshop checklist, aftermarket fitment orders and pre-delivery inspection run in parallel with registration or transfer preparation.",
    gate: "Workshop and PDI checklist tasks complete.",
  },
  {
    n: 5,
    name: "Ready for Delivery",
    who: "Sales consultant, delivery, rego",
    what: "Pre-delivery pack finalised, customer handover booked, VicRoads lodgement handled by the rego team.",
    gate: "Contract signed, Authority to Register (new or demo) or transfer (used) signed, PDI complete. Delivery is then confirmed in the system.",
  },
] as const;

function HowItWorksPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="How it works"
          title="From signed contract to keys, in five gated stages."
          intro="Each department sees what it owns, works in parallel, and moves the deal on only when its gate is met."
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="space-y-6">
            {stages.map((s) => (
              <div key={s.n} className="grid gap-6 rounded-xl border bg-card p-7 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-10">
                <div className="flex items-start gap-3">
                  <span className={`indicator-light stage-light-${s.n - 1} mt-1.5 size-2 rounded-full bg-success`} />
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">STAGE 0{s.n}</div>
                    <h2 className="mt-1 text-lg font-semibold">{s.name}</h2>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Who works it</div>
                  <p className="mt-1.5 text-sm">{s.who}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What happens</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.what}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gate to move on</div>
                  <p className="mt-1.5 text-sm font-medium text-primary">{s.gate}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-xl border bg-accent/40 p-8">
            <h2 className="text-xl font-semibold">What runs in parallel</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The moment a contract is signed, stock, F&I, aftermarket and the workshop get their tasks at the same time. Nobody waits for a folder to reach their desk.
            </p>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
