import { useRef, useState } from "react";
import { DemoDealDialog } from "@/components/demo-deal-dialog";
import { LaptopShowcase, type DemoTab } from "@/components/laptop-showcase";
import type { DemoDeal } from "@/lib/demo-deal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, Clock3, Lock, FileText, LayoutDashboard, BarChart3, Megaphone, AlertTriangle, Upload, Users } from "lucide-react";

const stages = [
  { name: "In-Queue", owner: "Sales", count: 4, dot: "bg-brand-sky", deals: [
    { id: "DEMO-001", name: "Alex Morgan", car: "BMW X5 xDrive30d", value: "$102,900", badge: "Held: Signed Order", extra: "" },
    { id: "DEMO-002", name: "Jamie Parker", car: "BMW X2 sDrive20i", value: "$76,400", badge: "T-3", extra: "" },
  ] },
  { name: "Document Prep", owner: "Admin", count: 16, dot: "bg-primary", deals: [
    { id: "DEMO-003", name: "Taylor Bennett", car: "BMW X1 xDrive25e", value: "$83,200", badge: "14/14 Docs Generated", extra: "CASH" },
    { id: "DEMO-004", name: "Example Fleet Co.", car: "BMW X6", value: "$165,500", badge: "ASIC & PPSR Verified", extra: "" },
  ] },
  { name: "Finance & Approvals", owner: "F&I", count: 5, dot: "bg-brand-violet", deals: [
    { id: "DEMO-005", name: "Casey Ellis", car: "BMW iX1 xDrive30", value: "$86,800", badge: "NCCP Stips 11/12", extra: "Conditional" },
  ] },
  { name: "Workshop & PDI", owner: "Workshop", count: 3, dot: "bg-brand-sky", deals: [
    { id: "DEMO-006", name: "Jordan Riley", car: "BMW X1 xDrive20i", value: "$72,600", badge: "VIC eRWC Clear", extra: "Needs Plate (T-1)" },
  ] },
  { name: "Ready for Delivery", owner: "Delivery", count: 2, dot: "bg-brand-mint", deals: [
    { id: "DEMO-007", name: "Example Studio Co.", car: "BMW M2 Coupé", value: "$109,900", badge: "$0 Balance Cleared", extra: "Bay 2 @ 2:00 PM" },
  ] },
];

const raciRoles = [
  ["Sales", "GSM", "F&I", "Admin"],
  ["Admin", "Stock Control", "Sales", "F&I"],
  ["F&I", "Business Manager", "Sales Manager", "Admin"],
  ["Workshop", "Service Manager", "Registration", "Sales"],
  ["Delivery", "Handover Manager", "F&I", "Sales"],
];

