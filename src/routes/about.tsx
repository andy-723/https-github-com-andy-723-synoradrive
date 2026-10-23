import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/marketing";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SynoraDrive and SynoraTech" },
      { name: "description", content: "Built on a Melbourne dealership floor to replace manila folders and spreadsheets between contract and delivery." },
      { property: "og:title", content: "About SynoraDrive and SynoraTech" },
      { property: "og:description", content: "Built on a Melbourne dealership floor to replace manila folders and spreadsheets between contract and delivery." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="light-section bg-background text-foreground">
        <PageHero eyebrow="About" title="Built from the showroom floor up." />
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold">Why we built SynoraDrive</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                For decades, the way a dealership runs a car sale after the handshake has barely changed. Deals live in manila folders, status lives on workshop whiteboards, and forecasts live in spreadsheets. When a folder sits on the wrong desk, documents are missed, deliveries slip past month-end, and OEM money is put at risk.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Working inside a Melbourne prestige dealer group, we watched sales, finance and admin teams lose hours every day re-keying contract data and chasing updates. SynoraDrive is the system we wanted: one contract in, every document generated, every gate enforced, every car visible.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Our mission</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To replace manila folders and disconnected spreadsheets with an intelligent post-DMS operating layer, so dealership teams work faster with fewer errors and every buyer gets a smooth path from signature to keys.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Our vision</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The operating layer between the DMS and the delivery bay for every franchised dealership in Australia, and the place where dealer principals run, measure and forecast their whole sales operation.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-8">
              <h2 className="text-2xl font-semibold">Founder</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Andrew Phan founded SynoraTech, bringing frontline Melbourne prestige dealership sales experience to the problems he worked through every day.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
