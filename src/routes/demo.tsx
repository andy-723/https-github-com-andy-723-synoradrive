import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { demoSchema } from "@/lib/enquiry-schemas";
import { submitDemoRequest } from "@/lib/enquiries.functions";
import { PageHero } from "@/components/marketing";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a rooftop demo, SynoraDrive" },
      { name: "description", content: "See SynoraDrive in 30 minutes." },
      { property: "og:title", content: "Book a rooftop demo, SynoraDrive" },
      { property: "og:description", content: "See SynoraDrive in 30 minutes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/demo" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/demo" }],
  }),
  component: DemoPage,
});


type DemoForm = z.infer<typeof demoSchema>;

const empty: DemoForm = {
  fullName: "",
  workEmail: "",
  mobile: "",
  role: "",
  dealership: "",
  rooftops: "",
  dms: "",
  interest: "",
  notes: "",
};

const field = "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

function DemoPage() {
  const [form, setForm] = useState<DemoForm>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof DemoForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const send = useServerFn(submitDemoRequest);

  const set = (k: keyof DemoForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = demoSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof DemoForm, string>> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof DemoForm] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSendError(null);
    setSending(true);
    try {
      await send({ data: parsed.data });
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error && err.message.length < 120 ? err.message : "Something went wrong. Please try again or email andrew@synoratech.ai.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    const firstName = form.fullName.trim().split(/\s+/)[0];
    return (
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
          <CheckCircle2 className="size-12 text-success" />
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Thanks, {firstName}.</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We'll be in touch within one business day to book your demo. If you have a sample Contract of Sale, have it handy; we'll show you SynoraDrive running on it.
          </p>
          <Link to="/" className="mt-8 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
            Back to the homepage
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="light-section bg-background text-foreground">
      <PageHero
        eyebrow="Book a demo"
        title="See SynoraDrive in 30 minutes."
        intro="Use our fictional demo data, or bring a sample or de-identified contract of sale (please don't bring live customer documents). See SynoraDrive read the contract and prepare the deal pack for staff to check. We'll also walk you through the planned workflow, gates and month book."
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-lg font-semibold">In 30 minutes you will see:</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {["A contract read and a deal pack prepared for staff to check", "A walkthrough of the planned five-stage workflow", "A preview of planned month-book reporting (illustrative data)"].map((item) => (
                <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />{item}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-card p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="demo-name">Full name *</label>
                <input id="demo-name" className={field} value={form.fullName} onChange={set("fullName")} maxLength={100} />
                {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
              </div>
              <div>
                <label className={label} htmlFor="demo-email">Work email *</label>
                <input id="demo-email" type="email" className={field} value={form.workEmail} onChange={set("workEmail")} maxLength={255} />
                {errors.workEmail && <p className="mt-1 text-xs text-destructive">{errors.workEmail}</p>}
              </div>
              <div>
                <label className={label} htmlFor="demo-mobile">Mobile</label>
                <input id="demo-mobile" type="tel" className={field} value={form.mobile} onChange={set("mobile")} maxLength={30} />
              </div>
              <div>
                <label className={label} htmlFor="demo-role">Role *</label>
                <select id="demo-role" className={field} value={form.role} onChange={set("role")}>
                  <option value="">Select…</option>
                  {["Dealer Principal", "General Manager", "GSM", "Financial Controller", "Business Manager", "Operations", "Other"].map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role}</p>}
              </div>
              <div>
                <label className={label} htmlFor="demo-dealership">Dealership or group name *</label>
                <input id="demo-dealership" className={field} value={form.dealership} onChange={set("dealership")} maxLength={150} />
                {errors.dealership && <p className="mt-1 text-xs text-destructive">{errors.dealership}</p>}
              </div>
              <div>
                <label className={label} htmlFor="demo-rooftops">Number of rooftops *</label>
                <select id="demo-rooftops" className={field} value={form.rooftops} onChange={set("rooftops")}>
                  <option value="">Select…</option>
                  {["1", "2 to 5", "6 to 15", "16+"].map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.rooftops && <p className="mt-1 text-xs text-destructive">{errors.rooftops}</p>}
              </div>
              <div>
                <label className={label} htmlFor="demo-dms">Main DMS (optional)</label>
                <input id="demo-dms" className={field} value={form.dms} onChange={set("dms")} maxLength={100} />
                {errors.dms && <p className="mt-1 text-xs text-destructive">{errors.dms}</p>}
              </div>
              <div>
                <label className={label} htmlFor="demo-interest">I'm interested in *</label>
                <select id="demo-interest" className={field} value={form.interest} onChange={set("interest")}>
                  <option value="">Select…</option>
                  {["Demo", "Pricing", "Pilot enquiry"].map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.interest && <p className="mt-1 text-xs text-destructive">{errors.interest}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="demo-notes">Anything we should know?</label>
                <textarea id="demo-notes" rows={4} className={field} value={form.notes} onChange={set("notes")} maxLength={1000} />
              </div>
            </div>
            <button type="submit" className="mt-7 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60" disabled={sending}>
              {sending ? "Sending…" : "Book my prototype demo"}
            </button>
            {sendError && <p role="alert" className="mt-3 text-sm text-destructive">{sendError}</p>}
            <p className="mt-4 text-xs text-muted-foreground">
              We aim to reply within one business day. Andrew Phan trading as SYNORA TECH collects the details in this form to respond to your enquiry and arrange a demo or pilot discussion. If you do not provide the required fields, we may not be able to arrange a demo. We store your details with our service providers, which may store data outside Australia. We won't send you marketing emails without your consent. Our <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> explains how to access or correct your information and how to complain.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
