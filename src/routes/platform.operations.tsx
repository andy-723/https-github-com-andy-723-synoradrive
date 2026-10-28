import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { Breadcrumb, PageHero } from "@/components/marketing";
import { Reveal } from "@/components/reveal";
import workshopImage from "@/assets/workshop-pdi-1600.webp";
import workshopImageMobile from "@/assets/workshop-pdi-800.webp";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/platform/operations")({
  head: () => ({
    meta: [
      { title: "Unified dealership operations, SynoraDrive" },
      { name: "description", content: "Sales, stock, F&I, aftermarket, workshop and rego on one five-stage board, with parallel tasks, @mentions and escalations." },
      { property: "og:title", content: "Unified dealership operations, SynoraDrive" },
      { property: "og:description", content: "Sales, stock, F&I, aftermarket, workshop and rego on one five-stage board, with parallel tasks, @mentions and escalations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/platform/operations" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform/operations" }],
  }),
  component: OperationsPage,
});

const features = [
  ["Five-stage delivery board", "In Queue → Document Prep → Finance & Approvals → Workshop & PDI → Ready for Delivery."],
  ["Parallel tasks", "Designed so stock, F&I, aftermarket and workshop work can start together instead of waiting for a folder to arrive."],
  ["Rooftop visibility", "Every car, its stage, its owner and its delivery date on one screen, designed to reduce \u201cis the car ready?\u201d calls across the yard."],
  ["On-deal communication", "@mention F&I, the workshop or the Sales Manager on the deal itself, with in-app notifications, so every decision stays with the vehicle record."],
  ["Proactive escalation", "Designed to flag stalled external finance to the Sales Manager, track registration transfer and inspection deadlines, and surface deals near or past their customer ETA."],
  ["Activity log", "An activity log designed to record uploads, approvals and stage changes with the user and time."],
] as const;

const related = [
  { to: "/platform/compliance", label: "Compliance aids" },
  { to: "/platform/reporting", label: "Centralised reporting" },
  { to: "/platform/customer-experience", label: "Customer experience" },
  { to: "/how-it-works", label: "How a deal moves" },
] as const;

function OperationsPage() {
  return (
    <>
      <section className="band relative isolate overflow-hidden">
        <img
          src={workshopImage}
          srcSet={`${workshopImageMobile} 800w, ${workshopImage} 1600w`}
          sizes="100vw"
          alt="A technician inspecting a vehicle on a hoist in a dealership workshop"
          fetchPriority="high"
          decoding="async"
          width={1536}
          height={1024}
          className="band-img absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="workshop-shade absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <Breadcrumb items={[{ to: "/", label: "Home" }, { to: "/platform", label: "Platform" }, { label: "Unified operations" }]} />
        </div>
        <div className="pb-20">
          <PageHero
            eyebrow="Unified operations"
            title="One shared timeline for every department, across five gated stages."
            intro="Folder hand-offs can slow deliveries. SynoraDrive is designed to put sales, stock control, the Business Manager, aftermarket, the workshop and PDI, rego and delivery on one shared board, so departmental tasks can start in parallel, with on-deal @mentions and an activity log. These features are in development."
          />
        </div>
      </section>
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {features.map(([t, b], i) => (
              <Reveal key={t} delay={(i % 2) * 120} className="lift flex gap-4 rounded-xl border bg-card p-6">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                <div>
                  <h2 className="font-semibold">{t}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </Reveal>
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
