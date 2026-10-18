import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, Clock3, Lock, FileText, LayoutDashboard, BarChart3, Megaphone, AlertTriangle, Upload } from "lucide-react";

const stages = [
  { name: "In-Queue", owner: "Sales", count: 4, dot: "bg-primary-glow", deals: [
    { id: "D137879", name: "Blair Harvey", car: "BMW X5 xDrive30d", value: "$98,382", badge: "Held: Signed Order", extra: "" },
    { id: "D137044", name: "Tayla Erikozu", car: "BMW X2 sDrive20i", value: "$74,897", badge: "T-3", extra: "" },
  ] },
  { name: "Document Prep", owner: "Admin", count: 16, dot: "bg-primary", deals: [
    { id: "D137390", name: "Andrea J Rohr", car: "BMW X1 xDrive25e", value: "$81,700", badge: "14/14 Docs Generated", extra: "CASH" },
    { id: "D123022", name: "Tilt Tray Design Pty Ltd", car: "BMW X6", value: "$182,078", badge: "ASIC & PPSR Verified", extra: "" },
  ] },
  { name: "Finance & Approvals", owner: "F&I", count: 5, dot: "bg-warning", deals: [
    { id: "D137397", name: "Myra Faithful", car: "BMW iX1 xDrive30", value: "$80,350", badge: "NCCP Stips 11/12", extra: "Conditional" },
  ] },
  { name: "Workshop & PDI", owner: "Workshop", count: 3, dot: "bg-destructive", deals: [
    { id: "D137439", name: "Judy A Tullberg", car: "BMW X1 xDrive20i", value: "$73,000", badge: "VIC eRWC Clear", extra: "Needs Plate (T-1)" },
  ] },
  { name: "Ready for Delivery", owner: "Delivery", count: 2, dot: "bg-success", deals: [
    { id: "D137552", name: "Mansep Pty Ltd", car: "BMW M2 Coupé", value: "$98,500", badge: "$0 Balance Cleared", extra: "Bay 2 @ 2:00 PM" },
  ] },
];

function Board() {
  const [selectedId, setSelectedId] = useState("D137439");
  const selected = stages.flatMap(stage => stage.deals).find(deal => deal.id === selectedId);
  if (!selected) return null;
  const ready = selected.id === "D137552";
  return <>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border px-5 py-4">
      <div><h3 className="text-sm font-semibold">Dealership Board <span className="ml-2 font-mono text-[10px] text-muted-foreground">October · Week 3</span></h3><p className="mt-1 text-[11px] text-muted-foreground">30 active deals · 9 departments · sample data</p></div>
      <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><Upload className="size-3.5" /> Contract of Sale intake</span>
    </div>
    <div className="grid xl:grid-cols-[1fr_260px]">
      <div className="overflow-x-auto p-4" aria-label="Five-stage dealership board">
        <div className="grid min-w-[880px] grid-cols-5 gap-3">
          {stages.map((stage, index) => <div key={stage.name} className="min-h-[330px] border-t-2 border-surface-border bg-surface-muted p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold"><span className={`indicator-light size-1.5 shrink-0 rounded-full ${stage.dot} stage-light-${index}`} />{stage.name}</div>
            <div className="mt-1 mb-3 flex justify-between text-[10px] text-muted-foreground"><span>{stage.owner}</span><span>{stage.count}</span></div>
            {stage.deals.map(deal => <Button key={deal.id} variant="ghost" aria-pressed={selectedId === deal.id} onClick={() => setSelectedId(deal.id)} className={`mb-2 block h-auto w-full whitespace-normal rounded-md border bg-surface p-2.5 text-left hover:bg-accent ${selectedId === deal.id ? "border-primary ring-1 ring-primary/30" : "border-surface-border"}`}>
              <div className="font-mono text-[10px] text-primary">{deal.id}</div>
              <div className="mt-1 text-[11px] font-semibold">{deal.name}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">{deal.car}</div>
              <div className="mt-2 text-xs font-semibold">{deal.value}</div>
              <div className="mt-2 text-[9px] leading-relaxed text-primary">{deal.badge}</div>
              {deal.extra && <div className="mt-1 text-[9px] text-muted-foreground">{deal.extra}</div>}
            </Button>)}
          </div>)}
        </div>
      </div>
      <aside className="border-t border-surface-border p-5 xl:border-t-0 xl:border-l" aria-label="Deal Card inspector">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><FileText className="size-3.5" /> Deal Card</div>
        <h3 className="mt-3 text-sm font-semibold">{selected.name}</h3><p className="mt-1 font-mono text-[10px] text-primary">{selected.id}</p><p className="mt-1 text-xs text-muted-foreground">{selected.car}</p>
        <div className="mt-5 space-y-4 text-[11px] leading-relaxed">
          <div className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />Pentana COS & RedBook VIN parsed</div>
          <div className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />14 Statutory & Showroom PDFs generated</div>
          <div className="flex gap-2">{ready ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> : <Clock3 className="mt-0.5 size-4 shrink-0 text-warning" />}Finance settlement ($0 Rec Check)</div>
        </div>
        <div className="mt-5 border-t border-surface-border pt-4"><div className="flex items-center gap-2 text-[11px] text-muted-foreground"><Lock className="size-3.5" />Handover Gate</div><p className="mt-2 text-xs font-semibold">{ready ? "Cleared · Bay 2 @ 2:00 PM" : selected.id === "D137439" ? "Awaiting Plate Allocation" : "Awaiting Finance Settlement"}</p></div>
      </aside>
    </div>
  </>;
}

