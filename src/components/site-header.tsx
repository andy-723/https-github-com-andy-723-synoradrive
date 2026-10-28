import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { SynoraDriveLogo } from "@/components/synoradrive-logo";
import { ScrollProgressBar } from "@/components/gamified";
import { Button } from "@/components/ui/button";

const platformLinks = [
  { to: "/platform", label: "Platform overview" },
  { to: "/platform/compliance", label: "Compliance aids" },
  { to: "/platform/operations", label: "Unified operations" },
  { to: "/platform/reporting", label: "Centralised reporting" },
  { to: "/platform/customer-experience", label: "Customer experience" },
] as const;

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/partners", label: "Partner with us" },
  { to: "/contact", label: "Contact" },
] as const;

const plainLinks = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/security", label: "Security" },
  { to: "/pricing", label: "Pricing" },
] as const;

function Dropdown({ label, links }: { label: string; links: readonly { to: string; label: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => { setExpanded(false); }, [pathname]);
  useEffect(() => {
    if (!expanded) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);
  const active = links.some((link) => pathname === link.to || (link.to === "/platform" && pathname.startsWith("/platform/")));
  return (
    <div ref={container} className="nav-dropdown relative" data-expanded={expanded} onPointerEnter={(event) => { if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setExpanded(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setExpanded(false); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setExpanded(false); trigger.current?.focus(); } }}>
      <Button ref={trigger} variant="ghost" className="nav-link inline-flex min-h-11 items-center gap-1 rounded-none px-0 font-normal text-muted-foreground hover:bg-transparent" data-active={active} aria-expanded={expanded} aria-controls={`nav-${label.toLowerCase()}`} onClick={(event) => { if (event.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setExpanded(true); else setExpanded((value) => !value); }}>
        {label} <ChevronDown className="nav-chevron size-3.5" />
      </Button>
      <div id={`nav-${label.toLowerCase()}`} className="nav-dropdown-panel absolute left-0 top-full z-50 pt-3" inert={!expanded}>
        <div className="w-64 rounded-lg border bg-popover p-2 shadow-elegant">
          {links.map((l) => (
            <Button key={l.to} asChild variant="ghost" className="nav-menu-link inline-flex min-h-11 w-full items-center justify-start whitespace-normal rounded-lg px-3 py-2 font-normal text-popover-foreground/80">
            <Link to={l.to} onClick={() => setExpanded(false)}>
              {l.label}
            </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  return (
    <header ref={header} className="site-nav glass sticky top-0 z-50 border-b" onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); menuTrigger.current?.focus(); } }}>
      <ScrollProgressBar />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="SynoraDrive home" className="nav-brand">
          <SynoraDriveLogo />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          <Dropdown label="Platform" links={platformLinks} />
          {plainLinks.map((l) => (
            <Button key={l.to} asChild variant="ghost" className="nav-link inline-flex min-h-11 items-center rounded-none px-0 font-normal text-muted-foreground hover:bg-transparent">
            <Link to={l.to} activeProps={{ "data-active": true }}>
              {l.label}
            </Link>
            </Button>
          ))}
          <Dropdown label="Company" links={companyLinks} />
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild className="nav-cta hidden min-h-11 rounded-lg px-4 font-semibold shadow-glow md:inline-flex">
          <Link to="/demo">
            Book a demo
          </Link>
          </Button>
          <Button ref={menuTrigger} variant="outline" size="icon" className="min-h-11 min-w-11 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="nav-mobile border-t px-6 py-4 lg:hidden">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</div>
          {platformLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="nav-menu-link flex min-h-11 items-center text-sm text-foreground">
              {l.label}
            </Link>
          ))}
          <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</div>
          {[...plainLinks, ...companyLinks].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="nav-menu-link flex min-h-11 items-center text-sm text-foreground">
              {l.label}
            </Link>
          ))}
          <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Get started</div>
          <Link to="/demo" onClick={() => setOpen(false)} className="nav-menu-link flex min-h-11 items-center text-sm font-semibold text-primary">
            Book a demo
          </Link>
        </nav>
      )}
    </header>
  );
}
