import { useEffect, useRef, useState, type ReactNode } from "react";
import { Activity, ArrowUpRight, CheckCircle2, FileCheck2, Gauge, LockKeyhole, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DemoTab = "overview" | "documents" | "trade" | "workshop" | "activity" | "financials" | "audit";

export function LaptopShowcase({ children, openDeal, showExecutive, settled, settle }: {
  children: ReactNode;
  openDeal: (id: string, tab: DemoTab, target: HTMLButtonElement) => void;
  showExecutive: () => void;
  settled: boolean;
  settle: () => void;
}) {
  const device = useRef<HTMLDivElement>(null);
  const showcase = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const laptop = device.current;
    const root = showcase.current;
    if (!laptop || !root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    // Banner opacity is driven by scroll progress so the fade is always
    // visible on screen, not finished before the user scrolls to it.
    const updateReveal = () => {
      frame = 0;
      if (motion.matches) { root.style.setProperty("--reveal", "1"); return; }
      const rect = laptop.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.92 - rect.top) / (vh * 0.55)));
      root.style.setProperty("--reveal", progress.toFixed(3));
    };
    const requestReveal = () => { if (!frame) frame = requestAnimationFrame(updateReveal); };
    const observe = () => {
      observer?.disconnect();
      if (motion.matches || !window.IntersectionObserver) { setOpened(true); return; }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === laptop) setOpened(entry.isIntersecting);
        });
      }, { threshold: 0.12 });
      observer.observe(laptop);
    };
    observe();
    updateReveal();
    window.addEventListener("scroll", requestReveal, { passive: true });
    window.addEventListener("resize", requestReveal);
    motion.addEventListener("change", observe);
    motion.addEventListener("change", requestReveal);
    return () => {
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestReveal);
      window.removeEventListener("resize", requestReveal);
      motion.removeEventListener("change", observe);
      motion.removeEventListener("change", requestReveal);
    };
  }, []);
  const satellites = [
    { icon: Users, label: "Clear ownership", title: "Team Accountability", detail: "Know who owns the next step", tab: "overview" as const, body: <><div className="satellite-pills"><span>Workshop · Responsible</span><span>F&I · Accountable</span></div><p className="satellite-status">One deal. Every team connected.</p></> },
    { icon: FileCheck2, label: "From contract to handover", title: "Document Automation", detail: "Deal paperwork in one place", tab: "documents" as const, body: <ul className="satellite-checks"><li>Contract details captured</li><li>Deal documents prepared</li><li>Signatures tracked</li></ul> },
    { icon: LockKeyhole, label: "Delivery safeguards", title: "Compliance & Readiness", detail: "See what is ready and what is pending", tab: "workshop" as const, body: <><ul className="satellite-checks"><li>Customer checks visible</li><li>Vehicle preparation tracked</li></ul><p className="satellite-warning">Outstanding tasks stay with their owner</p></> },
    { icon: Gauge, label: "Command Report", title: "Forecast & Reporting", detail: "A clear view across your dealership", tab: null, body: <ul className="satellite-checks"><li>Delivery pipeline visibility</li><li>Month-end forecasting</li><li>Reporting across rooftops</li></ul> },
    { icon: Activity, label: "No more chasing", title: "Connected Communication", detail: "Every update stays with the deal", tab: "activity" as const, body: <ul className="satellite-checks"><li>Shared team updates</li><li>Clear next steps</li><li>A complete activity history</li></ul> },
  ];
  return <div className="laptop-showcase" data-open={opened}>
    <svg className="laptop-circuits" viewBox="0 0 1400 780" preserveAspectRatio="none" aria-hidden="true">
      {["M260 100 H370 V230 H470", "M260 350 H350 V390 H470", "M260 610 H370 V510 H470", "M1140 100 H1030 V230 H930", "M1140 350 H1050 V390 H930", "M1140 610 H1030 V510 H930"].map((d, i) => <g key={d} className={i % 2 ? "circuit-teal" : "circuit-violet"}><path d={d} /><circle cx={i < 3 ? 260 : 1140} cy={[100, 350, 610][i % 3]} r="4" /></g>)}
    </svg>
    <div ref={device} className="laptop-device">
      <div className="laptop-lid"><div className="laptop-camera" /><div className="laptop-display">{children}</div><div className="laptop-brand">Synora<span>Drive</span></div></div>
      <div className="laptop-deck"><div className="laptop-keyboard" /><div className="laptop-trackpad" /></div>
      <div className="laptop-edge" />
    </div>
    <div className="laptop-satellites">
      {satellites.map(({ icon: Icon, label, title, detail, tab, body }, i) => <Button key={label} variant="ghost" className={`glass-satellite satellite-${i}`} aria-haspopup={tab ? "dialog" : undefined} onClick={event => { if (tab) openDeal("DEMO-006", tab, event.currentTarget); else showExecutive(); }}>
        <span className="satellite-eyebrow"><Icon /><span>{label}</span><ArrowUpRight /></span>
        <span className="satellite-title">{title}</span><span className="satellite-detail">{detail}</span><div className="satellite-body">{body}</div>
      </Button>)}
      <article className="glass-satellite satellite-5">
        <Button variant="ghost" className="settlement-heading" aria-haspopup="dialog" onClick={event => openDeal("DEMO-001", "financials", event.currentTarget)}><span className="satellite-eyebrow"><Wallet /><span>Financial clarity</span><ArrowUpRight /></span><span className="satellite-title">Trade-in & Settlement</span><span className="satellite-detail">Trade-in, payout and balance together</span></Button>
        <ul className="satellite-checks satellite-body"><li>Trade-in allowance & payout</li><li>Deposits & remaining balance</li></ul>
        <Button variant="outline" className="satellite-settle" disabled={settled} onClick={settle}><CheckCircle2 />{settled ? "Settlement gate cleared" : "Simulate final $0 settlement"}</Button>
        <p role="status" className="satellite-status">{settled ? "Demo only · other delivery gates still apply" : "Demo only · no payment processed"}</p>
      </article>
    </div>
    <p className="showcase-caption"><span className="indicator-light" /> FICTIONAL DEMO DATA · SIMULATED ACTIONS · NO LIVE CONNECTIONS</p>
  </div>;
}