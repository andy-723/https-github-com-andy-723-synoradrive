import { useEffect, useRef, useState, type ReactNode } from "react";
import { Car, Check, Lock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Thin page-progress bar shown under the header. */
export function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="absolute inset-x-0 bottom-0 h-0.5" aria-hidden>
      <div className="progress-bar h-full origin-left" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/** 3D tilt card with a moving glare highlight. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={cn("tilt-card", className)}>
      {children}
      <div className="tilt-glare" aria-hidden />
    </div>
  );
}

/** Count up to a number when it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

type Stage = { n: number; name: string; who: string; what: string; gate: string };

/**
 * Scroll-driven "delivery quest": a car drives down a track as the visitor
 * scrolls, unlocking each stage gate with an achievement badge.
 */
export function StageQuest({ stages }: { stages: readonly Stage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setP(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const cleared = Math.min(stages.length, Math.floor(p * stages.length + 0.15));
  const xp = Math.round(p * 100);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-6 mb-8 border-b bg-background/85 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-4">
          <Trophy className={cn("size-5 transition-colors", cleared === stages.length ? "text-success" : "text-muted-foreground")} />
          <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Gates cleared <span className="text-foreground">{cleared}/{stages.length}</span>
          </div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="progress-bar h-full rounded-full transition-[width] duration-300" style={{ width: `${xp}%` }} />
          </div>
          <div className="font-mono text-xs font-semibold text-primary">{xp}%</div>
        </div>
      </div>
      <div ref={ref} className="relative pl-14 md:pl-20">
        <div className="absolute bottom-0 left-5 top-0 w-1 rounded-full bg-muted md:left-8" />
        <div className="progress-bar-v absolute left-5 top-0 w-1 rounded-full md:left-8" style={{ height: `${p * 100}%` }} />
        <div className="quest-car absolute left-5 grid size-10 -translate-x-[18px] place-items-center rounded-full md:left-8" style={{ top: `calc(${p * 100}% - 20px)` }}>
          <Car className="size-5" />
        </div>
        <div className="space-y-8">
          {stages.map((s, i) => {
            const done = i < cleared;
            return (
              <div key={s.n} className={cn("quest-stage relative grid gap-6 rounded-2xl border bg-card p-7 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-10", done && "quest-stage-done")}>
                <div className={cn("absolute -left-[52px] top-8 grid size-7 place-items-center rounded-full border-2 bg-background transition-all md:-left-[66px]", done ? "border-success text-success scale-110" : "text-muted-foreground")}>
                  {done ? <Check className="size-4" /> : <Lock className="size-3.5" />}
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">STAGE 0{s.n}</div>
                  <h2 className="mt-1 text-lg font-semibold">{s.name}</h2>
                  <div className={cn("quest-badge mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider", done ? "quest-badge-on" : "bg-muted text-muted-foreground")}>
                    {done ? "Gate cleared +20 XP" : "Locked"}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Who works it</div>
                  <p className="mt-1.5 text-sm">{s.who}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What happens</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.what}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gate to move on</div>
                  <p className="mt-1.5 text-sm font-medium text-primary">{s.gate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
