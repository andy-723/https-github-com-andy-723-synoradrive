import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, CircleHelp, FileCheck2, Handshake, KeyRound, Landmark, Radio, Sparkles, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const departments = [
  { name: "Sales", Icon: Handshake, work: "Signed contract & customer details", detail: "The signed contract starts one shared deal record. Sales can see the next owner without chasing another department.", x: 24, y: 20 },
  { name: "Business Manager", Icon: Landmark, work: "Finance & approval gates", detail: "Finance and approval requirements stay attached to the deal, with ownership and outstanding gates visible to the team.", x: 76, y: 20 },
  { name: "Aftermarket", Icon: Sparkles, work: "Accessories & fitment", detail: "Accessory work moves alongside the rest of the deal. The team can see what is still required before the vehicle goes out.", x: 89, y: 50 },
  { name: "Workshop & PDI", Icon: Wrench, work: "Preparation & quality checks", detail: "Vehicle preparation and PDI checks have a clear owner. Sales and managers can see the work completed and what remains.", x: 76, y: 80 },
  { name: "Stock & registration", Icon: FileCheck2, work: "Vehicle records & plates", detail: "Stock and registration requirements stay in the same delivery workflow, so missing paperwork does not disappear into an email chain.", x: 24, y: 80 },
  { name: "Delivery", Icon: KeyRound, work: "Handover readiness", detail: "Delivery readiness brings the departments together. Outstanding work is visible before the customer arrives for their keys.", x: 11, y: 50 },
];

export function SynoraCnsSection() {
  const [selected, setSelected] = useState(0);
  const gradientId = useId().replace(/:/g, "");
  const active = departments[selected] ?? departments[0];
  if (!active) return null;
  return (
    <section className="cns-section overflow-hidden border-y bg-background text-foreground" aria-labelledby="cns-heading">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2 font-mono text-xs text-brand-mint"><Radio className="size-4" /> THE ORCHESTRATION LAYER</div>
          <h2 id="cns-heading" className="text-4xl font-semibold sm:text-5xl">SynoraCNS</h2>
          <p className="mt-3 text-xl sm:text-2xl">The central nervous system of your dealership.</p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">Not another department. The connection between all of them. One shared deal, clear ownership and work moving in parallel—from signed contract to customer keys.</p>
        </Reveal>
        <div className="cns-network mt-12">
          <svg className="cns-wiring" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id={gradientId}><stop stopColor="var(--brand-mint)" /><stop offset="1" stopColor="var(--brand-violet)" /></linearGradient></defs>
            <ellipse cx="500" cy="300" rx="390" ry="210" className="cns-orbit-path" />
            {departments.map((d, i) => <g key={d.name} data-connected={selected === i}>
              <path d={`M 500 300 Q ${d.x * 10} 300 ${d.x * 10} ${d.y * 6}`} className="cns-wire" stroke={`url(#${gradientId})`} />
              <path d={`M 500 300 Q ${d.x * 10} 300 ${d.x * 10} ${d.y * 6}`} className={`cns-signal cns-signal-${i}`} stroke={`url(#${gradientId})`} />
            </g>)}
          </svg>
          <div className="cns-core"><div className="cns-core-ring" aria-hidden="true" /><Radio className="size-8 text-brand-mint" /><span className="mt-3 text-xl font-semibold">Synora<span className="text-brand-mint">CNS</span></span><span className="mt-2 font-mono text-xs text-muted-foreground">ONE DEAL · EVERY OWNER</span></div>
          {departments.map(({ name, Icon, work }, i) => <Button key={name} variant="ghost" className={`cns-node cns-node-${i}`} aria-pressed={selected === i} aria-controls="cns-department-detail" onClick={() => setSelected(i)}><span className="cns-node-icon"><Icon className="size-5" /></span><span className="cns-node-name">{name}</span><span className="cns-node-work">{work}</span></Button>)}
        </div>
        <div id="cns-department-detail" className="cns-detail mx-auto mt-6 max-w-3xl border-t pt-6" aria-live="polite" aria-atomic="true">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-mint"><active.Icon className="size-4" />{active.name}<ArrowRight className="size-4" />{active.work}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.detail}</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">{["Who owns the next move", "What has been completed", "What is holding delivery back"].map(text => <span key={text} className="flex items-center gap-2"><Check className="size-4 text-brand-mint" />{text}</span>)}</div>
      </div>
    </section>
  );
}

