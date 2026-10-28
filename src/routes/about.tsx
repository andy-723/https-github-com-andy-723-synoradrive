import { createFileRoute } from "@tanstack/react-router";
import { FounderShowcase } from "@/components/about-founder";
import { ClosingCta } from "@/components/closing-cta";
import { SectionHead } from "@/components/marketing";
import { Reveal } from "@/components/reveal";
import dealershipYard from "@/assets/dealership-yard-1600.webp";
import dealershipYardMobile from "@/assets/dealership-yard-800.webp";
import deliveryHandover from "@/assets/delivery-handover-1600.webp";
import deliveryHandoverMobile from "@/assets/delivery-handover-800.webp";
import deliveryBayNight from "@/assets/delivery-bay-night-1600.webp";
import deliveryBayNightMobile from "@/assets/delivery-bay-night-800.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SynoraDrive and SYNORA TECH" },
      { name: "description", content: "An enterprise post-contract platform built to replace manila folders and spreadsheets between contract and delivery." },
      { property: "og:title", content: "About SynoraDrive and SYNORA TECH" },
      { property: "og:description", content: "An enterprise post-contract platform built to replace manila folders and spreadsheets between contract and delivery." },
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
    body: "One contract in, a deal pack prepared for staff to check, then five gated stages through to the keys.",
  },
] as const;

const SHOTS = [
  { src: dealershipYard, mobile: dealershipYardMobile, alt: "Dealership yard at dusk with rows of vehicles", caption: "The yard — where stock waits for its paperwork to catch up" },
  { src: deliveryHandover, mobile: deliveryHandoverMobile, alt: "Clean key handover between dealer and customer", caption: "The handover — the moment the paperwork leads to" },
  { src: deliveryBayNight, mobile: deliveryBayNightMobile, alt: "Vehicle in a delivery bay at night under lights", caption: "The delivery bay — where month-end is won or lost" },
] as const;

function AboutPage() {
  return (
    <div className="dark-section bg-[oklch(0.09_0.02_280)] text-[oklch(0.96_0.01_280)]">
      {/* Hero — yard at dusk behind the copy */}
      <section className="relative overflow-hidden">
        <img
          src={dealershipYard}
          srcSet={`${dealershipYardMobile} 800w, ${dealershipYard} 1600w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          width={1536}
          height={1024}
          className="hero-vehicle absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-shade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-32 lg:px-8 lg:pb-36 lg:pt-40">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">About</div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Built from the showroom floor up.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              For decades, the way a dealership runs a car sale after the handshake has barely changed.
              SynoraDrive is the system we wished existed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder showcase */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHead
          eyebrow="The founder"
          title="Built by someone who knows the paperwork."
          body="Andrew Phan founded SYNORA TECH after seeing first-hand how much time Australian dealership teams spend re-keying contracts, chasing updates and waiting on paperwork."
        />
        <FounderShowcase />
      </section>

      {/* Journey — the road from folders to SynoraDrive */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
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
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{step.era}</span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Photo band — the world we come from */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHead
          eyebrow="Where we come from"
          title="The yard, the handover, the delivery bay."
          body="Every screen in SynoraDrive is designed around everyday dealership paperwork."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SHOTS.map((shot, i) => (
            <Reveal key={shot.alt} delay={i * 120}>
              <figure className="framed-card about-shot group overflow-hidden rounded-xl border">
                <img
                  src={shot.src}
                  srcSet={`${shot.mobile} 800w, ${shot.src} 1600w`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  width={1536}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-muted-foreground">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission & vision */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="framed-card h-full rounded-xl border bg-card p-8">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Our mission</span>
              <p className="mt-4 text-lg leading-relaxed">
                To replace manila folders and disconnected spreadsheets with a post-DMS workflow layer designed to help dealership teams work faster and reduce re-keying errors, so every buyer gets a smooth path from signature to keys.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="framed-card h-full rounded-xl border bg-card p-8">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Our vision</span>
              <p className="mt-4 text-lg leading-relaxed">
                The operating layer between the DMS and the delivery bay for every franchised dealership in Australia, and the place where dealer principals run, measure and forecast their whole sales operation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}
