import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CustomerJourneyPreview } from "@/components/customer-journey-preview";
import { Reveal } from "@/components/reveal";
import handover from "@/assets/delivery-handover-1600.webp";

import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/platform/customer-experience")({
  head: () => ({
    meta: [
      { title: "Enhanced CX: From Signed to Collected | SynoraDrive" },
      { name: "description", content: "Explore SynoraDrive Enhanced CX: planned customer email updates from signed contract to delivery, with a direct connection to their Sales Consultant." },
      { property: "og:title", content: "Enhanced CX: From Signed to Collected | SynoraDrive" },
      { property: "og:description", content: "Explore SynoraDrive Enhanced CX: planned customer email updates from signed contract to delivery, with a direct connection to their Sales Consultant." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/platform/customer-experience` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/platform/customer-experience` }],
  }),
  component: CustomerExperiencePage,
});

const features = [
  ["Stage-triggered updates · On the roadmap", "Enhanced CX is planned to send a customer email when the deal progresses from In-Queue through to Delivery, explaining what is happening next."],
  ["Their Sales Consultant, still connected · On the roadmap", "Every planned notification would offer a way to connect with their Sales Consultant for questions about finance, registration or vehicle readiness."],
  ["A private, dealer-branded portal", "Buyers will receive a private link by email to upload their licence and finance documents from their phone."],
  ["DocuSign e-signature (enterprise onboarding integration, subject to partner/client agreement)", "Designed to send showroom and pre-delivery packs for electronic signature before the customer arrives."],
  ["Your brand, not ours", "Portal pages and emails carry your dealership's name and branding."],
  ["A handover about the car", "Designed so more of the paperwork can be done ahead of time, and pickup day is spent on the vehicle, not chasing missing pages."],
] as const;

const related = [
  { to: "/platform/compliance", label: "Compliance aids" },
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
          eyebrow="SynoraDrive Enhanced CX · On the roadmap"
          title="The contract is signed. The conversation shouldn’t stop."
          intro="Between signing and picking up the car, customers can be left wondering: Is my finance progressing? Is the registration ready? What is happening with my vehicle? Enhanced CX is planned to replace that silence with timely email updates as each stage moves forward — and a direct connection to their Sales Consultant."
        />
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <Reveal className="grid gap-8 border-y py-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl font-semibold">Work is happening. Customers just can’t see it.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Finance, paperwork, registration and vehicle preparation can move between several departments. When those hand-offs stay internal, the customer hears nothing — and ends up calling to find out where things stand.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Keep them informed. Not left chasing.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">The planned trigger is a stage change on the DealBoard. An email would explain where the vehicle is in the process, who is looking after the next step and what the customer can expect, with an option to contact their Sales Consultant.</p>
            </div>
          </Reveal>
          <div className="pb-10 pt-16">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">Planned customer notifications</p>
            <h2 className="mt-3 text-3xl font-semibold">From In-Queue to Delivery. No unexplained silence.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">A clearer journey at every hand-off, with updates tailored to the stage and your dealership’s workflow. Enhanced CX notifications are on the roadmap, not available today.</p>
          </div>
          <CustomerJourneyPreview />
        </div>
        <div className="relative isolate overflow-hidden">
          <img src={handover} alt="A customer receiving their vehicle in a dealership showroom" loading="lazy" width={1600} height={900} className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="handover-shade absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-6 py-20 text-surface lg:px-8">
            <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">Build the anticipation.<br />Not the uncertainty.</h2>
            <p className="mt-5 max-w-xl leading-relaxed">A customer experience designed to keep the excitement alive from the signature to the keys.</p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="mb-4 text-3xl font-semibold">Less paperwork. More connection.</h2>
          <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">Alongside roadmap email updates, the customer document upload portal and DocuSign e-signature are enterprise onboarding integrations, configured per dealer group and subject to partner/client agreements.</p>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {features.map(([t, b]) => (
              <div key={t} className="flex gap-4 rounded-lg border bg-card p-6">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                <div>
                  <h3 className="font-semibold">{t}</h3>
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