function ExecutiveLog() {
  const [requested, setRequested] = useState(false);
  return <div className="p-5 sm:p-7">
    <div className="flex flex-wrap justify-between gap-2"><h3 className="text-base font-semibold">Executive Sales Log & Quota Control</h3><span className="font-mono text-[10px] text-muted-foreground">OCTOBER 2026 · SAMPLE DATA</span></div>
    <div className="mt-6 border-y border-surface-border py-6">
      <div className="flex flex-wrap justify-between gap-2"><span className="text-[10px] font-semibold uppercase text-primary">Month-End Landing Strip</span><span className="text-xs font-semibold">OCTOBER QUOTA: 50 UNITS ($300k Gross)</span></div>
      <div className="mt-5 flex h-4 overflow-hidden rounded-sm bg-surface-muted" role="img" aria-label="14 delivered, 16 confirmed going out, 8 stretch or at-risk, 12 remaining of 50 units"><span className="w-[28%] bg-success" /><span className="w-[32%] bg-primary-glow" /><span className="w-[16%] bg-warning" /></div>
      <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-success" />14 Delivered ($89.4k)</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary-glow" />16 Confirmed Going Out ($98.2k)</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-warning" />8 Stretch / At-Risk ($50.8k)</span></div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-3"><div><div className="text-xs text-muted-foreground">Projected EOM Realistic</div><div className="mt-1 font-display text-3xl font-semibold">38 <span className="text-lg text-muted-foreground">/ 50 Units</span></div></div><div className="text-right"><div className="text-lg font-semibold">$238.4k Gross</div><div className="text-xs text-muted-foreground">$6,273 Combined PVR</div></div></div>
    </div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><h4 className="text-xs font-semibold">Multi-Rooftop EOM Realistic Call-In</h4><Button variant="outline" size="sm" onClick={() => setRequested(true)} disabled={requested} className="h-auto whitespace-normal text-left text-[11px]"><Megaphone className="size-3.5 shrink-0" />{requested ? "Sample requests sent" : "Request EOM Realistic from Rooftops"}</Button></div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">{[["Bundoora BMW", "Committed: 38/50", true], ["Doncaster BMW", "Awaiting SM Sign-Off: 41/45", false], ["MINI Garage", "Committed: 14/15", true]].map(([name, status, committed]) => <div key={String(name)} className="rounded-md border border-surface-border p-4"><div className="text-xs font-semibold">{name}</div><div className="mt-3 flex items-start gap-2 text-[11px]">{committed ? <CheckCircle2 className="size-3.5 shrink-0 text-success" /> : <Clock3 className="size-3.5 shrink-0 text-warning" />}{status}</div></div>)}</div>
    <p role="status" className="mt-2 min-h-4 text-[10px] text-muted-foreground">{requested ? "Demo only · Call-in requests simulated for all three rooftops." : ""}</p>
    <div className="mt-4 border-t border-surface-border pt-5"><div className="text-[10px] font-semibold uppercase text-muted-foreground">OEM Rebate Cliff</div><div className="mt-3 flex flex-wrap justify-between gap-4"><div className="flex items-start gap-2 text-sm font-semibold"><AlertTriangle className="size-4 shrink-0 text-warning" />8 New Units to Unlock $30,000 BMW Volume Bonus</div><div className="flex items-start gap-2 text-xs"><CheckCircle2 className="size-4 shrink-0 text-success" />$12,000 Captive Finance Tier Locked (71% Pen.)</div></div></div>
  </div>;
}

export function ProductPreview() {
  const [tab, setTab] = useState("board");
  return <Tabs value={tab} onValueChange={setTab}>
    <TabsList className="mb-5 grid h-auto w-full grid-cols-1 gap-1 p-1 sm:inline-flex sm:w-auto" aria-label="Platform preview">
      <TabsTrigger value="board" className="gap-2 whitespace-normal py-3 text-xs"><LayoutDashboard className="size-4 shrink-0" />Live Dealership Board (Frontline)</TabsTrigger>
      <TabsTrigger value="executive" className="gap-2 whitespace-normal py-3 text-xs"><BarChart3 className="size-4 shrink-0" />DP & GSM Executive Sales Log (Quota & Rebates)</TabsTrigger>
    </TabsList>
    <div className="overflow-hidden rounded-lg border bg-card p-2 shadow-elegant">
      <div className="flex items-center gap-1.5 px-3 py-3"><span className="size-2 rounded-full bg-muted" /><span className="size-2 rounded-full bg-muted" /><span className="size-2 rounded-full bg-muted" /><span className="ml-2 break-all font-mono text-[10px] text-muted-foreground">app.synoradrive.com.au/{tab === "board" ? "board" : "executive-doc"}</span></div>
      <div className="overflow-hidden rounded-md bg-surface text-surface-foreground"><TabsContent value="board" className="mt-0"><Board /></TabsContent><TabsContent value="executive" className="mt-0"><ExecutiveLog /></TabsContent></div>
    </div>
  </Tabs>;
}