function Board({ selectedId, openDeal, raci, settledIds }: { selectedId: string; openDeal: (id: string, tab: DemoTab, target: HTMLButtonElement) => void; raci: boolean; settledIds: string[] }) {
  const selected = stages.flatMap(stage => stage.deals).find(deal => deal.id === selectedId);
  if (!selected) return null;
  const ready = selected.id === "DEMO-007";
  const settled = settledIds.includes(selected.id);
  return <>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border px-5 py-4">
      <div><h3 className="text-sm font-semibold">Dealership Board <span className="ml-2 font-mono text-[10px] text-muted-foreground">October · Week 3</span></h3><p className="mt-1 text-[11px] text-muted-foreground">30 active deals · 9 departments · fictional demo data</p></div>
      <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><Upload className="size-3.5" /> Contract of Sale intake</span>
    </div>
    <div className="raci-pipeline" aria-label="RACI ownership pipeline">Sales (R) <span>→</span> Admin (R) <span>→</span> F&I Business Manager (A) <span>→</span> Workshop PDI (R) <span>→</span> Delivery Handover (A)</div>
    <div className="preview-board-layout">
      <div className="overflow-x-auto p-4" aria-label="Five-stage dealership board">
        <div className="grid min-w-[880px] grid-cols-5 gap-3">
          {stages.map((stage, index) => <div key={stage.name} className="min-h-[330px] border-t-2 border-surface-border bg-surface-muted p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold"><span className={`indicator-light size-1.5 shrink-0 rounded-full ${stage.dot} stage-light-${index}`} />{stage.name}</div>
            <div className="mt-1 mb-3 flex justify-between text-[10px] text-muted-foreground"><span>{stage.owner}</span><span>{stage.count}</span></div>
            {raci && <dl className="raci-column" aria-label={`${stage.name} RACI roles`}>{raciRoles[index]?.map((owner, roleIndex) => <div key={owner}><dt>{["R", "A", "C", "I"][roleIndex]}</dt><dd>{owner}</dd></div>)}</dl>}
            {stage.deals.map(deal => <Button key={deal.id} variant="ghost" aria-haspopup="dialog" aria-pressed={selectedId === deal.id} onClick={event => openDeal(deal.id, "overview", event.currentTarget)} className={`mb-2 block h-auto min-h-11 w-full whitespace-normal rounded-md border bg-surface p-2.5 text-left hover:bg-accent ${selectedId === deal.id ? "border-primary ring-1 ring-primary/30" : "border-surface-border"}`}>
              <div className="font-mono text-[10px] text-primary">{deal.id}</div>
              <div className="mt-1 text-[11px] font-semibold">{deal.name}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">{deal.car}</div>
              <div className="mt-2 text-xs font-semibold">{deal.value}</div>
              <div className="mt-2 rounded-sm bg-accent px-1.5 py-1 text-[9px] leading-relaxed text-accent-foreground">{settledIds.includes(deal.id) ? "$0 Balance Cleared" : deal.badge}</div>
              {deal.extra && <div className="mt-1 text-[9px] text-muted-foreground">{deal.extra}</div>}
            </Button>)}
          </div>)}
        </div>
      </div>
      <aside className="preview-inspector border-t border-surface-border p-5" aria-label="Deal Card inspector">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><FileText className="size-3.5" /> Deal Card</div>
        <h3 className="mt-3 text-sm font-semibold">{selected.name}</h3><p className="mt-1 font-mono text-[10px] text-primary">{selected.id}</p><p className="mt-1 text-xs text-muted-foreground">{selected.car}</p>
        <div className="mt-5 space-y-4 text-[11px] leading-relaxed">
          <div className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />Pentana Contract of Sale parsed</div>
          <div className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />14 Statutory & Showroom PDFs generated</div>
          <div className="flex gap-2">{settled ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> : <Clock3 className="mt-0.5 size-4 shrink-0 text-warning" />}Finance settlement ({settled ? "$0 cleared" : "$0 Rec Check"})</div>
        </div>
        <div className="mt-5 border-t border-surface-border pt-4"><div className="flex items-center gap-2 text-[11px] text-muted-foreground"><Lock className="size-3.5" />Handover Gate</div><p className="mt-2 text-xs font-semibold">{ready ? "Cleared · Bay 2 @ 2:00 PM" : selected.id === "DEMO-006" ? "Awaiting Plate Allocation" : settled ? "Settlement cleared · other gates pending" : "Awaiting Finance Settlement"}</p></div>
      </aside>
    </div>
  </>;
}

function ExecutiveLog() {
  const [requested, setRequested] = useState(false);
  return <div className="p-5 sm:p-7">
    <div className="flex flex-wrap justify-between gap-2"><h3 className="text-base font-semibold">Executive Sales Log & Quota Control</h3><span className="font-mono text-[10px] text-muted-foreground">OCTOBER 2026 · FICTIONAL DEMO DATA</span></div>
    <div className="mt-6 border-y border-surface-border py-6">
      <div className="flex flex-wrap justify-between gap-2"><span className="text-[10px] font-semibold uppercase text-primary">Month-End Landing Strip</span><span className="text-xs font-semibold">OCTOBER QUOTA: 50 UNITS ($300k Gross)</span></div>
      <div className="mt-5 flex h-4 overflow-hidden rounded-sm bg-surface-muted" role="img" aria-label="14 delivered, 16 confirmed going out, 8 stretch or at-risk, 12 remaining of 50 units"><span className="w-[28%] bg-brand-mint" /><span className="w-[32%] bg-brand-sky" /><span className="w-[16%] bg-brand" /></div>
      <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-brand-mint" />14 Delivered ($89.4k)</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-brand-sky" />16 Confirmed Going Out ($98.2k)</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-brand" />8 Stretch / At-Risk ($50.8k)</span></div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-3"><div><div className="text-xs text-muted-foreground">Projected EOM Realistic</div><div className="mt-1 font-display text-3xl font-semibold">38 <span className="text-lg text-muted-foreground">/ 50 Units</span></div></div><div className="text-right"><div className="text-lg font-semibold">$238.4k Gross</div><div className="text-xs text-muted-foreground">$6,273 Combined PVR</div></div></div>
    </div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><h4 className="text-xs font-semibold">Multi-Rooftop EOM Realistic Call-In</h4><Button variant="outline" size="sm" onClick={() => setRequested(true)} disabled={requested} className="h-auto whitespace-normal text-left text-[11px]"><Megaphone className="size-3.5 shrink-0" />{requested ? "Sample requests sent" : "Request EOM Realistic from Rooftops"}</Button></div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">{[["Demo Motors · North", "Committed: 38/50", true], ["Demo Motors · East", "Awaiting SM Sign-Off: 41/45", false], ["Demo Motors · City", "Committed: 14/15", true]].map(([name, status, committed]) => <div key={String(name)} className="rounded-md border border-surface-border p-4"><div className="text-xs font-semibold">{name}</div><div className="mt-3 flex items-start gap-2 text-[11px]">{committed ? <CheckCircle2 className="size-3.5 shrink-0 text-success" /> : <Clock3 className="size-3.5 shrink-0 text-warning" />}{status}</div></div>)}</div>
    <p role="status" className="mt-2 min-h-4 text-[10px] text-muted-foreground">{requested ? "Demo only · Call-in requests simulated for all three rooftops." : ""}</p>
    <div className="mt-4 border-t border-surface-border pt-5"><div className="text-[10px] font-semibold uppercase text-muted-foreground">OEM Rebate Cliff</div><div className="mt-3 flex flex-wrap justify-between gap-4"><div className="flex items-start gap-2 text-sm font-semibold"><AlertTriangle className="size-4 shrink-0 text-warning" />8 New Units to Unlock $30,000 BMW Volume Bonus</div><div className="flex items-start gap-2 text-xs"><CheckCircle2 className="size-4 shrink-0 text-success" />$12,000 Captive Finance Tier Locked (71% Pen.)</div></div></div>
  </div>;
}

