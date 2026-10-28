import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";
import { Cloud, KeyRound, Lock, Database, FileClock, ShieldCheck, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security and data residency, SynoraDrive" },
      { name: "description", content: "How SynoraDrive protects dealership deal data: role-based access, staff TOTP MFA, activity logs and hosting in Microsoft Azure Australia East." },
      { property: "og:title", content: "Security and data residency, SynoraDrive" },
      { property: "og:description", content: "Engineered on Microsoft Azure (Australia East): encryption in transit and at rest, role-based access, staff TOTP MFA, strict CSP and 725 automated backend checks." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/security" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: SecurityPage,
});

const controls = [
  { Icon: Cloud, t: "Primary data in Microsoft Azure (Australia East)", b: "Azure Container Apps, Azure Database for PostgreSQL Flexible Server, Azure Static Web Apps, Azure Key Vault and Azure Blob Storage, all in the Australia East region." },
  { Icon: Database, t: "Encryption in transit and at rest", b: "HTTPS encryption in transit and Microsoft Azure encryption at rest for storage and databases." },
  { Icon: Lock, t: "Role-based access control", b: "Access by rooftop and role, with Global and Local Admin roles for dealer groups." },
  { Icon: KeyRound, t: "Staff TOTP MFA", b: "Staff sign in with a password plus authenticator-app (TOTP) codes." },
  { Icon: ShieldCheck, t: "Fail-closed sessions and strict CSP", b: "Fail-closed JWT session security, upload validation and size limits, and a strict Content Security Policy." },
  { Icon: FileClock, t: "Short document retention", b: "Deal documents are deleted after a retention period of generally 30 days. With the DocuSign add-on, signed documents sit in your own DocuSign account. Your dealership keeps its own copies of completed packs." },
  { Icon: Award, t: "725 automated checks", b: "A 725-check automated pytest suite across 92 backend modules runs against every change. Independent certification (for example SOC 2 or ISO 27001) is on our roadmap." },
] as const;

function SecurityPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="Trust & security"
          title="Enterprise-Ready Security Architecture, Engineered on Microsoft Azure."
          intro="Every deal holds customer identity documents, contracts and finance details. SynoraDrive hosts its primary data in Microsoft Azure (Australia East) and is built with the Privacy Act 1988 (Cth) and the Australian Privacy Principles in mind. Some service providers, such as email delivery and website analytics, may process data outside Australia. See our Privacy Policy."
        >
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
              Book a rooftop walkthrough <ArrowRight className="size-4" />
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
