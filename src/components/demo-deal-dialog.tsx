import { useRef, useState } from "react";
import { Car, CheckCircle2, Clock3, FileText, ShieldCheck, User, Wallet, Wrench, Activity, ArrowRight, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { demoRecord, settlementBalance, type DemoDeal } from "@/lib/demo-deal";
import type { DemoTab } from "@/components/laptop-showcase";

const money = (value: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value);
const tabs = [
  ["overview", "Overview", User], ["documents", "Document Vault", FileText],
  ["workshop", "PDI & Workshop", Wrench], ["trade", "Vehicle Prep", Car],
  ["activity", "Activity Feed", Activity], ["financials", "Financials", Wallet],
  ["audit", "Audit Trail", ShieldCheck],
] as const;

function Field({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-md border border-surface-border bg-surface-muted p-3"><dt className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-xs font-medium leading-relaxed">{value}</dd></div>;
}

function Checklist({ items }: { items: string[] }) {
  return <ul className="divide-y divide-border">{items.map(item => <li key={item} className="flex items-start gap-3 py-4 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />{item}</li>)}</ul>;
}

export function DemoDealDialog({ deal, onClose, onReturnFocus, initialTab = "overview", settled, onSettle }: { deal: DemoDeal | null; onClose: () => void; onReturnFocus: () => void; initialTab?: DemoTab; settled?: boolean; onSettle?: () => void }) {
  return <Dialog open={deal !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent onCloseAutoFocus={event => { event.preventDefault(); onReturnFocus(); }} className="light-section flex max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-6xl flex-col gap-0 overflow-hidden rounded-lg bg-background p-0 text-foreground [&>button]:z-10 [&>button]:grid [&>button]:size-9 [&>button]:place-items-center [&>button]:bg-background">
      {deal && <DealRecord key={`${deal.id}-${initialTab}`} deal={deal} initialTab={initialTab} sharedSettled={settled} onSettle={onSettle} />}
    </DialogContent>
  </Dialog>;
}

function DealRecord({ deal, initialTab, sharedSettled, onSettle }: { deal: DemoDeal; initialTab: DemoTab; sharedSettled: boolean | undefined; onSettle: (() => void) | undefined }) {
  const record = demoRecord(deal);
  const [localSettled, setSettled] = useState(deal.id === "DEMO-007");
  const settled = sharedSettled ?? localSettled;
  const balance = settlementBalance(record.price, record.allowance, record.payout, record.deposit);
  const [tab, setTab] = useState<string>(initialTab);
  const scrollArea = useRef<HTMLDivElement | null>(null);
  const changeTab = (value: string) => {
    setTab(value);
    if (scrollArea.current) scrollArea.current.scrollTop = 0;
  };
  const settlement = <section aria-label="Vehicle settlement" className="border-l-2 border-success bg-success/5 p-4">
    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-success"><Wallet className="size-4" />Vehicle settlement</h3>
    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">Reconciliation check · $0 required before handover</p>
    <dl className="mt-4 space-y-3 text-xs">
      {[["Vehicle price", money(record.price)], ["Trade-in allowance", `− ${money(record.allowance)}`], ["Trade-in payout owing", `+ ${money(record.payout)}`], ["Deposit received", `− ${money(record.deposit)}`], ...(settled ? [["Final settlement", `− ${money(balance)}`]] : [])].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt>{label}</dt><dd className="shrink-0 font-semibold">{value}</dd></div>)}
      <div className="flex justify-between gap-4 border-t border-success/30 pt-3 font-semibold"><dt>Balance due</dt><dd>{money(settled ? 0 : balance)}</dd></div>
    </dl>
    <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed">{settled ? <CheckCircle2 className="size-4 shrink-0 text-success" /> : <Lock className="size-4 shrink-0 text-warning" />}<span>{settled ? "Settlement check cleared · other delivery gates still apply" : "Handover held · settlement outstanding"}</span></div>
    <Button variant="outline" size="sm" className="mt-4 h-auto min-h-11 w-full whitespace-normal" disabled={settled} onClick={() => { setSettled(true); onSettle?.(); }}><Wallet className="size-4 shrink-0" />{settled ? "Sample settlement recorded" : "Simulate final settlement"}</Button>
    <p role="status" className="mt-2 text-[10px] text-muted-foreground">{settled ? "Demo only · no payment processed." : "Simulated actions only · no payment processing."}</p>
  </section>;

  return <>
    <div className="shrink-0 bg-accent px-4 py-2 text-center text-[10px] font-semibold text-accent-foreground sm:px-6">SAMPLE · Fictional demo data · Not a real customer or transaction</div>
    <div className="shrink-0 border-b px-5 py-5 pr-16 sm:px-7">
      <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-primary"><span>{deal.id}</span><span>· {record.customerNumber}</span><span className="rounded-sm bg-accent px-2 py-1 text-accent-foreground">{deal.badge}</span></div>
      <DialogTitle className="text-xl leading-snug">{deal.name}</DialogTitle>
      <DialogDescription className="mt-2 text-xs">{deal.car} · {deal.value} · Demo Motors</DialogDescription>
    </div>
    <Tabs value={tab} onValueChange={changeTab} className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 overflow-x-auto border-b px-3 sm:px-5">
        <TabsList aria-label="Deal record tabs" className="h-auto w-max justify-start gap-1 rounded-none bg-transparent py-2">{tabs.map(([value, label, Icon]) => <TabsTrigger key={value} value={value} className="brand-preview-tab min-h-11 gap-2 text-xs"><Icon className="size-3.5" />{label}</TabsTrigger>)}</TabsList>
      </div>
      <div ref={scrollArea} className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
        <TabsContent value="overview" className="mt-0">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <ul aria-label="Platform highlights" className="grid gap-2 sm:grid-cols-2">
                {["DMS Contract of Sale Parsed (OCR + AcroForm Engine)", "Showroom & Pre-Delivery PDF Packs Prepared for Staff Check", "Status Checker: SALES → F&I → AFTERMARKET → WORKSHOP → REGO → PD", "Vehicle Settlement Gate: Mandatory $0 Balance Due Reconciliation Before Handover"].map((item) => (
                  <li key={item} className="flex gap-2 rounded-md border bg-accent/30 px-3 py-2 text-[11px] font-medium"><ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />{item}</li>
                ))}
              </ul>
              <section><h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><User className="size-4" />Customer</h3><dl className="grid gap-3 sm:grid-cols-2"><Field label="Name" value={deal.name} /><Field label="Mobile" value={record.mobile} /><Field label="Email" value={record.email} /><Field label="Address" value={record.address} /></dl></section>
              <section><h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><Car className="size-4" />Vehicle</h3><dl className="grid gap-3 sm:grid-cols-2"><Field label="Make / model" value={deal.car} /><Field label="Colour" value={record.colour} /><Field label="Stock number" value={record.stockNumber} /><Field label="VIN · sample identifier" value={record.vin} /></dl></section>
              <section className="border-t pt-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-semibold">Trade-in attached</h3><p className="mt-1 text-xs text-muted-foreground">{record.trade.car} · {record.trade.kms}</p></div><Button variant="outline" size="sm" onClick={() => changeTab("trade")}>View trade-in <ArrowRight className="size-4" /></Button></div><div className="mt-4 grid grid-cols-2 gap-4 text-xs"><div><p className="text-muted-foreground">Allowance</p><p className="mt-1 font-semibold">{money(record.allowance)}</p></div><div><p className="text-muted-foreground">Payout owing</p><p className="mt-1 font-semibold">{money(record.payout)}</p></div></div></section>
            </div>
            <aside className="space-y-5"><div><h3 className="text-xs font-semibold uppercase text-muted-foreground">Work ownership</h3><p className="mt-2 text-sm font-semibold">{record.owner}</p><p className="mt-1 text-xs text-muted-foreground">Sales → Admin → F&I → Workshop → Delivery</p></div>{settlement}</aside>
          </div>
        </TabsContent>
        <TabsContent value="trade" className="mt-0"><div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]"><section><div className="mb-5 flex items-center gap-3"><div className="grid size-12 place-items-center rounded-md bg-accent text-primary"><Car className="size-6" /></div><div><h3 className="text-base font-semibold">{record.trade.car}</h3><p className="mt-1 text-xs text-muted-foreground">Trade-in · fictional vehicle record</p></div></div><dl className="grid gap-3 sm:grid-cols-2"><Field label="Colour" value={record.trade.colour} /><Field label="Odometer" value={record.trade.kms} /><Field label="Registration · sample" value={record.trade.registration} /><Field label="VIN · sample" value={record.trade.vin} /><Field label="Trade-in allowance" value={money(record.allowance)} /><Field label="Finance payout owing" value={money(record.payout)} /><Field label="Net trade-in equity" value={money(record.allowance - record.payout)} /><Field label="Personalised plates" value="Retained by customer · sample instruction" /></dl><h4 className="mt-6 text-xs font-semibold uppercase text-muted-foreground">Trade-in checklist</h4><Checklist items={["Vehicle appraisal recorded · Morgan Sample", "PPSR certificate attached · sample document", "Finance payout statement checked · Avery Sample"]} /></section><aside>{settlement}</aside></div></TabsContent>
        <TabsContent value="documents" className="mt-0"><h3 className="text-base font-semibold">Document Vault</h3><Checklist items={["Contract of Sale · sample PDF", "Customer identity verification · sample record", "Trade-in appraisal · sample PDF", "PPSR certificate · sample PDF", "Finance payout statement · sample PDF"]} /><p className="text-xs text-muted-foreground">Sample records only · no customer files are stored in this preview.</p></TabsContent>
        <TabsContent value="workshop" className="mt-0"><h3 className="text-base font-semibold">PDI & Workshop</h3><Checklist items={["Pre-delivery inspection complete · Riley Sample", "Accessories fitted · Riley Sample", "Detailing complete · Taylor Sample"]} /><div className="flex items-center gap-3 py-4 text-sm"><Clock3 className="size-4 text-warning" />Plate allocation pending · Registration</div></TabsContent>
        <TabsContent value="activity" className="mt-0"><h3 className="text-base font-semibold">Activity Feed</h3><Checklist items={["09:10 · Morgan Sample added the signed order", "09:25 · Avery Sample prepared the document pack", "10:40 · Avery Sample recorded the trade-in payout", ...(settled ? ["Just now · Sample final settlement recorded (simulated)"] : [])]} /></TabsContent>
        <TabsContent value="financials" className="mt-0"><div className="mx-auto max-w-lg">{settlement}</div></TabsContent>
        <TabsContent value="audit" className="mt-0"><h3 className="text-base font-semibold">Audit Trail</h3><Checklist items={[`${deal.id} · Sample deal created by Morgan Sample`, "Trade-in allowance approved by Quinn Sample · Sales Manager", "Finance payout verified by Avery Sample · F&I"]} /><p className="text-xs text-muted-foreground">Fictional activity log · no live systems connected.</p></TabsContent>
      </div>
    </Tabs>
  </>;
}