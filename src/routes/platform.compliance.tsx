import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/platform/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance and OEM rebate protection, SynoraDrive" },
      { name: "description", content: "Deal-type checklists, enforced stage gates, ASIC DSM tracking and an RDA watchlist that keep every deal file complete before handover." },
      { property: "og:title", content: "Compliance and OEM rebate protection, SynoraDrive" },
      { property: "og:description", content: "Deal-type checklists, enforced stage gates, ASIC DSM tracking and an RDA watchlist that keep every deal file complete before handover." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/platform/compliance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform/compliance" }],
  }),
  component: CompliancePage,
});

const features = [
  ["Enforced gates on every deal", "A car cannot move to the next stage until its gate is met, such as a generated deal pack and a signed order before Finance & Approvals."],
  ["A checklist for every deal and buyer type", "New, Demo, Used, company and fleet deals each get their exact documents: Authority to Register, the ACCC new-car rights notice, Form 4, transfer papers, PPSR certificate and ASIC company extract."],
  ["ASIC deferred sales model built in", "The four-clear-day blackout before add-on insurance can be sold is tracked on every deal, so the Business Manager can see exactly when a deal is clear."],
  ["Pre-Reported (RDA) watchlist", "Reported vehicles are matched to live deals and delivery dates, so management never loses sight of a reported unit awaiting handover before OEM cut-off."],
  ["SyncZero: enter it once", "Upload or email the Contract of Sale once. Buyer, vehicle, trade-in and finance details flow into every required form, with no re-keying."],
  ["A complete audit trail", "Every upload, signature and stage change is logged against the deal, so you can show what happened and when."],
  ["DMS-agnostic and multi-franchise", "SynoraDrive reads the contract PDF your DMS already produces (Pentana eraPower today) and applies brand-specific templates on every rooftop."],
  ["A handover that protects your survey scores", "Removing last-minute paperwork, stalled finance and missed aftermarket orders takes away the delivery-day friction behind poor post-delivery surveys."],
] as const;

const related = [
  { to: "/platform/operations", label: "Unified operations" },
  { to: "/platform/reporting", label: "Centralised reporting" },
  { to: "/platform/customer-experience", label: "Customer experience" },
  { to: "/how-it-works", label: "How a deal moves" },
] as const;

function CompliancePage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <Breadcrumb items={[{ to: "/", label: "Home" }, { to: "/platform", label: "Platform" }, { label: "Compliance" }]} />
        </div>
        <PageHero
          eyebrow="Compliance and OEM rebate protection"
          title="The audit shield for multi-franchise groups."
          intro="In Australian dealerships, much of the net profit sits in back-end OEM bonuses, and it disappears when an incomplete file triggers a clawback. SynoraDrive builds compliance into the daily workflow: a document checklist for every deal type, hard stage gates and a time-stamped record of every action. Your rooftops protect their margin without manual folder audits."
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
