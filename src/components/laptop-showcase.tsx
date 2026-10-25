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
  const frame = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) { setOpened(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setOpened(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const satellites = [
    { icon: Users, label: "Live project · RACI owner", title: "Jordan Riley", detail: "DEMO-006 · BMW X1 xDrive20i · $72,600", tab: "overview" as const, body: <><div className="satellite-pills"><span>R · Riley / Workshop</span><span>A · Avery / F&I gate</span></div><p className="satellite-status">VIC eRWC clear · Needs plate (T−1)</p></> },
    { icon: FileCheck2, label: "DMS → Deal pack", title: "14/14 documents generated", detail: "Statutory & showroom PDFs", tab: "documents" as const, body: <ul className="satellite-checks"><li>Pentana / eraPower contract parsed</li><li>VicRoads transfer & ASIC extract</li><li>ACCC notice & DocuSign sent</li></ul> },
    { icon: LockKeyhole, label: "Compliance gate", title: "Handover held", detail: "Outstanding checks stay visible", tab: "workshop" as const, body: <><ul className="satellite-checks"><li>Customer ID & PPSR verified</li><li>PDI & detailing complete</li></ul><p className="satellite-warning">Pending · NCCP stip & plate allocation</p></> },
    { icon: Gauge, label: "DP / GSM · Month-end", title: "38 / 50 units", detail: "$238.4k projected gross", tab: null, body: <><div className="satellite-progress"><span /></div><p className="satellite-warning">8 units to unlock $30,000 BMW bonus</p><p className="satellite-status">$12k finance tier locked · 71%</p></> },
    { icon: Activity, label: "Zero chasing · Activity", title: "One conversation, on-deal", detail: "Cross-department activity stream", tab: "activity" as const, body: <div className="satellite-feed"><p><time>09:10</time> Morgan · Signed contract</p><p><time>09:25</time> Avery · Trade payout verified</p><p><time>10:40</time> Riley · PDI completed</p></div> },
  ];
  return <div ref={frame} className="laptop-showcase" data-open={opened}>
    <svg className="laptop-circuits" viewBox="0 0 1400 780" preserveAspectRatio="none" aria-hidden="true">
      {["M260 100 H370 V230 H470", "M260 350 H350 V390 H470", "M260 610 H370 V510 H470", "M1140 100 H1030 V230 H930", "M1140 350 H1050 V390 H930", "M1140 610 H1030 V510 H930"].map((d, i) => <g key={d} className={i % 2 ? "circuit-teal" : "circuit-violet"}><path d={d} /><circle cx={i < 3 ? 260 : 1140} cy={[100, 350, 610][i % 3]} r="4" /></g>)}
    </svg>
    <div className="laptop-device">
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
        <Button variant="ghost" className="settlement-heading" aria-haspopup="dialog" onClick={event => openDeal("DEMO-001", "financials", event.currentTarget)}><span className="satellite-eyebrow"><Wallet /><span>Vehicle settlement</span><ArrowUpRight /></span><span className="satellite-title">{settled ? "$0 balance cleared" : "$86,100 balance due"}</span><span className="satellite-detail">Alex Morgan · BMW X5 · DEMO-001</span></Button>
        <dl className="satellite-finances"><div><dt>Vehicle price</dt><dd>$102,900</dd></div><div><dt>VW Golf trade-in</dt><dd>− $18,500</dd></div><div><dt>Payout / Deposit</dt><dd>+ $4,200 / − $2,500</dd></div></dl>
        <Button variant="outline" className="satellite-settle" disabled={settled} onClick={settle}><CheckCircle2 />{settled ? "Settlement gate cleared" : "Simulate final $0 settlement"}</Button>
        <p role="status" className="satellite-status">{settled ? "Demo only · other delivery gates still apply" : "Demo only · no payment processed"}</p>
      </article>
    </div>
    <p className="showcase-caption"><span className="indicator-light" /> FICTIONAL DEMO DATA · SIMULATED ACTIONS · NO LIVE CONNECTIONS</p>
  </div>;
}