import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";
import { Cloud, KeyRound, Lock, Database, FileClock, ShieldCheck, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security and data residency, SynoraDrive" },
      { name: "description", content: "Built to host its primary data in Microsoft Azure, Australia East. Role-based access, multi-factor sign-in and document retention are planned." },
      { property: "og:title", content: "Security and data residency, SynoraDrive" },
      { property: "og:description", content: "Built to host its primary data in Microsoft Azure, Australia East. Role-based access, multi-factor sign-in and document retention are planned." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/security" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: SecurityPage,
});

const controls = [
  {
    Icon: Cloud,
    t: "Primary data in Australia",
    b: "SynoraDrive is built to host its primary data in Microsoft Azure, Australia East. It is not yet in production. Backups are planned, and their configuration and region will be confirmed before launch.",
  },
  {
    Icon: Lock,
    t: "Role-based access (planned)",
    b: "Planned: role-based access by rooftop and role, with group and local administrator roles. Today, staff sign in with a password.",
  },
  {
    Icon: KeyRound,
    t: "Multi-factor sign-in (planned)",
    b: "Planned: multi-factor sign-in with authenticator-app codes (TOTP).",
  },
  {
    Icon: FileClock,
    t: "Short document retention (planned)",
    b: "Planned: automatic deletion of deal documents after a retention period of generally 30 days. Signed documents will sit in your own DocuSign account once e-signature is released. Your dealership should keep its own copies of completed packs.",
  },
  {
    Icon: Database,
    t: "Encryption",
    b: "Designed to encrypt data in transit (HTTPS) and to use Microsoft Azure's encryption at rest for storage and databases.",
  },
  {
    Icon: ShieldCheck,
    t: "Secure by design",
    b: "Designed with short-lived sign-in tokens, upload validation and size limits, a content security policy and automated backend testing.",
  },
  {
    Icon: Award,
    t: "Certification roadmap",
    b: "We do not currently hold any independent security certification. Certification (for example SOC 2 or ISO 27001) is on our roadmap.",
  },
] as const;

function SecurityPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="Trust & security"
          title="Security by design, for Australian dealer groups."
          intro="Every deal holds customer identity documents, contracts and finance details. SynoraDrive is built to host its primary data in Microsoft Azure, Australia East, and is being designed with the Privacy Act 1988 (Cth) and the Australian Privacy Principles in mind. Some service providers, such as email delivery and website analytics, may process data outside Australia. See our Privacy Policy."
        >
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
              Book a prototype demo <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
              Ask a security question
            </Link>
          </div>
        </PageHero>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controls.map(({ Icon, t, b }) => (
              <div key={t} className="flex gap-4 rounded-xl border bg-card p-6">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary-glow" />
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
