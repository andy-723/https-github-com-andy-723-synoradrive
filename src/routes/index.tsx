import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import vehicleAsset from "@/assets/synoradrive-vehicle.jpeg.asset.json";
import showroomImage from "@/assets/dealership-showroom.jpg";
import {
  ArrowRight, ShieldCheck, FileText, ScanLine, Wallet, BadgeCheck, Lock, Mail,
  Workflow, Gauge, Building2, CheckCircle2, Server, KeyRound, Database, Cloud, Sparkles, Upload, FileSpreadsheet, Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SynoraDrive — Dealership paperwork, compliance & delivery automation" },
      { name: "description", content: "SynoraDrive gives dealer principals and sales managers total visibility of every vehicle from sold to delivered — with a named owner on every task. Contract ingest, ASIC & RWC compliance and deal packs for Australian dealerships." },
      { property: "og:title", content: "SynoraDrive — Automate dealership paperwork" },
      { property: "og:description", content: "The first live view of every vehicle from sold to delivered — every task owned, every check visible. Built in Melbourne on Microsoft Azure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Product", "#product"], ["Workflow", "#workflow"], ["Security", "#security"], ["Pricing", "#pricing"],
] as const;

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-8 place-items-center rounded-lg bg-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="size-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 6.5C15.5 5 13.8 4.5 12 4.5 9 4.5 7 6 7 8.2c0 4.8 10 2.8 10 7.6 0 2.2-2.2 3.7-5 3.7-2 0-3.8-.6-5.2-2" /></svg>
      </div>
      <span className="font-display text-lg font-semibold tracking-tight">SynoraDrive</span>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <TrustStrip />
      <Product />
      <WorkflowSection />
      <Modules />
      <Security />
      <Pricing />
      <Cta />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="transition-colors hover:text-foreground">{l}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">Staff sign in</a>
          <a href="#demo" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">Book a demo</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="automotive-hero relative isolate overflow-hidden">
      <img src={vehicleAsset.url} alt="A vehicle outside a modern dealership at dusk" className="hero-vehicle absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" width={1356} height={768} />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="hero-copy max-w-2xl">
          <div className="mb-7 flex items-center gap-3 font-mono text-xs text-primary-glow"><span className="h-px w-8 bg-primary-glow" /> THE NEXT SHIFT IN AUTOMOTIVE</div>
          <h1 className="text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">SynoraDrive<span className="mt-3 block text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">Intelligence behind<br />every handover.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">The first live view of every vehicle from sold to delivered — every task owned, every check visible. No more chasing.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-brand"><a href="#demo">Book a rooftop demo <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-foreground/25 bg-background/30"><a href="#product">Explore the platform <ArrowRight /></a></Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary-glow" /> Australian data residency</span>
            <span className="flex items-center gap-2"><Cloud className="size-4 text-primary-glow" /> Microsoft Azure</span>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/15 bg-background/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 font-mono text-[10px] text-muted-foreground sm:text-xs lg:px-8">
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-success" /> BUILT FOR THE DEALERSHIP FLOOR</span>
          <span>CONTRACT → COMPLIANCE → DELIVERY</span>
          <a href="#product" className="flex items-center gap-2 text-foreground">MEET YOUR NEXT WORKFLOW <ArrowRight className="size-4" /></a>
        </div>
      </div>
    </section>
  );
}

const deals = [
  { id: "D900002", stock: "U900002", name: "Sample Holdings Pty Ltd", value: "$25,000", date: "15/09/2026", tone: "border-success/60", tag: null, checks: ["ASIC extract verified", "Finance approval pending", "Showroom pack generated"] },
  { id: "D900001", stock: "N900001", name: "Alex Sample", value: "$46,000", date: "15/09/2026", tone: "border-warning/70", tag: "T-242", checks: ["Licence OCR matched", "RWC within 28 days", "Balance due: $1,240"] },
];

const columns = [
  ["In-Queue", "bg-primary-glow", "Sales"], ["Document Prep", "bg-primary", "Admin"], ["Finance & Approvals", "bg-warning", "F&I"],
  ["Workshop & PDI", "bg-destructive", "Workshop"], ["Ready for Delivery", "bg-success", "Delivery"],
] as const;

