import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";
import { Cloud, KeyRound, Lock, Database, FileClock, ShieldCheck, Award, ArrowRight, Network, ScrollText, HardDrive } from "lucide-react";

import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security and data residency, SynoraDrive" },
      { name: "description", content: "How SynoraDrive protects deal data: hosted on AWS Sydney, encrypted in transit and at rest, private network, role-based access, staff MFA and audit logs." },
      { property: "og:title", content: "Security and data residency, SynoraDrive" },
      { property: "og:description", content: "Hosted on Amazon Web Services in Sydney: data stays in Australia, encrypted in transit and at rest, private database and API, role-based access, staff MFA and security audit logs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/security` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/security` }],
  }),
  component: SecurityPage,
});

const controls = [
  { Icon: Cloud, t: "Hosted on AWS in Sydney, data stays in Australia", b: "SynoraDrive runs on Amazon Web Services in the Asia Pacific (Sydney) region. Deal data, documents and backups are stored there. AWS data centres are independently audited against SOC 1, SOC 2, SOC 3 and ISO 27001, and AWS Sydney services are IRAP-assessed for Australian government use." },
  { Icon: Database, t: "Encryption in transit and at rest", b: "TLS 1.2 or higher for every connection. The database, document storage and job queues are encrypted at rest with AES-256, and application secrets are kept in AWS Secrets Manager, not in code." },
  { Icon: Network, t: "Private by design", b: "The database and application servers sit in a private AWS network with no public access. The only way in is through the Amazon CloudFront edge, over HTTPS." },
  { Icon: Lock, t: "Role-based access control", b: "Access by rooftop and role, with Global and Local Admin roles for dealer groups." },
  { Icon: KeyRound, t: "Staff MFA and sign-in protection", b: "Every staff account supports authenticator-app (TOTP) MFA with backup codes. Passwords are hashed with bcrypt, and repeated failed sign-ins lock the account temporarily." },
  { Icon: ShieldCheck, t: "Fail-closed sessions and browser protections", b: "Short-lived sessions that are revoked on password change or deactivation, upload validation and size limits, and a Content Security Policy with HSTS and anti-clickjacking headers." },
  { Icon: ScrollText, t: "Security audit trail", b: "Sign-ins, failed sign-ins, MFA changes, password resets and every admin change to staff access are logged and kept for 12 months." },
  { Icon: HardDrive, t: "Automated backups", b: "The database is backed up automatically every day, with point-in-time recovery, in the Sydney region." },
  { Icon: FileClock, t: "Short document retention", b: "Deal documents are deleted after a retention period of generally 30 days. With the DocuSign add-on, signed documents sit in your own DocuSign account. Your dealership keeps its own copies of completed packs." },
  { Icon: Award, t: "Tested on every change, working towards SOC 2", b: "More than 850 automated backend checks run against every change. We are aligning our controls with the SOC 2 Trust Services Criteria, and an independent SOC 2 audit is on our roadmap." },
] as const;

function SecurityPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="Trust & security"
          title="Enterprise-Ready Security Architecture, Hosted on AWS in Sydney."
          intro="Every deal holds customer identity documents, contracts and finance details. SynoraDrive hosts its primary data on Amazon Web Services in Sydney, so it stays in Australia, and is built with the Privacy Act 1988 (Cth) and the Australian Privacy Principles in mind. Some service providers, such as email delivery and website analytics, may process data outside Australia. See our Privacy Policy."
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
