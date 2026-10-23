import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";
import { Cloud, KeyRound, Lock, Database, FileClock, ShieldCheck, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security and data residency, SynoraDrive" },
      { name: "description", content: "Hosted in Microsoft Azure Australia East, with role-based access, staff MFA, encryption and short document retention." },
      { property: "og:title", content: "Security and data residency, SynoraDrive" },
      { property: "og:description", content: "Hosted in Microsoft Azure Australia East, with role-based access, staff MFA, encryption and short document retention." },
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
    t: "Australian data residency",
    b: "Production runs in Microsoft Azure Australia East. Your deal data and documents are stored in Australia, with geo-redundant database backups.",
  },
  {
    Icon: Lock,
    t: "Role-based access",
    b: "Access is set by rooftop and role, with Global and Local Admin roles so each dealership controls its own staff.",
  },
  {
    Icon: KeyRound,
    t: "Multi-factor sign-in",
    b: "Staff can protect their accounts with authenticator-app codes (TOTP).",
  },
  {
    Icon: FileClock,
    t: "Short document retention",
    b: "Local copies of deal documents are kept for 35 days, or until the estimated delivery date if that is later. DocuSign keeps the signed record, and completed packs can be downloaded to your dealership's own records.",
  },
  {
    Icon: Database,
    t: "Encryption",
    b: "Data is encrypted in transit over HTTPS and at rest by Microsoft Azure's storage and database encryption.",
  },
  {
    Icon: ShieldCheck,
    t: "Secure by design",
    b: "Short-lived sign-in tokens, upload validation and size limits, a strict content security policy, and an automated suite of over 700 backend tests on every change.",
  },
  {
    Icon: Award,
    t: "Certification roadmap",
    b: "Independent certification (SOC 2 or ISO 27001) is on our roadmap.",
  },
] as const;

function SecurityPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="Trust & security"
          title="Enterprise-grade security, built for Australian dealer groups."
          intro="Every deal holds customer identity documents, contracts and finance details. SynoraDrive keeps them in Australia and is designed to support your obligations under the Privacy Act 1988 and the Australian Privacy Principles."
        >
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
              Book a rooftop demo <ArrowRight className="size-4" />
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
