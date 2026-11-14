import { useState } from "react";
import { Mail, MessageCircle, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  { name: "In-Queue", subject: "Your next chapter is in motion", body: "Your signed contract is with our team. We’re checking the details and coordinating the next steps for your vehicle." },
  { name: "Document Prep", subject: "Getting the details ready", body: "Our team is preparing your paperwork and registration details. Your Sales Consultant will let you know if any documents or information are needed." },
  { name: "Finance & Approvals", subject: "Good news — your application is being reviewed", body: "Your vehicle is sitting with our experienced Business Manager, who is currently reviewing your finance application. Please allow 2–3 business days for a response." },
  { name: "Workshop & PDI", subject: "Preparing your vehicle for the road", body: "Your vehicle is with our preparation team for its pre-delivery checks and any agreed accessories. We’ll keep you updated as it moves towards handover." },
  { name: "Delivery", subject: "The moment you’ve been waiting for", body: "Your vehicle has reached the delivery stage. Your Sales Consultant will be in touch to confirm registration, any remaining requirements and your collection arrangements." },
] as const;

export function CustomerJourneyPreview() {
  const [selected, setSelected] = useState(2);
  const stage = stages[selected];
  if (!stage) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <p className="mb-6 text-sm text-muted-foreground">Illustrative journey · Roadmap feature · No emails sent</p>
        <div className="relative space-y-2 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-border">
          {stages.map((item, index) => (
            <Button key={item.name} variant="ghost" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`relative h-auto min-h-14 w-full justify-start gap-4 whitespace-normal px-0 py-2 text-left ${selected === index ? "text-primary" : "text-muted-foreground"}`}>
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs ${selected === index ? "border-primary text-primary" : "border-border"}`}>
                {index < selected ? <Check className="size-4" /> : `0${index + 1}`}
              </span>
              <span className="text-base font-semibold">{item.name}</span>
              {selected === index && <ArrowRight className="ml-auto mr-3 size-4" />}
            </Button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border bg-card shadow-elegant" aria-label="Illustrative customer email">
        <div className="flex items-center gap-3 border-b bg-secondary/50 px-6 py-4">
          <Mail className="size-5 text-primary" />
          <span className="text-sm font-semibold">A little clarity in their inbox.</span>
        </div>
        <div className="p-6 sm:p-8" aria-live="polite" aria-atomic="true">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">{stage.name} · Sample email</p>
          <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{stage.subject}</h3>
          <p className="mt-6 text-sm text-muted-foreground">Hi Alex,</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{stage.body}</p>
          <div className="mt-7 flex items-start gap-3 border-t pt-5">
            <MessageCircle className="mt-1 size-5 shrink-0 text-success" />
            <div>
              <p className="font-semibold">Questions? Connect with your Sales Consultant.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Each planned email would include a direct way to contact the consultant who knows your deal.</p>
            </div>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Fictional customer and illustrative wording. Timing depends on the lender, application and dealership; 2–3 business days is an example, not a guaranteed response or approval.</p>
        </div>
      </div>
    </div>
  );
}