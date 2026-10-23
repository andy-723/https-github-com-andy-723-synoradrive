import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative border-y px-2 py-16 text-center">
        <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold sm:text-5xl">
          Sync the floor. Drive the metric.
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-muted-foreground">
          Bring one of your own deal packs to a 30-minute rooftop walkthrough, and watch SynoraDrive run it from contract to keys.
        </p>
        <Link
          to="/demo"
          className="relative mt-9 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Book a rooftop demo <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
