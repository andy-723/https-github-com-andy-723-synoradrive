import { createServerFn } from "@tanstack/react-start";
import { contactSchema, demoSchema } from "./enquiry-schemas";

async function notifyOwner(id: string, kind: string, replyTo: string, fields: [string, string | null | undefined][]) {
  try {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    await sendTemplateEmail("enquiry-notification", "andrew@synoratech.ai", {
      templateData: { kind, fields: fields.filter(([, v]) => v).map(([label, value]) => ({ label, value })) },
      idempotencyKey: `enquiry-notification-${id}`,
      replyTo,
    });
  } catch (err) {
    // Submission is already stored; don't fail the visitor if email isn't available yet.
    console.error("Owner notification failed", err);
  }
}

// Simple abuse guard: max 3 submissions per email per 10 minutes.
async function tooMany(table: "demo_requests" | "contact_submissions", email: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("work_email", email)
    .gte("created_at", since);
  return (count ?? 0) >= 3;
}

// Reject cross-site callers and cap total volume so scripted spam can't flood the inbox.
async function guardSubmission(table: "demo_requests" | "contact_submissions") {
  const { getRequest } = await import("@tanstack/react-start/server");
  const req = getRequest();
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) throw new Error("Submission rejected.");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin.from(table).select("id", { count: "exact", head: true }).gte("created_at", since);
  if ((count ?? 0) >= 30) throw new Error("We're receiving a lot of enquiries right now. Please email us directly.");
}

export const submitDemoRequest = createServerFn({ method: "POST" })
  .validator((d: unknown) => demoSchema.parse(d))
  .handler(async ({ data }) => {
    await guardSubmission("demo_requests");
    const email = data.workEmail.toLowerCase();
    if (await tooMany("demo_requests", email)) throw new Error("Too many requests. Please try again shortly.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("demo_requests").insert({
      full_name: data.fullName,
      work_email: email,
      mobile: data.mobile || null,
      role: data.role,
      dealership: data.dealership,
      rooftops: data.rooftops,
      dms: data.dms || null,
      interest: data.interest,
      notes: [data.notes, data.marketingOptIn ? "[Opted in to product updates]" : ""].filter(Boolean).join("\n\n") || null,
    }).select("id").single();
    if (error) throw new Error("We couldn't save your request. Please try again.");
    await notifyOwner(row.id, "Demo request", email, [
      ["Name", data.fullName], ["Work email", email], ["Mobile", data.mobile], ["Role", data.role],
      ["Dealership", data.dealership], ["Rooftops", data.rooftops], ["DMS", data.dms],
      ["Interested in", data.interest], ["Notes", data.notes], ["Product updates", data.marketingOptIn ? "Yes, opted in" : "No"],
    ]);
    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .validator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    await guardSubmission("contact_submissions");
    const email = data.workEmail.toLowerCase();
    if (await tooMany("contact_submissions", email)) throw new Error("Too many messages. Please try again shortly.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      work_email: email,
      organisation: data.organisation || null,
      enquiry_type: data.enquiryType,
      message: data.marketingOptIn ? `${data.message}\n\n[Opted in to product updates]` : data.message,
    }).select("id").single();
    if (error) throw new Error("We couldn't send your message. Please try again.");
    await notifyOwner(row.id, "Contact enquiry", email, [
      ["Name", data.name], ["Work email", email], ["Organisation", data.organisation],
      ["Enquiry type", data.enquiryType], ["Message", data.message], ["Product updates", data.marketingOptIn ? "Yes, opted in" : "No"],
    ]);
    return { ok: true };
  });
