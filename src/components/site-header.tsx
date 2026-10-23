import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { SynoraDriveLogo } from "@/components/synoradrive-logo";
import { ScrollProgressBar } from "@/components/gamified";
import { Button } from "@/components/ui/button";

const platformLinks = [
  { to: "/platform", label: "Platform overview" },
  { to: "/platform/compliance", label: "Compliance and OEM rebates" },
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
  const pathname = useLocation({ select: (location) => location.pathname });
  const active = links.some((link) => pathname === link.to || (link.to === "/platform" && pathname.startsWith("/platform/")));
  return (
    <div className="nav-dropdown relative" data-expanded={expanded} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }} onKeyDown={(event) => { if (event.key === "Escape") setExpanded(false); }}>
      <Button variant="ghost" className="nav-link h-auto gap-1 rounded-none p-0 font-normal text-muted-foreground hover:bg-transparent" data-active={active} aria-expanded={expanded} aria-controls={`nav-${label.toLowerCase()}`} onClick={() => setExpanded((value) => !value)}>
        {label} <ChevronDown className="nav-chevron size-3.5" />
      </Button>
      <div id={`nav-${label.toLowerCase()}`} className="nav-dropdown-panel absolute left-0 top-full z-50 pt-3" inert={!expanded}>
        <div className="w-64 rounded-lg border bg-popover p-2 shadow-elegant">
          {links.map((l) => (
            <Button key={l.to} asChild variant="ghost" className="nav-menu-link h-auto w-full justify-start whitespace-normal rounded-md px-3 py-2 font-normal text-popover-foreground/80">
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
  return (
    <header className="site-nav glass sticky top-0 z-50 border-b">
      <ScrollProgressBar />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="SynoraDrive home" className="nav-brand">
          <SynoraDriveLogo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          <Dropdown label="Platform" links={platformLinks} />
          {plainLinks.map((l) => (
            <Button key={l.to} asChild variant="ghost" className="nav-link h-auto rounded-none p-0 font-normal text-muted-foreground hover:bg-transparent">
            <Link to={l.to} activeProps={{ "data-active": true }}>
              {l.label}
            </Link>
            </Button>
          ))}
          <Dropdown label="Company" links={companyLinks} />
        </nav>
        <div className="flex items-center gap-3">
          {/* [CONFIRM] Staff sign in must point to the new app domain, not thedealflow.com.au */}
          <a href="#" className="nav-link hidden text-sm text-muted-foreground sm:block">
            Staff sign in
          </a>
          <Button asChild className="nav-cta rounded-lg px-4 font-semibold shadow-glow">
          <Link to="/demo">
            Book a demo
          </Link>
          </Button>
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="nav-mobile border-t px-6 py-4 lg:hidden">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</div>
          {platformLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="nav-menu-link block py-2 text-sm text-foreground">
              {l.label}
            </Link>
          ))}
          <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</div>
          {[...plainLinks, ...companyLinks].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="nav-menu-link block py-2 text-sm text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
