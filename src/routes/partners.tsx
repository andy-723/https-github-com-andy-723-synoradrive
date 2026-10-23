import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";
import { ArrowRight, Handshake, Calculator, Users, Plug } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partner with SynoraDrive" },
      { name: "description", content: "Partnerships for DMS, CRM and digital retail providers, automotive associations and dealer advisers." },
      { property: "og:title", content: "Partner with SynoraDrive" },
      { property: "og:description", content: "Partnerships for DMS, CRM and digital retail providers, automotive associations and dealer advisers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/partners" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

const partnerTypes = [
  {
    Icon: Plug,
    t: "DMS, CRM and digital retail providers",
    b: "Connect your lead-to-contract tools to SynoraDrive's post-contract compliance and delivery layer.",
  },
  {
    Icon: Calculator,
    t: "Dealer accountants and advisory firms",
    b: "Give dealer group clients a practical lever to protect OEM rebates, tighten audit readiness and cut holding days.",
  },
  {
    Icon: Users,
    t: "Automotive associations",
    b: "Help member dealerships modernise compliance and cut admin cost per car sold.",
  },
  {
    Icon: Handshake,
    t: "Integration enquiries",
    b: "Talk to us about document ingestion profiles and future integration partnerships.",
  },
] as const;

function PartnersPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="Partner with us"
          title="Better together."
          intro="SynoraDrive is DMS-agnostic by design. It reads the contract your systems already produce instead of competing with them, which makes it a natural partner for technology providers, industry bodies and dealership advisers."
        >
          <div className="mt-7">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              Become a partner <ArrowRight className="size-4" />
            </Link>
          </div>
        </PageHero>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {partnerTypes.map(({ Icon, t, b }) => (
              <div key={t} className="flex gap-4 rounded-xl border bg-card p-7">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent"><Icon className="size-5 text-accent-foreground" /></div>
                <div>
                  <h2 className="font-semibold">{t}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
