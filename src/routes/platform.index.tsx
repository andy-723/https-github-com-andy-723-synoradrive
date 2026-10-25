import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/gamified";
import showroomImage from "@/assets/dealership-showroom.jpg";
import { ArrowRight, FileText, Workflow, Gauge, Users, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/platform/")({
  head: () => ({
    meta: [
      { title: "Platform overview, SynoraDrive" },
      { name: "description", content: "Six modules planned around one deal record: deal packs (prototype), delivery board, Command Report, customer portal, governance and forecasting." },
      { property: "og:title", content: "Platform overview, SynoraDrive" },
      { property: "og:description", content: "Six modules planned around one deal record: deal packs (prototype), delivery board, Command Report, customer portal, governance and forecasting." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/platform" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform" }],
  }),
  component: PlatformPage,
});

const modules = [
  {
    Icon: FileText,
    t: "Digital Deal Pack and SyncZero",
    b: "Upload a contract-of-sale PDF produced by your DMS. SynoraDrive reads it using rule-based field mapping, with OCR for scanned pages, and prepares the deal pack for your staff to check before it goes anywhere. Staff preview each form, then download or print the pack. Planned: email intake, DocuSign-ready packs and PPSR certificate reading.",
    to: "/platform/compliance",
    toLabel: "Compliance",
  },
  {
    Icon: Workflow,
    t: "Five-Stage Delivery Board (planned)",
    b: "Planned: a Kanban board designed to run every car from In Queue to Ready for Delivery, with a gate between each stage. It is designed to route Sales Manager approvals, run aftermarket and PDI tasks in parallel, and escalate stalled finance and registration transfer deadlines.",
    to: "/platform/operations",
    toLabel: "Unified operations",
  },
  {
    Icon: Gauge,
    t: "Command Report and weighted pipeline (planned)",
    b: "Planned: your delivery board and showroom prospect pipeline in one view. Monthly targets by New, Demo and Used; locked, scheduled and stretch deliveries; the RDA watchlist; and MTD and QTD results by consultant.",
    to: "/platform/reporting",
    toLabel: "Centralised reporting",
  },
  {
    Icon: Users,
    t: "Customer portal and eSigning (planned)",
    b: "Planned: a private, dealer-branded link for buyers to upload documents and e-sign (DocuSign integration subject to agreement).",
    to: "/platform/customer-experience",
    toLabel: "Customer experience",
  },
  {
    Icon: Building2,
    t: "Multi-rooftop governance (planned)",
    b: "Planned: role-based access for multi-franchise groups, brand-specific document packs per rooftop, and an activity log of uploads, approvals and stage changes.",
    to: "/security",
    toLabel: "Security",
  },
  {
    Icon: Sparkles,
    t: "Insights and Forecasting (roadmap add-on)",
    b: "For group executives: cross-rooftop dashboards, multi-quarter forecasting, benchmarks and OEM target tracking.",
    to: "/pricing",
    toLabel: "Pricing",
  },
] as const;

function PlatformPage() {
  return (
    <>
      <div className="showroom-band relative isolate overflow-hidden">
        <img src={showroomImage} alt="A modern dealership showroom with a vehicle and customer cafe lounge" width={1536} height={1024} className="band-img absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="showroom-shade absolute inset-0 -z-10" />
        <div className="scan-sweep mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <h1 className="hero-copy max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">One platform from signed contract to keys.</h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Six modules planned around a single deal record. Today, the working prototype covers the Digital Deal Pack. The other modules are in development.</p>
        </div>
      </div>
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ Icon, t, b, to, toLabel }, i) => (
              <Reveal key={t} delay={(i % 3) * 120} className="h-full">
                <TiltCard className="flex h-full flex-col rounded-2xl border bg-card p-7">
                <div className="grid size-10 place-items-center rounded-lg bg-accent"><Icon className="size-5 text-accent-foreground" /></div>
                <h2 className="mt-5 text-lg font-semibold">{t}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                <Link to={to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {toLabel} <ArrowRight className="size-4" />
                </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
