import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { SynoraDriveLogo } from "@/components/synoradrive-logo";

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
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 transition-colors hover:text-foreground">
        {label} <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="w-64 rounded-xl border bg-popover p-2 shadow-elegant">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block rounded-lg px-3 py-2 text-sm text-popover-foreground/80 transition-colors hover:bg-accent hover:text-popover-foreground">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="SynoraDrive home">
          <SynoraDriveLogo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          <Dropdown label="Platform" links={platformLinks} />
          {plainLinks.map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Dropdown label="Company" links={companyLinks} />
        </nav>
        <div className="flex items-center gap-3">
          {/* [CONFIRM] Staff sign in must point to the new app domain, not thedealflow.com.au */}
          <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            Staff sign in
          </a>
          <Link to="/demo" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            Book a demo
          </Link>
          <button className="grid size-9 place-items-center rounded-lg border lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t px-6 py-4 lg:hidden">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</div>
          {platformLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2 text-sm text-foreground">
              {l.label}
            </Link>
          ))}
          <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</div>
          {[...plainLinks, ...companyLinks].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2 text-sm text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
