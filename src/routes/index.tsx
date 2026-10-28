import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductPreview } from "@/components/product-preview";
import { DemoReel } from "@/components/demo-reel";
import { SynoraCnsSection, DeliveryVisibilitySection } from "@/components/orchestration-sections";
import { ClosingCta } from "@/components/closing-cta";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import heroVehicle from "@/assets/hero-vehicle-1600.webp.asset.json";
import heroVehicleMobile from "@/assets/hero-vehicle-800.webp.asset.json";
import yardImage from "@/assets/dealership-yard-1600.webp";
import yardImageMobile from "@/assets/dealership-yard-800.webp";
import { SITE_URL } from "@/lib/site";
import {
  ArrowRight, ShieldCheck, Cloud, BadgeCheck, Workflow, Gauge, KeyRound, Building2,
} from "lucide-react";

const PAGE_DESCRIPTION =
  "SynoraDrive turns an Australian dealership's signed contract-of-sale PDF into a checked deal pack, then runs five gated stages through to handover.";

const SOCIAL_IMAGE = `${SITE_URL}${heroVehicle.url}`;

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "SynoraDrive",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE_URL}/`,
      description: PAGE_DESCRIPTION,
      offers: [
        {
          "@type": "Offer",
          name: "Document & Compliance Core",
          price: "499",
          priceCurrency: "AUD",
          url: `${SITE_URL}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Full Pipeline & DealBoard",
          price: "1490",
          priceCurrency: "AUD",
          url: `${SITE_URL}/pricing`,
        },
      ],
    },
    {
      "@type": "Organization",
      name: "SYNORA TECH",
      legalName: "Andrew Phan trading as SYNORA TECH",
      identifier: "42 234 662 138",
      url: `${SITE_URL}/`,
      email: "andrew@synoratech.ai",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite 1208/530 Little Collins Street",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        postalCode: "3000",
        addressCountry: "AU",
      },
    },
  ],
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SynoraDrive: Dealership contract-to-delivery platform" },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: "SynoraDrive: Dealership contract-to-delivery platform" },
      { property: "og:description", content: "Intelligence behind every handover. SynoraDrive reads a signed contract-of-sale PDF, prepares a checked deal pack and runs five gated stages to delivery." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: SOCIAL_IMAGE },
      { property: "og:image:alt", content: "A vehicle outside a modern dealership at dusk" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: `${SITE_URL}${heroVehicle.url}`,
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: `${SITE_URL}${heroVehicleMobile.url}`,
        media: "(max-width: 767px)",
        fetchPriority: "high",
      },
    ],
    scripts: [{ type: "application/ld+json", children: structuredData }],
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
      <img
        src={heroVehicle.url}
        srcSet={`${heroVehicleMobile.url} 800w, ${heroVehicle.url} 1600w`}
        sizes="100vw"
        alt="A vehicle outside a modern dealership at dusk"
        className="hero-vehicle absolute inset-0 -z-20 h-full w-full object-cover"
        fetchPriority="high"
        decoding="sync"
        width={1600}
        height={907}
      />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="glow-orb glow-orb-indigo -z-10 left-[8%] top-[12%] size-72" />
      <div className="glow-orb glow-orb-mint -z-10 bottom-[18%] right-[6%] size-56" />
      <div className="mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="hero-copy max-w-2xl">
          <div className="mb-7 flex items-center gap-3 font-mono text-xs text-primary-glow"><span className="h-px w-8 bg-primary-glow" /> THE NEXT SHIFT IN AUTOMOTIVE OPERATIONS</div>
          <h1 className="text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"><span className="block text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">Intelligence Behind Every Handover.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">Upload a signed Contract of Sale PDF from your DMS. SynoraDrive extracts deal data, populates your dealership's Showroom and Pre-Delivery document packs for staff verification, and coordinates Sales, F&I, Aftermarket, Workshop PDI, and Registration across a 5-stage Dealership Board.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-brand"><Link to="/demo">Book a 30-Minute Rooftop Walkthrough <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-foreground/25 bg-background/30"><a href="#product-view-title">Explore Interactive Dealership Board <ArrowRight /></a></Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><Cloud className="size-4 text-primary-glow" /> Architected on Microsoft Azure (Australia East)</span>
            <span className="flex items-center gap-2"><KeyRound className="size-4 text-primary-glow" /> Role-Based Access &amp; Staff TOTP MFA Built-In</span>
            <span className="flex items-center gap-2"><Building2 className="size-4 text-primary-glow" /> Configured for Australian Multi-Rooftop Dealer Groups</span>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/15 bg-background/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 font-mono text-xs text-muted-foreground lg:px-8">
          <span className="flex items-center gap-2"><span className="indicator-light size-1.5 rounded-full bg-success" /> DESIGNED FOR THE DEALERSHIP FLOOR</span>
          <span>SIGNED CONTRACT → DEAL PACK → FIVE GATED STAGES → DELIVERY</span>
          <Link to="/how-it-works" className="flex items-center gap-2 text-foreground">SEE HOW A DEAL MOVES <ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function WorksWith() {
  const tools = ["DMS Contract of Sale PDFs", "Victorian Registration & Transfer Forms", "Showroom & Pre-Delivery Deal Packs", "ASIC Company Extracts", "PPSR Certificates", "Dealer Compliance Checklists"];
  return (
    <section className="light-section border-y bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-logo-accent">Engineered around the documents Australian dealerships produce daily</div>
      </div>
      <div className="marquee mt-4 pb-10 text-xs text-muted-foreground" aria-label="Documents SynoraDrive is designed around">
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
          <p className="mt-4 leading-relaxed text-muted-foreground">Upload a signed contract-of-sale PDF from your DMS. SynoraDrive extracts the deal data with OCR and AcroForm rules, prepares the deal pack for your staff to check, then moves the car through compliance and finance gates with departments working in parallel.</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
          {["Signed contract", "Deal pack prepared for staff to check", "Five gated stages", "Delivery tracking and Command Center reporting"].map((step, i) => (
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
    { Icon: Workflow, t: "SynoraCNS & Operations", b: "One shared deal record across five gated stages, connecting Sales, Stock, F&I, Aftermarket, Workshop, Rego and Delivery in parallel.", to: "/platform/operations" },
    { Icon: BadgeCheck, t: "SyncZero Extraction", b: "Upload or ingest the Contract of Sale once. Buyer, vehicle, trade-in and finance details populate directly into your dealership's deal pack forms for staff review, eliminating manual re-keying.", to: "/platform" },
    { Icon: ShieldCheck, t: "Compliance & Deal-Type Checklists", b: "Configurable deal-type checklists (New, Demo, Used, Company/ASIC ACN check, Fleet), 28-day RWC rulesets and deferred-sales tracking, designed to help rooftops keep deal files complete before handover and protect OEM bonus eligibility.*", to: "/platform/compliance" },
    { Icon: Gauge, t: "Command Center Reporting", b: "Unified month-book visibility joining active pipeline deals, scheduled deliveries and RDA watchlists.", to: "/platform/reporting" },
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
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{b}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">* Designed as an operational workflow aid; dealerships remain responsible for final file verification and regulatory compliance.</p>
      </div>
    </section>
  );
}

function WorkflowTeaser() {
  const stages = ["In-Queue [Pending Action]", "Document Prep", "Finance & Approvals", "Workshop & PDI", "Ready for Delivery"];
  return (
    <section className="light-section mist-section border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">Five stages, each with a gate your team sets.</h2>
          <Link to="/how-it-works" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary">See how a deal moves <ArrowRight className="size-4" /></Link>
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
          <div className="showcase-eyebrow font-mono text-xs">LIVE PLATFORM UI PREVIEW • ILLUSTRATIVE DEMO DATA</div>
          <h2 id="product-view-title" className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">Every car is a project.<br />Every stage has a RACI owner.</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">The Dealership Board, shown with illustrative demo data: a vehicle cycles from In-Queue to Delivery, and every department can see who is Responsible (R), who is Accountable (A) for the gate, and what is holding handover back.</p>
        </Reveal>
        <ProductPreview />
      </div>
    </section>
  );
}

function ProofBand() {
  return (
    <section className="band relative isolate overflow-hidden border-t">
      <img
        src={yardImage}
        srcSet={`${yardImageMobile} 800w, ${yardImage} 1600w`}
        sizes="100vw"
        alt="A dealership car yard at dusk, rows of vehicles under string lights"
        loading="lazy"
        decoding="async"
        width={1536}
        height={1024}
        className="band-img absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="yard-shade absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary-glow">Where we are</div>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">Built. Tested. Ready for your rooftop.</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">SynoraDrive is built and engineered on Microsoft Azure (Australia East). Our Australian dealership pilot program opens 30 November 2026, with each rooftop configured to its own DMS contract layouts and compliance rules.</p>
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
            <p className="mt-2 text-xs text-muted-foreground">Illustrative calculation based on your custom inputs and workflow assumptions; actual time savings are measured during your rooftop pilot.</p>
          </div>
          <Link to="/pricing" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-ink shadow-glow">
            Estimate your rooftop <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
