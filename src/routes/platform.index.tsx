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
      { name: "description", content: "Six modules on one deal record: deal packs, delivery board, command reporting, customer portal, governance and forecasting." },
      { property: "og:title", content: "Platform overview, SynoraDrive" },
      { property: "og:description", content: "Six modules on one deal record: deal packs, delivery board, command reporting, customer portal, governance and forecasting." },
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
    b: "Upload or email a Pentana eraPower Contract of Sale. SynoraDrive reads it once, selects the forms that deal needs by deal type, buyer type, finance path and trade-in, and fills them into print-ready or DocuSign-ready packs. Guided verification highlights any field that needs a dealer entry or a second look before the pack is issued. Uploaded PPSR certificates are read automatically.",
    to: "/platform/compliance",
    toLabel: "Compliance",
  },
  {
    Icon: Workflow,
    t: "Five-Stage Delivery Board",
    b: "A Kanban board that runs every car from In Queue to Ready for Delivery, with a gate between each stage. It routes Sales Manager approvals, runs aftermarket and PDI tasks in parallel, and escalates stalled finance and registration transfer deadlines.",
    to: "/platform/operations",
    toLabel: "Unified operations",
  },
  {
    Icon: Gauge,
    t: "Command Reporting and weighted pipeline",
    b: "Your delivery board and showroom prospect pipeline in one view. Monthly targets by New, Demo and Used; locked, scheduled and stretch deliveries; the RDA watchlist; and MTD and QTD results by consultant.",
    to: "/platform/reporting",
    toLabel: "Centralised reporting",
  },
  {
    Icon: Users,
    t: "Customer portal and eSigning",
    b: "A private, dealer-branded link lets buyers upload identity and finance documents from their phone and sign by DocuSign before delivery. Their files land straight on the deal checklist.",
    to: "/platform/customer-experience",
    toLabel: "Customer experience",
  },
  {
    Icon: Building2,
    t: "Multi-rooftop governance",
    b: "Role-based access for multi-franchise groups, brand-specific document packs per rooftop, and a full activity log of every upload, approval and stage change.",
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
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Six modules running off a single deal record, so your showroom, F&I office, workshop, admin desk and leadership team never work out of sync.</p>
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
