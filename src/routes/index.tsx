import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductPreview } from "@/components/product-preview";
import { DemoReel } from "@/components/demo-reel";
import { SynoraCnsSection, DeliveryVisibilitySection } from "@/components/orchestration-sections";
import { ClosingCta } from "@/components/closing-cta";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import vehicleAsset from "@/assets/synoradrive-vehicle.jpeg.asset.json";
import yardImage from "@/assets/dealership-yard.jpg";
import {
  ArrowRight, ShieldCheck, Cloud, BadgeCheck, Workflow, Gauge, Users, KeyRound, Building2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SynoraDrive: Dealership contract-to-delivery platform" },
      { name: "description", content: "A working prototype for Australian dealerships: reads the contract-of-sale PDF and prepares the deal pack for staff to check. Gated workflow and month-book reporting planned." },
      { property: "og:title", content: "SynoraDrive: Dealership contract-to-delivery platform" },
      { property: "og:description", content: "A working prototype for Australian dealerships: reads the contract-of-sale PDF and prepares the deal pack for staff to check. Gated workflow and month-book reporting planned." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: vehicleAsset.url },
      { name: "twitter:image", content: vehicleAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WorksWith />
      <Positioning />
      <DemoReel />
      <SynoraCnsSection />
      <Pillars />
      <WorkflowTeaser />
      <DeliveryVisibilitySection />
      <ProductView />
      <ProofBand />
      <RoiTeaser />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="automotive-hero relative isolate overflow-hidden">
      <img src={vehicleAsset.url} alt="A vehicle outside a modern dealership at dusk" className="hero-vehicle absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" width={1356} height={768} />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="glow-orb glow-orb-indigo -z-10 left-[8%] top-[12%] size-72" />
      <div className="glow-orb glow-orb-mint -z-10 bottom-[18%] right-[6%] size-56" />
      <div className="mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="hero-copy max-w-2xl">
          <div className="mb-7 flex items-center gap-3 font-mono text-xs text-primary-glow"><span className="h-px w-8 bg-primary-glow" /> THE NEXT SHIFT IN AUTOMOTIVE OPERATIONS</div>
          <h1 className="text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">SynoraDrive<span className="mt-3 block text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">One deal record behind<br />every handover.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">SynoraDrive is a working prototype. It reads the contract-of-sale PDFs your staff already produce and prepares the deal pack for staff to check before it goes anywhere. Stage gates and departmental workflow are in development.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-brand"><Link to="/demo">Book a prototype demo <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-foreground/25 bg-background/30"><Link to="/platform">Explore the platform <ArrowRight /></Link></Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><Cloud className="size-4 text-primary-glow" /> Built to host its primary data in Microsoft Azure, Australia East</span>
            <span className="flex items-center gap-2"><KeyRound className="size-4 text-primary-glow" /> Staff password sign-in (multi-factor sign-in planned)</span>
            <span className="flex items-center gap-2"><Building2 className="size-4 text-primary-glow" /> Working prototype · pilot dealerships wanted, subject to contract</span>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/15 bg-background/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 font-mono text-[10px] text-muted-foreground sm:text-xs lg:px-8">
          <span className="flex items-center gap-2"><span className="indicator-light size-1.5 rounded-full bg-success" /> DESIGNED FOR THE DEALERSHIP FLOOR</span>
          <span>SIGNED CONTRACT → DEAL PACK → PLANNED: FIVE GATED STAGES → DELIVERY</span>
          <Link to="/how-it-works" className="flex items-center gap-2 text-foreground">SEE HOW A DEAL MOVES <ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function WorksWith() {
  const tools = ["Contract-of-sale PDFs from your DMS", "Victorian registration and transfer forms", "PPSR certificates (planned)", "Company extracts (planned)"];
  return (
    <section className="light-section border-y bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-logo-accent">Designed around the documents your dealership already produces</div>
      </div>
      <div className="marquee mt-4 pb-10 text-[11px] text-muted-foreground" aria-label="Documents SynoraDrive is designed around">
        <div className="marquee-track px-3">
          {[...tools, ...tools].map((name, i) => (
            <span key={`${name}-${i}`} aria-hidden={i >= tools.length} className="shrink-0 rounded-full border border-foreground/10 bg-background px-3 py-1.5">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section className="light-section mist-section bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">Your DMS runs the books.<br />SynoraDrive runs the deal.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">The weeks after the buyer signs can be one of the most paper-heavy parts of a car sale. Sales, stock control, the Business Manager, aftermarket, the workshop and the rego desk pass one car between them using folders, whiteboards and spreadsheets.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Upload a signed contract-of-sale PDF from your DMS. The SynoraDrive prototype prepares the deal pack for your staff to preview and check, then download or print. Compliance and finance gates and parallel departmental tasks are planned.</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
          {["Signed contract", "Deal pack prepared for staff to check", "Planned: five gated stages", "Planned: delivery tracking and month-book reporting"].map((step, i) => (
            <Reveal key={step} as="span" delay={i * 120} className="flex items-center gap-3">
              {i > 0 && <ArrowRight className="size-3.5 text-primary" />}
              <span className="rounded-full border bg-card px-3 py-1.5">{step}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    { Icon: ShieldCheck, t: "Compliance aids", b: "Planned: a deal-type checklist, deferred-sales-model date tracking for add-on insurance, and a pre-reported (RDA) vehicle watchlist. Designed to help staff see what is missing before handover. These are aids only. They do not guarantee compliance, OEM incentive payments or audit outcomes.", to: "/platform/compliance" },
    { Icon: Workflow, t: "Unified operations", b: "Planned: one deal card across five gated stages, with sales, stock, F&I, aftermarket, workshop, rego and delivery on the same board. Designed to reduce status-chasing calls.", to: "/platform/operations" },
    { Icon: Gauge, t: "Centralised reporting", b: "Planned: a month book designed to show locked deliveries, scheduled go-outs, the RDA watchlist and a weighted prospect pipeline in one view.", to: "/platform/reporting" },
    { Icon: Users, t: "A better customer experience", b: "Planned: a private, dealer-branded link for buyers to upload documents from their phone, and DocuSign e-signature (subject to agreement with DocuSign).", to: "/platform/customer-experience" },
  ] as const;
  return (
    <section className="light-section border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map(({ Icon, t, b, to }, i) => (
            <Reveal key={t} delay={i * 110}>
              <Link to={to} className="lift group flex h-full flex-col rounded-xl border bg-card p-7 hover:border-primary/40 hover:shadow-elegant">
                <div className="grid size-10 place-items-center rounded-lg bg-accent"><Icon className="size-5 text-accent-foreground" /></div>
                <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowTeaser() {
  const stages = ["In Queue", "Document Prep", "Finance & Approvals", "Workshop & PDI", "Ready for Delivery"];
  return (
    <section className="light-section mist-section border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">Five planned stages, each with a gate your team sets.</h2>
          <Link to="/how-it-works" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">See how a deal moves <ArrowRight className="size-4" /></Link>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {stages.map((s, i) => (
            <Reveal key={s} delay={i * 130} className="relative border-t border-primary/40 py-6 pr-4">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className={`indicator-light stage-light-${i} size-1.5 rounded-full bg-success`} /> 0{i + 1}
              </div>
              <h3 className="mt-3 text-base font-semibold">{s}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductView() {
  return (
    <section className="product-showcase-section border-t text-foreground" aria-labelledby="product-view-title">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="showcase-eyebrow font-mono text-[10px] sm:text-xs">ILLUSTRATIVE PRODUCT CONCEPT · FICTIONAL DEMO DATA</div>
          <h2 id="product-view-title" className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">Every car is a project.<br />Every stage has a RACI owner.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">An illustration of the planned board, using fictional demo data: a vehicle cycles from In-Queue to Delivery, and every department can see who is Responsible (R), who is Accountable (A) for the gate, and what is holding handover back.</p>
        </Reveal>
        <ProductPreview />
      </div>
    </section>
  );
}

function ProofBand() {
  return (
    <section className="band relative isolate overflow-hidden border-t">
      <img src={yardImage} alt="A dealership car yard at dusk, rows of vehicles under string lights" loading="lazy" width={1536} height={1024} className="band-img absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="yard-shade absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary-glow">Where we are</div>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">Where we are.</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">SynoraDrive is a working prototype. It is not yet in production with any dealership. We are looking for pilot dealerships, subject to contract.</p>
        </Reveal>
      </div>
    </section>
  );
}

function RoiTeaser() {
  return (
    <section className="light-section mist-section border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">What does a manual deal folder cost your rooftop?</h2>
            <p className="mt-4 text-muted-foreground">Illustrative example: at 60 deliveries a month, if each deal pack took 45 minutes less to prepare, that would free up 45 staff hours a month.</p>
            <p className="mt-2 text-xs text-muted-foreground">This is arithmetic on assumed inputs, not a measured result. SynoraDrive has not yet been measured in production, and actual results will vary.</p>
          </div>
          <Link to="/pricing" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Estimate your rooftop <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