export function ProductPreview() {
  const [tab, setTab] = useState("board");
  const [raci, setRaci] = useState(false);
  const [selectedId, setSelectedId] = useState("DEMO-006");
  const [openDeal, setOpenDeal] = useState<DemoDeal | null>(null);
  const [initialTab, setInitialTab] = useState<DemoTab>("overview");
  const [settledIds, setSettledIds] = useState(["DEMO-007"]);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const open = (id: string, destination: DemoTab, target: HTMLButtonElement) => {
    const deal = stages.flatMap(stage => stage.deals).find(item => item.id === id);
    if (!deal) return;
    returnFocus.current = target;
    setSelectedId(id); setInitialTab(destination); setOpenDeal(deal);
  };
  const settle = (id: string) => setSettledIds(ids => ids.includes(id) ? ids : [...ids, id]);
  return <Tabs value={tab} onValueChange={setTab} className="product-laptop-preview">
    <div className="showcase-controls">
    <TabsList className="showcase-tabs grid h-auto w-full grid-cols-1 gap-1 p-1 sm:inline-flex sm:w-auto" aria-label="Platform preview">
      <TabsTrigger value="board" className="brand-preview-tab gap-2 whitespace-normal py-3 text-xs"><LayoutDashboard className="size-4 shrink-0" />Live Dealership Board (Frontline RACI Kanban)</TabsTrigger>
      <TabsTrigger value="executive" className="brand-preview-tab gap-2 whitespace-normal py-3 text-xs"><BarChart3 className="size-4 shrink-0" />DP & GSM Executive Sales Log (Quota & Rebates)</TabsTrigger>
    </TabsList>
    <Button variant="outline" className="raci-toggle min-h-11 whitespace-normal text-xs" aria-pressed={raci} onClick={() => { setRaci(value => !value); setTab("board"); }}><Users className="size-4" />RACI Accountability Matrix Overlay</Button>
    </div>
    <LaptopShowcase openDeal={open} showExecutive={() => setTab("executive")} settled={settledIds.includes("DEMO-001")} settle={() => { setSelectedId("DEMO-001"); settle("DEMO-001"); }}>
      <div className="light-section h-full bg-surface text-surface-foreground">
        <div className="laptop-browser"><span /><span /><span /><div>app.synoradrive.com.au/{tab === "board" ? "board" : "executive-doc"}</div><Lock className="size-3" /></div>
        <TabsContent value="board" className="mt-0"><Board selectedId={selectedId} openDeal={open} raci={raci} settledIds={settledIds} /></TabsContent><TabsContent value="executive" className="mt-0"><ExecutiveLog /></TabsContent>
      </div>
    </LaptopShowcase>
    <DemoDealDialog deal={openDeal} initialTab={initialTab} settled={openDeal ? settledIds.includes(openDeal.id) : false} onSettle={() => { if (openDeal) settle(openDeal.id); }} onClose={() => setOpenDeal(null)} onReturnFocus={() => returnFocus.current?.focus({ preventScroll: true })} />
  </Tabs>;
}