function BoardReplica() {
  const [open, setOpen] = useState(0);
  const d = deals[open];
  if (!d) return null;
  return (
    <div className="rounded-2xl border bg-card p-2 shadow-elegant">
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-muted" /><span className="size-2.5 rounded-full bg-muted" /><span className="size-2.5 rounded-full bg-muted" />
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">app.synoradrive.com.au/board</span>
      </div>
      <div className="overflow-hidden rounded-xl bg-surface text-left text-surface-foreground">
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-3">
          <div>
            <div className="font-display text-sm font-semibold">Dealership Board <span className="ml-2 rounded bg-surface-muted px-1.5 py-0.5 text-[10px] font-normal">October · Week 3</span></div>
            <div className="text-[11px] opacity-60">2 active deals · every task owned · sample data</div>
          </div>
          <span className="hidden items-center gap-1.5 rounded-md border border-surface-border px-2.5 py-1.5 text-[11px] sm:inline-flex"><Upload className="size-3" />Upload Contract of Sale</span>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
          <div className="grid grid-cols-2 gap-3 overflow-x-auto p-4 md:grid-cols-5">
            {columns.map(([c, dot, owner], i) => (
              <div key={c} className={`min-h-64 rounded-lg border border-surface-border bg-surface-muted p-2.5 ${i > 1 ? "hidden md:block" : ""}`}>
                <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold"><span className={`size-1.5 rounded-full ${dot}`} />{c}<span className="ml-auto font-mono text-[9px] font-normal opacity-50">{owner}</span></div>
                {i === 0 && deals.map((x, k) => (
                  <Button variant="ghost" key={x.id} onClick={() => setOpen(k)} className={`mb-2 block h-auto w-full whitespace-normal rounded-md border-2 bg-surface p-2.5 text-left transition ${x.tone} ${open === k ? "ring-2 ring-primary/40" : ""}`}>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-primary">{x.id}<span className="opacity-40">·</span>{x.stock}</div>
                    <div className="mt-1 truncate text-[11px] font-medium">{x.name}</div>
                    <div className="mt-1.5 flex justify-between text-[10px] opacity-60"><span>{x.date}</span><span>{x.value}</span></div>
                    {x.tag && <span className="mt-1.5 inline-block rounded-full bg-success/15 px-1.5 text-[9px] font-semibold text-success">{x.tag}</span>}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          <aside className="border-t border-surface-border p-5 lg:border-t-0 lg:border-l">
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Deal card</div>
            <div className="mt-1 font-display text-base font-semibold">{d.name}</div>
            <div className="font-mono text-[11px] text-primary">{d.id} · {d.stock}</div>
            <div className="mt-4 space-y-2">
              {d.checks.map((c, i) => (
                <div key={c} className="flex items-center gap-2 rounded-md border border-surface-border px-2.5 py-2 text-[11px]">
                  <CheckCircle2 className={`size-3.5 ${i === 1 && open === 0 ? "text-warning" : c.startsWith("Balance") ? "text-destructive" : "text-success"}`} />{c}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md bg-surface-muted p-3 text-[11px]">
              <div className="opacity-60">Handover gate</div>
              <div className="mt-0.5 font-semibold">{open === 1 ? "Blocked until $0 balance" : "Awaiting finance approval"}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  const stats = [["725", "automated checks every release"], ["1", "live board from sold to delivered"], ["100%", "of tasks with a named owner"], ["100%", "Australian data residency"]];
  return (
    <section className="light-section mist-section border-y bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l}>
            <div className="font-display text-3xl font-semibold text-gradient">{n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </div>
  );
}

function Product() {
  return (
    <section id="product" className="light-section bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><div className="font-mono text-xs text-primary-glow">01 / TOTAL DELIVERY VISIBILITY</div><h2 className="mt-4 max-w-xl text-3xl font-semibold sm:text-4xl">Less chasing.<br />More moving forward.</h2></div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">For the first time, dealer principals and sales managers see every vehicle from sold to delivered — and exactly who owns each step. No email chains, no stale sales-log spreadsheets.</p>
      </div>
      <BoardReplica />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {([
          [Mail, "Retires the email chain", "Status lives on the board, not buried in inboxes."],
          [FileSpreadsheet, "Retires the shared sales log", "No more stale spreadsheets or version confusion."],
          [Users, "One owner per task", "Everyone knows who holds the next move."],
        ] as const).map(([Icon, t, b]) => (
          <div key={t} className="flex gap-4 rounded-xl border bg-card p-5">
            <Icon className="mt-0.5 size-5 shrink-0 text-primary-glow" />
            <div><div className="text-sm font-semibold">{t}</div><div className="mt-1 text-sm text-muted-foreground">{b}</div></div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    [Mail, "Ingest", "Drop a Contract of Sale PDF or let SynoraDrive watch your sales mailbox.", "Sales admin"],
    [ScanLine, "Extract", "OCR and form reading pull customer, vehicle and finance fields instantly.", "System"],
    [ShieldCheck, "Verify", "ASIC company search, licence match and state roadworthy rules run automatically.", "Compliance"],
    [FileText, "Generate", "Showroom, pre-delivery and e-signature packs are built and flattened.", "Document prep"],
    [Wallet, "Hand over", "Delivery unlocks only when the balance is $0 and every check is green.", "Delivery team"],
  ] as const;
  return (
    <section id="workflow" className="light-section mist-section bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24">
      <SectionHead eyebrow="Contract to handover" title="Your team sells. SynoraDrive connects the dots." body="Five stages your team already knows — now automated end to end." />
      <div className="mt-16 grid gap-4 md:grid-cols-5">
        {steps.map(([Icon, t, b, owner], i) => (
          <div key={t} className="relative border-t border-primary/40 py-6 pr-6">
            <div className="font-mono text-xs text-muted-foreground">0{i + 1} · <span className="text-primary">{owner}</span></div>
            <Icon className="mt-4 size-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function Modules() {
  const items = [
    [Workflow, "Dealership Board", "A live five-stage board for every rooftop, with a named owner on every task and flags for anything at risk."],
    [BadgeCheck, "Compliance engine", "ASIC extracts, 28-day RWC windows and state rules — checked, logged, provable."],
    [FileText, "Deal packs", "Consistent, pre-filled packs for sales, F&I, aftermarket and workshop."],
    [Gauge, "Command Center", "The first true end-to-end view of every vehicle, every owner and every delay — group-wide."],
    [Sparkles, "AI exception copilot", "Surfaces missing documents and F&I issues before they hold up a delivery."],
    [Building2, "Multi-rooftop", "Roles, permissions and reporting built for dealer groups from day one."],
  ] as const;
  return (
    <section className="border-t bg-background">
      <div className="showroom-band relative isolate overflow-hidden">
        <img src={showroomImage} alt="A modern dealership showroom with a vehicle and customer cafe lounge" loading="lazy" width={1536} height={1024} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="showroom-shade absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="font-mono text-xs text-primary-glow">MADE FOR YOUR WORLD</div>
          <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-tight sm:text-5xl">The floor is human.<br />The flow is intelligent.</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">From the showroom to the workshop, give your people more time for the moments that matter.</p>
        </div>
      </div>
      <div className="light-section bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrow="Platform" title="One platform. Every part of the deal." />
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {items.map(([Icon, t, b]) => (
            <div key={t} className="border-t py-8">
              <div className="grid size-10 place-items-center rounded-lg bg-accent"><Icon className="size-5 text-accent-foreground" /></div>
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    [Cloud, "Microsoft Azure, Australia East", "Your data never leaves Australia."],
    [KeyRound, "Azure Key Vault", "Hardware-backed secrets for signing and integrations."],
    [Lock, "Fail-closed access control", "Staff only see what their role allows — by default."],
    [Database, "Geo-redundant backups", "Managed PostgreSQL with point-in-time recovery."],
    [Server, "Microsoft Entra ID SSO", "Sign in with your dealer group's existing accounts."],
    [ShieldCheck, "Full audit trail", "Every check, edit and signature is recorded."],
  ] as const;
  return (
    <section id="security" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Trust & security</div>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Enterprise-grade from the first deal.</h2>
          <p className="mt-5 text-muted-foreground">Customer identity, finance and licence data deserve better than shared drives and email attachments. SynoraDrive is engineered in Melbourne on Microsoft's cloud, with every release passing 725 automated checks.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([Icon, t, b]) => (
            <div key={t} className="flex gap-4 rounded-xl border bg-card p-5">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary-glow" />
              <div><div className="font-semibold">{t}</div><div className="mt-1 text-sm text-muted-foreground">{b}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { n: "Core", s: "Single rooftop", p: "$1,490", u: "AUD / rooftop / mo", f: ["Contract of Sale PDF ingest", "Dealership Board & Deal Card", "Showroom & pre-delivery packs", "$0 balance settlement gate"], hi: false },
    { n: "Dealer Group", s: "3–10 rooftops", p: "$3,850", u: "AUD / group / mo", f: ["Automatic mailbox ingest", "AI OCR & licence parsing", "Automated ASIC verification", "DocuSign & Command Center"], hi: true },
    { n: "Enterprise", s: "10+ rooftops / OEM", p: "Custom", u: "Tailored agreement", f: ["Dedicated Azure environment", "Entra ID enterprise SSO", "Custom DMS connectors", "Available via Microsoft Marketplace"], hi: false },
  ];
  return (
    <section id="pricing" className="light-section mist-section border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <SectionHead eyebrow="Pricing" title="Simple per-rooftop licensing." body="No setup surprises. Onboarding and training included." />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.n} className={`relative rounded-2xl border p-8 ${t.hi ? "border-primary/60 bg-card shadow-elegant" : "bg-background"}`}>
              {t.hi && <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-primary-foreground">Most popular</span>}
              <div className="text-sm text-muted-foreground">{t.s}</div>
              <h3 className="mt-1 text-xl font-semibold">{t.n}</h3>
              <div className="mt-6 font-display text-4xl font-semibold">{t.p}</div>
              <div className="text-xs text-muted-foreground">{t.u}</div>
              <ul className="mt-8 space-y-3 text-sm">
                {t.f.map((f) => <li key={f} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />{f}</li>)}
              </ul>
              <a href="#demo" className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold transition ${t.hi ? "bg-brand text-primary-foreground" : "border hover:bg-secondary"}`}>
                {t.p === "Custom" ? "Talk to us" : "Book a demo"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-28">
      <div className="relative border-y px-2 py-16 text-center">
        <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold sm:text-5xl">Stop chasing vehicles.<br />Start seeing every delivery.</h2>
        <p className="relative mx-auto mt-5 max-w-xl text-muted-foreground">A 30-minute walkthrough using your own Contract of Sale.</p>
        <a href="mailto:hello@synoradrive.com.au" className="relative mt-9 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow">
          Book a rooftop demo <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row">
        <Logo />
        <div>© 2026 SynoraTech Pty Ltd · Melbourne, Australia</div>
        <div className="flex gap-6"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Security</a><a href="#" className="hover:text-foreground">Terms</a></div>
      </div>
    </footer>
  );
}
