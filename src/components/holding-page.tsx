import { LockKeyhole } from "lucide-react";
import { SynoraDriveLogo } from "@/components/synoradrive-logo";

export function HoldingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10">
        <SynoraDriveLogo />
      </header>
      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-20 sm:px-10">
        <div className="max-w-2xl border-l-2 border-brand-mint pl-6 sm:pl-10">
          <LockKeyhole className="mb-8 size-8 text-brand-mint" aria-hidden="true" />
          <p className="mb-5 font-mono text-xs uppercase tracking-wide text-brand-mint">SynoraDrive</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">Temporarily<br />off the public road.</h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Our website is currently unavailable to the public. Thank you for your patience.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="size-2 shrink-0 rounded-full bg-brand-mint" aria-hidden="true" />
            Public access paused
          </div>
        </div>
      </section>
      <footer className="mx-auto w-full max-w-6xl border-t border-border px-6 py-6 text-xs leading-relaxed text-muted-foreground sm:px-10">
        © 2026 SYNORA TECH. All rights reserved.
      </footer>
    </div>
  );
}