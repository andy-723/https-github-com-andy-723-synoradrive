import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/platform/customer-experience")({
  head: () => ({
    meta: [
      { title: "Customer portal and eSigning, SynoraDrive" },
      { name: "description", content: "Planned: a dealership-branded portal for customers to upload documents from their phone, with DocuSign e-signature subject to agreement." },
      { property: "og:title", content: "Customer portal and eSigning, SynoraDrive" },
      { property: "og:description", content: "Planned: a dealership-branded portal for customers to upload documents from their phone, with DocuSign e-signature subject to agreement." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/platform/customer-experience" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform/customer-experience" }],
  }),
  component: CustomerExperiencePage,
});

const features = [
  ["A private, dealer-branded portal (planned)", "Planned: buyers will receive a private link by email to upload their licence and finance documents from their phone."],
  ["DocuSign e-signature (planned, subject to agreement with DocuSign)", "Designed to send showroom and pre-delivery packs for electronic signature before the customer arrives."],
  ["Your brand, not ours (planned)", "Portal pages and emails carry your dealership's name and branding."],
  ["A handover about the car", "Designed so more of the paperwork can be done ahead of time, and pickup day is spent on the vehicle, not chasing missing pages."],
] as const;

const related = [
  { to: "/platform/compliance", label: "Compliance and OEM rebates" },
  { to: "/platform/operations", label: "Unified operations" },
  { to: "/platform/reporting", label: "Centralised reporting" },
  { to: "/how-it-works", label: "How a deal moves" },
] as const;

function CustomerExperiencePage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <Breadcrumb items={[{ to: "/", label: "Home" }, { to: "/platform", label: "Platform" }, { label: "Customer experience" }]} />
        </div>
        <PageHero
          eyebrow="Customer experience"
          title="End the paperwork scramble before delivery day."
          intro="The weeks between signing and pickup are where buyers feel forgotten, and handover day often turns into a long session at the desk. SynoraDrive is designed to close that gap with a simple, mobile-first portal. The customer portal and DocuSign e-signature are planned features. They are not available in the current prototype."
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
