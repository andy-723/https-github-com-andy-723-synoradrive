import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { contactSchema } from "@/lib/enquiry-schemas";
import { submitContact } from "@/lib/enquiries.functions";
import { PageHero } from "@/components/marketing";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SynoraDrive" },
      { name: "description", content: "Questions about partnerships, security or support." },
      { property: "og:title", content: "Contact SynoraDrive" },
      { property: "og:description", content: "Questions about partnerships, security or support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});


type ContactForm = z.infer<typeof contactSchema>;

const empty: ContactForm = { name: "", workEmail: "", organisation: "", enquiryType: "", message: "" };

const field = "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

function ContactPage() {
  const [form, setForm] = useState<ContactForm>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const send = useServerFn(submitContact);

  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof ContactForm] = issue.message;
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
    return (
      <section className="light-section bg-background text-foreground">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
          <CheckCircle2 className="size-12 text-success" />
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Thanks, we've got your message.</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">We'll reply within one business day.</p>
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
        eyebrow="Contact"
        title="Talk to us."
        intro="Questions about SynoraDrive, pilots, partnerships or security? Send us a note and the right person will reply."
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            {/* [CONFIRM] public email address on the final domain before launch */}
            <div>
              <h2 className="text-lg font-semibold">Direct contact</h2>
              <p className="mt-2 text-sm text-muted-foreground">andrew@synoratech.ai · Victoria, Australia</p>
            </div>
          </div>
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-card p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="contact-name">Name *</label>
                <input id="contact-name" className={field} value={form.name} onChange={set("name")} maxLength={100} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className={label} htmlFor="contact-email">Work email *</label>
                <input id="contact-email" type="email" className={field} value={form.workEmail} onChange={set("workEmail")} maxLength={255} />
                {errors.workEmail && <p className="mt-1 text-xs text-destructive">{errors.workEmail}</p>}
              </div>
              <div>
                <label className={label} htmlFor="contact-org">Organisation</label>
                <input id="contact-org" className={field} value={form.organisation} onChange={set("organisation")} maxLength={150} />
              </div>
              <div>
                <label className={label} htmlFor="contact-type">Enquiry type *</label>
                <select id="contact-type" className={field} value={form.enquiryType} onChange={set("enquiryType")}>
                  <option value="">Select…</option>
                  {["General", "Partnership", "Security", "Pilot enquiry"].map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.enquiryType && <p className="mt-1 text-xs text-destructive">{errors.enquiryType}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="contact-message">Message *</label>
                <textarea id="contact-message" rows={5} className={field} value={form.message} onChange={set("message")} maxLength={1000} />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>
            <button type="submit" className="mt-7 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </button>
            {sendError && <p role="alert" className="mt-3 text-sm text-destructive">{sendError}</p>}
            <p className="mt-4 text-xs text-muted-foreground">
              We use the details in this form to respond to your enquiry. If you don't provide the required fields, we may not be able to reply. Your details are handled by Andrew Phan trading as SYNORA TECH and our email provider, which may store data outside Australia. See our <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> for how to access or correct your information or make a complaint.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
