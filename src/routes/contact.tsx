import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
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

const contactSchema = z.object({
  name: z.string().trim().nonempty("Name is required").max(100),
  workEmail: z.string().trim().email("Enter a valid work email").max(255),
  organisation: z.string().trim().max(150).optional(),
  enquiryType: z.string().trim().nonempty("Select an enquiry type"),
  message: z.string().trim().nonempty("Message cannot be empty").max(1000, "Message must be less than 1000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const empty: ContactForm = { name: "", workEmail: "", organisation: "", enquiryType: "", message: "" };

const field = "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

function ContactPage() {
  const [form, setForm] = useState<ContactForm>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    // TODO: persist the enquiry and notify the team once Lovable Cloud is enabled.
    setSubmitted(true);
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
        intro="Questions about partnerships, security or your account? Send us a note and the right person will reply."
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            {/* [CONFIRM] public email address on the final domain before launch */}
            <div>
              <h2 className="text-lg font-semibold">Direct contact</h2>
              <p className="mt-2 text-sm text-muted-foreground">hello@synoradrive.com.au · Melbourne, Victoria</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Existing customers</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Staff can sign in to SynoraDrive <a href="#" className="underline hover:text-foreground">here</a>.
              </p>
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
                  {["General", "Partnership", "Security", "Existing customer support"].map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.enquiryType && <p className="mt-1 text-xs text-destructive">{errors.enquiryType}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="contact-message">Message *</label>
                <textarea id="contact-message" rows={5} className={field} value={form.message} onChange={set("message")} maxLength={1000} />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>
            <button type="submit" className="mt-7 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
