import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Disclaimer, SynoraDrive" },
      { name: "description", content: "Website terms of use and disclaimer for SynoraDrive." },
      { property: "og:title", content: "Terms and Disclaimer, SynoraDrive" },
      { property: "og:description", content: "Website terms of use and disclaimer for SynoraDrive." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  {
    t: "Website terms of use",
    b: "By using this website you accept these terms. The full terms will be lawyer-reviewed and published before launch.",
  },
  {
    t: "General information only",
    b: "Content on this website is general information about the SynoraDrive platform and is not advice for your specific circumstances.",
  },
  {
    t: "Estimates are illustrative",
    b: "ROI figures and time-saving estimates on this website are illustrative, based on stated assumptions. Actual results depend on volume, deal mix and workflow.",
  },
  {
    t: "Intellectual property",
    b: "SynoraDrive, SyncZero and associated marks are the intellectual property of SynoraTech Pty Ltd. Nothing on this website grants a licence to use them.",
  },
  {
    t: "Liability",
    b: "To the extent permitted by law, SynoraTech Pty Ltd limits its liability for the use of this website. Platform subscription terms are set out in the customer agreement, not on this page.",
  },
] as const;

function TermsPage() {
  return (
    <section className="light-section bg-background text-foreground">
      <PageHero
        eyebrow="Trust"
        title="Terms and Disclaimer"
        intro="This outline covers what the full terms will address. A lawyer-reviewed version will be published before launch."
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
