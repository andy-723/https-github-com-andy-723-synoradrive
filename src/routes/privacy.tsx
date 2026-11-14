import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing";
import { LegalDocument } from "@/components/legal-document";
import policy from "@/content/privacy-policy.md?raw";

import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy, SynoraDrive" },
      { name: "description", content: "How SYNORA TECH collects, uses, stores, discloses and protects personal information for the SynoraDrive website and platform." },
      { property: "og:title", content: "Privacy Policy, SynoraDrive" },
      { property: "og:description", content: "How SYNORA TECH handles personal information for the SynoraDrive website and platform." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="light-section bg-background text-foreground">
      <PageHero eyebrow="Trust" title="Privacy Policy" intro="How we handle personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles." />
      <div className="mx-auto max-w-3xl break-words px-6 py-12 lg:px-8">
        <LegalDocument content={policy} />
        <p className="mt-14 border-t pt-6 text-xs text-muted-foreground">Last updated: 26 October 2026.</p>
      </div>
    </section>
  );
}
