import { Link } from "@tanstack/react-router";
import { SynoraDriveLogo } from "@/components/synoradrive-logo";

const columns = [
  {
    title: "Platform",
    links: [
      { to: "/platform", label: "Platform overview" },
      { to: "/platform/compliance", label: "Compliance aids" },
      { to: "/platform/operations", label: "Unified operations" },
      { to: "/platform/reporting", label: "Centralised reporting" },
      { to: "/platform/customer-experience", label: "Customer experience" },
      { to: "/how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/partners", label: "Partner with us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { to: "/security", label: "Security" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Use and Disclaimer" },
    ],
  },
  {
    title: "Get started",
    links: [
      { to: "/demo", label: "Book a demo" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <SynoraDriveLogo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A post-contract workflow tool in development for Australian franchised dealerships.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* LinkedIn icon once the company page is live */}
        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          SynoraDrive™ is a proprietary software platform of Andrew Phan trading as SYNORA TECH (ABN 42 234 662 138). Hosted natively on Microsoft Azure (Australia East). Enterprise Contact:{" "}
          <a href="mailto:andrew@synoratech.ai" className="transition-colors hover:text-foreground">
            andrew@synoratech.ai
          </a>{" "}
          | Web:{" "}
          <a href="https://synoradrive.com.au" className="transition-colors hover:text-foreground">
            synoradrive.com.au
          </a>
          . © 2026 SYNORA TECH. All rights reserved
        </div>
      </div>
    </footer>
  );
}
