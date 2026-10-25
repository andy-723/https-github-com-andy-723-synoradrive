import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing";
import { LegalDocument } from "@/components/legal-document";
import websiteTerms from "@/content/website-terms.md?raw";
import disclaimer from "@/content/disclaimer.md?raw";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Website Terms of Use and Disclaimer, SynoraDrive" },
      { name: "description", content: "The terms for using the SynoraDrive website and the Disclaimer for the SynoraDrive prototype, including your Australian Consumer Law rights." },
      { property: "og:title", content: "Website Terms of Use and Disclaimer, SynoraDrive" },
      { property: "og:description", content: "Website Terms of Use and Disclaimer for the SynoraDrive prototype." },
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
        title="Terms of Use and Disclaimer"
        intro="How you may use this website, and the limits of what SynoraDrive does. Customer subscription terms are provided only with a signed agreement."
      />
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <nav aria-label="Legal documents" className="flex flex-wrap gap-x-8 gap-y-4 border-y py-5 text-sm font-semibold">
          <a href="#website-terms" className="text-primary underline-offset-4 hover:underline">Website Terms of Use</a>
          <a href="#disclaimer" className="text-primary underline-offset-4 hover:underline">Disclaimer</a>
        </nav>
        <article id="website-terms" className="scroll-mt-28 break-words pt-10" aria-labelledby="terms-heading">
          <h2 id="terms-heading" className="text-2xl font-semibold sm:text-3xl">Website Terms of Use</h2>
          <LegalDocument content={websiteTerms} />
        </article>
        <article id="disclaimer" className="mt-16 scroll-mt-28 break-words border-t pt-10" aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="text-2xl font-semibold sm:text-3xl">SynoraDrive Disclaimer</h2>
          <LegalDocument content={disclaimer} />
        </article>
        <p className="mt-14 border-t pt-6 text-xs text-muted-foreground">Last updated: 25 October 2026.</p>
      </div>
    </section>
  );
}
