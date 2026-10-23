import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { StageQuest, CountUp } from "@/components/gamified";
import bayImage from "@/assets/delivery-bay-night.jpg";

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
      <div className="relative isolate overflow-hidden">
        <img src={bayImage} alt="A dealership vehicle delivery bay at night lit in indigo and mint" width={1920} height={1088} className="band-img absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="bay-shade absolute inset-0 -z-10" />
        <div className="scan-sweep mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="hero-copy max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mint">How it works</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">From signed contract to keys, in five gated stages.</h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">Each department sees what it owns, works in parallel, and moves the deal on only when its gate is met. Scroll to drive a deal through.</p>
            <div className="mt-8 flex gap-8 font-mono">
              <div><div className="text-3xl font-semibold text-brand-mint"><CountUp to={5} /></div><div className="text-xs uppercase text-muted-foreground">Stages</div></div>
              <div><div className="text-3xl font-semibold text-brand-sky"><CountUp to={5} /></div><div className="text-xs uppercase text-muted-foreground">Gates</div></div>
              <div><div className="text-3xl font-semibold text-brand-violet"><CountUp to={1} /></div><div className="text-xs uppercase text-muted-foreground">Deal record</div></div>
            </div>
          </div>
        </div>
      </div>
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <StageQuest stages={stages} />
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
