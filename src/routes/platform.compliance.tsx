import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/platform/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance aids, SynoraDrive" },
      { name: "description", content: "Compliance aids: deal-type checklists, stage gates, deferred-sales date tracking and an RDA watchlist. Aids only; they do not guarantee compliance." },
      { property: "og:title", content: "Compliance aids, SynoraDrive" },
      { property: "og:description", content: "Compliance aids: deal-type checklists, stage gates, deferred-sales date tracking and an RDA watchlist. Aids only; they do not guarantee compliance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/platform/compliance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform/compliance" }],
  }),
  component: CompliancePage,
});

const features = [
  ["Stage gates", "A car will not move to the next stage until the gate your team configures is marked as met (for example, a prepared deal pack and a signed order before Finance & Approvals)."],
  ["Deal-type checklists", "New, Demo, Used, company and fleet deals each get a document checklist configured with you during onboarding (for example authority to register, transfer papers, PPSR certificate and company extract). You remain responsible for confirming what each deal legally requires."],
  ["Deferred-sales-model date tracking", "Designed to show the Business Manager a date calculated from the details entered. It does not determine whether the add-on insurance deferred sales model (ASIC Act) has been complied with. Your Business Manager must confirm this."],
  ["Pre-Reported (RDA) watchlist", "Designed to help management keep track of reported units awaiting handover before OEM cut-off."],
  ["SyncZero: enter it once", "Upload the contract of sale once. SynoraDrive reads buyer, vehicle, trade-in and finance details and uses them to prepare the forms in the deal pack, which staff then check against the contract. Microsoft Graph shared mailbox intake is configured per dealer group."],
  ["Activity log", "An activity log. Designed to record uploads, signatures and stage changes against the deal."],
  ["Designed to work after your DMS", "Designed to read the contract-of-sale PDF your DMS already produces. Support for your DMS's contract format is confirmed during onboarding. Integrations with dealer management systems are subject to partner agreements."],
  ["A smoother handover", "Designed to reduce last-minute paperwork on delivery day."],
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
          eyebrow="Compliance aids"
          title="Compliance aids designed for multi-franchise groups."
          intro="OEM incentives can depend on complete deal files. SynoraDrive is designed to help staff see what documents a deal still needs, through configurable checklists and stage gates. It is an aid only. It does not guarantee compliance, incentive payments or audit outcomes, and it does not replace your own file reviews."
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
