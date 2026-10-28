import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/platform/reporting")({
  head: () => ({
    meta: [
      { title: "Centralised dealership reporting, SynoraDrive" },
      { name: "description", content: "A month book of locked, scheduled and stretch deliveries, a weighted pipeline and MTD and QTD performance, designed to replace manual spreadsheet trackers." },
      { property: "og:title", content: "Centralised dealership reporting, SynoraDrive" },
      { property: "og:description", content: "A month book of locked, scheduled and stretch deliveries, a weighted pipeline and MTD and QTD performance, designed to replace manual spreadsheet trackers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/platform/reporting` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/platform/reporting` }],
  }),
  component: ReportingPage,
});

const features = [
  ["Month book", "Locked deliveries, cars scheduled to go out this month, and a stretch forecast from the open pipeline, against your targets."],
  ["Targets by deal type", "Monthly New, Demo and Used targets per rooftop."],
  ["Weighted pipeline", "Consultants log prospects and nominated vehicles, and stage weightings turn them into a realistic forecast."],
  ["Status breakdown", "Designed to show units across Sold, Contracted, Pre-Reported (RDA) and Delivered."],
  ["Staff performance", "Month-to-date and quarter-to-date results by consultant, so coaching starts early."],
  ["Coming with Insights and Forecasting", "Group dashboards across rooftops, multi-quarter forecasting and OEM target tracking."],
] as const;

const related = [
  { to: "/platform/compliance", label: "Compliance aids" },
  { to: "/platform/operations", label: "Unified operations" },
  { to: "/platform/customer-experience", label: "Customer experience" },
  { to: "/how-it-works", label: "How a deal moves" },
] as const;

function ReportingPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <Breadcrumb items={[{ to: "/", label: "Home" }, { to: "/platform", label: "Platform" }, { label: "Centralised reporting" }]} />
        </div>
        <PageHero
          eyebrow="Centralised reporting"
          title="A month book designed to replace manual spreadsheet trackers."
          intro="DMS reports tell you what happened after the month closes, so GSMs keep fragile spreadsheet trackers by hand. SynoraDrive's Command Report is designed to give the dealer principal and GSM a month book that joins signed contracts on the delivery board with prospects in the pipeline."
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {features.map(([t, b]) => (
              <div key={t} className="flex gap-4 rounded-xl border bg-card p-6">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                <div>
                  <h2 className="font-semibold">{t}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 border-t pt-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Related</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {related.map((r) => (
                <Link key={r.to} to={r.to} className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
                  {r.label} <ArrowRight className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
