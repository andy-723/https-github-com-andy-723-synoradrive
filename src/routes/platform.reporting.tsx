import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/platform/reporting")({
  head: () => ({
    meta: [
      { title: "Centralised dealership reporting, SynoraDrive" },
      { name: "description", content: "A live month book of locked, scheduled and stretch deliveries, a weighted pipeline and MTD and QTD performance, without spreadsheets." },
      { property: "og:title", content: "Centralised dealership reporting, SynoraDrive" },
      { property: "og:description", content: "A live month book of locked, scheduled and stretch deliveries, a weighted pipeline and MTD and QTD performance, without spreadsheets." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/platform/reporting" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform/reporting" }],
  }),
  component: ReportingPage,
});

const features = [
  ["Live month book", "Locked deliveries, cars scheduled to go out this month, and a stretch forecast from the open pipeline, against your targets."],
  ["Targets by deal type", "Monthly New, Demo and Used targets per rooftop."],
  ["Weighted pipeline", "Consultants log prospects and nominated vehicles, and stage weightings turn them into a realistic forecast."],
  ["Status breakdown", "Every unit across Sold, Contracted, Pre-Reported (RDA) and Delivered, without reconciling spreadsheets."],
  ["Staff performance", "Month-to-date and quarter-to-date results by consultant, so coaching starts early."],
  ["Coming with Insights and Forecasting", "Group dashboards across rooftops, multi-quarter forecasting and OEM target tracking."],
] as const;

const related = [
  { to: "/platform/compliance", label: "Compliance and OEM rebates" },
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
          title="Retire the spreadsheet. Run your month book live."
          intro="DMS reports tell you what happened after the month closes, so GSMs keep fragile spreadsheet trackers by hand. SynoraDrive's Command Center gives the dealer principal and GSM a live, self-updating month book that joins signed contracts on the delivery board with live prospects in the built-in pipeline."
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
