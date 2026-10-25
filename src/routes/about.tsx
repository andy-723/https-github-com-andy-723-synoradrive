import { createFileRoute } from "@tanstack/react-router";
import { FounderShowcase } from "@/components/about-founder";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero, SectionHead } from "@/components/marketing";
import { Reveal } from "@/components/reveal";
import dealershipYard from "@/assets/dealership-yard.jpg";
import deliveryHandover from "@/assets/delivery-handover.jpg";
import deliveryBayNight from "@/assets/delivery-bay-night.jpg";

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

const JOURNEY = [
  {
    era: "The old way",
    title: "Manila folders & whiteboards",
    body: "Deals lived in folders on desks. Status lived on a workshop whiteboard. If the folder sat on the wrong desk, documents were missed and deliveries slipped past month-end.",
  },
  {
    era: "The patch",
    title: "Pretty spreadsheets & email chains",
    body: "Teams bolted on shared spreadsheets and group emails. They looked organised, but nobody could see who owned the work or what had actually been done.",
  },
  {
    era: "The fix",
    title: "SynoraDrive",
    body: "One contract in, every document generated, every gate enforced, every car visible from signature to keys — with a named owner at every stage.",
  },
] as const;

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="light-section bg-background text-foreground">
        <PageHero
          eyebrow="About"
          title="Built from the showroom floor up."
          intro="For decades, the way a dealership runs a car sale after the handshake has barely changed. SynoraDrive is the system we wished existed while we were working the floor."
        />
      </section>
      <div className="section-blend section-blend-to-dark" aria-hidden="true" />

      {/* Founder showcase — dark, cinematic */}
      <section className="dark-section bg-[oklch(0.09_0.02_280)] text-[oklch(0.96_0.01_280)]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHead
            eyebrow="The founder"
            title="He didn't study the problem. He sold cars through it."
            body="Andrew Phan founded SynoraTech after years on the front line of a Melbourne prestige dealer group — re-keying contracts, chasing updates, and watching deliveries slip for want of one shared view."
          />
          <FounderShowcase />
        </div>
      </section>
      <div className="section-blend section-blend-to-light" aria-hidden="true" />

      {/* Journey — the road from folders to SynoraDrive */}
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHead
            eyebrow="The road here"
            title="From paper folders to one connected drive."
          />
          <div className="about-road mt-16">
            {JOURNEY.map((step, i) => (
              <Reveal key={step.era} delay={i * 150} className="about-road-stop">
                <div className="about-road-marker" aria-hidden="true">
                  <span className="about-road-dot" />
                </div>
                <div className="framed-card rounded-xl border bg-card p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{step.era}</span>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="section-blend section-blend-to-dark" aria-hidden="true" />

      {/* Photo band — the world we come from */}
      <section className="dark-section bg-[oklch(0.09_0.02_280)] text-[oklch(0.96_0.01_280)]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHead
            eyebrow="Where we come from"
            title="The yard, the handover, the delivery bay."
            body="Every screen in SynoraDrive is shaped by a real moment on a dealership floor."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { src: dealershipYard, alt: "Dealership yard at dusk with rows of vehicles", caption: "The yard — where stock waits for its paperwork to catch up" },
              { src: deliveryHandover, alt: "Clean key handover between dealer and customer", caption: "The handover — the moment every gate protects" },
              { src: deliveryBayNight, alt: "Vehicle in a delivery bay at night under lights", caption: "The delivery bay — where month-end is won or lost" },
            ].map((shot, i) => (
              <Reveal key={shot.alt} delay={i * 120}>
                <figure className="framed-card about-shot group overflow-hidden rounded-xl border">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="section-blend section-blend-to-light" aria-hidden="true" />

      {/* Mission & vision */}
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="framed-card h-full rounded-xl border bg-card p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Our mission</span>
                <p className="mt-4 text-lg leading-relaxed">
                  To replace manila folders and disconnected spreadsheets with an intelligent post-DMS operating layer, so dealership teams work faster with fewer errors and every buyer gets a smooth path from signature to keys.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="framed-card h-full rounded-xl border bg-card p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Our vision</span>
                <p className="mt-4 text-lg leading-relaxed">
                  The operating layer between the DMS and the delivery bay for every franchised dealership in Australia, and the place where dealer principals run, measure and forecast their whole sales operation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <div className="section-blend section-blend-to-dark" aria-hidden="true" />

      <ClosingCta />
    </>
  );
}
