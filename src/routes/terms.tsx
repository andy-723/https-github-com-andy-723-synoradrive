import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing";
import { LegalDocument } from "@/components/legal-document";
import terms from "@/content/subscription-terms.md?raw";
import disclaimer from "@/content/disclaimer.md?raw";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Disclaimer, SynoraDrive" },
      { name: "description", content: "Review the draft SynoraDrive Subscription Terms and Conditions and Disclaimer, including customer responsibilities, consumer rights and service limitations." },
      { property: "og:title", content: "Terms and Disclaimer, SynoraDrive" },
      { property: "og:description", content: "Draft Subscription Terms and Conditions and Disclaimer for SynoraDrive, pending Australian legal review." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="light-section bg-background text-foreground">
      <PageHero
        eyebrow="Trust"
        title="Terms and Disclaimer"
        intro="Draft v0.1 for legal review · 24 October 2026. These documents are not approved for publication or signature."
      />
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <nav aria-label="Legal documents" className="flex flex-wrap gap-x-8 gap-y-4 border-y py-5 text-sm font-semibold">
          <a href="#subscription-terms" className="text-primary underline-offset-4 hover:underline">Subscription Terms and Conditions</a>
          <a href="#disclaimer" className="text-primary underline-offset-4 hover:underline">Disclaimer</a>
        </nav>
        <article id="subscription-terms" className="scroll-mt-28 break-words pt-10" aria-labelledby="terms-heading">
          <h2 id="terms-heading" className="text-2xl font-semibold sm:text-3xl">SynoraDrive Subscription Terms and Conditions</h2>
          <LegalDocument content={terms} />
        </article>
        <article id="disclaimer" className="mt-16 scroll-mt-28 break-words border-t pt-10" aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="text-2xl font-semibold sm:text-3xl">SynoraDrive Disclaimer</h2>
          <LegalDocument content={disclaimer} />
        </article>
        <p className="mt-14 border-t pt-6 text-xs text-muted-foreground">Draft v0.1 · Last updated: 24 October 2026 · Legal review pending.</p>
      </div>
    </section>
  );
}
