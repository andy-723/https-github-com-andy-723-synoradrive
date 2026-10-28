import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </Reveal>
  );
}

export function Breadcrumb({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8">
      {eyebrow && <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</div>}
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
      {intro && <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>}
      {children}
    </Reveal>
  );
}
