import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import handoverImage from "@/assets/delivery-handover.jpg";

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="band relative isolate overflow-hidden rounded-2xl border px-6 py-20 text-center shadow-elegant">
        <img
          src={handoverImage}
          alt="A salesperson handing keys to a customer in a dealership delivery bay"
          loading="lazy"
          width={1536}
          height={1024}
          className="band-img absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="handover-shade absolute inset-0 -z-10" />
        <Reveal>
          <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold sm:text-5xl">
            Sync the floor. Drive the metric.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-muted-foreground">
            Book a 30-minute walkthrough of SynoraDrive. See how it reads a sample contract of sale and prepares a deal pack for your staff to check. Please bring a sample or de-identified contract, not live customer documents.
          </p>
          <Link
            to="/demo"
            className="relative mt-9 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Book a rooftop demo <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