const milestones = [
  { title: "Contract signed", owner: "Sales", message: "Your journey begins.", Icon: Handshake },
  { title: "Finance & approvals", owner: "Business Manager", message: "Requirements in view.", Icon: Landmark },
  { title: "Vehicle preparation", owner: "Workshop & PDI", message: "Preparation has an owner.", Icon: Wrench },
  { title: "Ready for handover", owner: "Delivery team", message: "The next step is clear.", Icon: KeyRound },
];

export function DeliveryVisibilitySection() {
  const [connected, setConnected] = useState(true);
  // Auto-alternate between the two views every 4s. Manual clicks restart the
  // timer so a chosen view stays on screen for a full cycle. Paused while the
  // section is off-screen or the document is hidden, and skipped entirely for
  // reduced-motion users.
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setConnected(value => !value), 4000);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry ? entry.isIntersecting : false;
      if (inView && !document.hidden) startTimer();
      else if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, { threshold: 0.25 });
    const node = sectionRef.current;
    if (node) observer.observe(node);
    const onVisibility = () => {
      if (document.hidden || !inView) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else startTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const chooseView = (value: boolean) => {
    setConnected(value);
    startTimer();
  };

  return (
    <section ref={sectionRef} className="light-section mist-section overflow-hidden border-y bg-background text-foreground" aria-labelledby="blackhole-heading">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div><div className="font-mono text-xs text-primary">FROM SILENCE TO SIGHTLINE</div><h2 id="blackhole-heading" className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">End the delivery<br />“black hole”.</h2></div>
          <p className="max-w-lg leading-relaxed text-muted-foreground">The buyer has signed. But who is working on the car? What is done? What is next? Replace the silence between sale and delivery with a shared view your team can act on—and a clearer answer for your customer.</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b pb-5">
          <div className="flex gap-1 rounded-md border bg-card p-1" role="group" aria-label="Delivery visibility comparison">
            <Button variant={connected ? "ghost" : "secondary"} aria-pressed={!connected} onClick={() => chooseView(false)}>The old hand-off</Button>
            <Button variant={connected ? "secondary" : "ghost"} aria-pressed={connected} onClick={() => chooseView(true)}>With SynoraDrive</Button>
          </div>
          <span className="font-mono text-xs text-muted-foreground">ILLUSTRATIVE DELIVERY JOURNEY</span>
        </div>
        <div className="visibility-journey relative mt-10" data-connected={connected}>
          <div className="visibility-line" aria-hidden="true" />
          {!connected && <div className="visibility-void" aria-hidden="true"><CircleHelp className="size-8" /></div>}
          <div className="relative grid gap-6 md:grid-cols-4">
            {milestones.map(({ title, owner, message, Icon }, i) => <div key={title} className={`visibility-stop visibility-stop-${i}`}>
              <div className="visibility-marker"><Icon className="size-6" /></div>
              <div className="mt-5 font-mono text-xs text-muted-foreground">0{i + 1}</div>
              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-primary">{connected ? owner : i === 0 ? "Sales" : "Who owns this?"}</p>
              <p className="mt-3 text-sm text-muted-foreground">{connected ? message : i === 0 ? "Contract handed over." : "Another call. Another email."}</p>
            </div>)}
          </div>
        </div>
        <div className="mt-10 flex items-start gap-3 border-t pt-6" aria-live="polite"><Radio className="mt-0.5 size-5 shrink-0 text-primary" /><p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{connected ? "A dealer principal or sales manager can see the whole journey. The team knows who owns the work, so customer conversations start with an answer—not another chase." : "Email chains and the pretty spreadsheet leave gaps between departments. The customer asks for an update, and sales has to chase the answer."}</p></div>
      </div>
    </section>
  );
}