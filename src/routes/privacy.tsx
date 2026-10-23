import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy, SynoraDrive" },
      { name: "description", content: "How SynoraDrive collects, uses, stores and protects personal information." },
      { property: "og:title", content: "Privacy Policy, SynoraDrive" },
      { property: "og:description", content: "How SynoraDrive collects, uses, stores and protects personal information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    t: "Who we are",
    b: "SynoraDrive is a product of SynoraTech Pty Ltd, Melbourne, Victoria. [To be confirmed: legal entity name, ABN and contact for privacy questions before launch.]",
  },
  {
    t: "What we collect",
    b: "Website enquiries (name, email, phone, dealership) and, through the platform, dealership customer data processed for our dealer clients.",
  },
  {
    t: "Why we collect it and how we use it",
    b: "Website enquiry details are used only to respond to your request, such as arranging a demo. Platform data is used to provide the contract-to-delivery service to our dealer clients.",
  },
  {
    t: "Where it is stored",
    b: "Your deal data and documents are stored in Australia on Microsoft Azure. Service providers that process data on our behalf include Microsoft Azure, DocuSign and email delivery services.",
  },
  {
    t: "How long we keep it",
    b: "Local copies of deal documents are kept for 35 days, or until the estimated delivery date if that is later. DocuSign keeps the signed record, and completed packs can be downloaded to the dealership's own records.",
  },
  {
    t: "Access and correction",
    b: "You have rights of access and correction under the Australian Privacy Principles. You may also complain to the Office of the Australian Information Commissioner (OAIC).",
  },
  {
    t: "Cookies and analytics",
    b: "This website uses cookies and analytics to understand and improve how it is used.",
  },
] as const;

function PrivacyPage() {
  return (
    <section className="light-section bg-background text-foreground">
      <PageHero
        eyebrow="Trust"
        title="Privacy Policy"
        intro="This outline covers what the full policy will address. A lawyer-reviewed version will be published before launch."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.t}>
              <h2 className="text-xl font-semibold">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 border-t pt-6 text-xs text-muted-foreground">Last updated: October 2026.</p>
      </div>
    </section>
  );
}
