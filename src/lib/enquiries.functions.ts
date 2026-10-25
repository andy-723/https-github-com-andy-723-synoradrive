import { createServerFn } from "@tanstack/react-start";
import { contactSchema, demoSchema } from "./enquiry-schemas";

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

export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => demoSchema.parse(d))
  .handler(async ({ data }) => {
    const email = data.workEmail.toLowerCase();
    if (await tooMany("demo_requests", email)) throw new Error("Too many requests. Please try again shortly.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("demo_requests").insert({
      full_name: data.fullName,
      work_email: email,
      mobile: data.mobile || null,
      role: data.role,
      dealership: data.dealership,
      rooftops: data.rooftops,
      dms: data.dms || null,
      interest: data.interest,
      notes: data.notes || null,
    });
    if (error) throw new Error("We couldn't save your request. Please try again.");
    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const email = data.workEmail.toLowerCase();
    if (await tooMany("contact_submissions", email)) throw new Error("Too many messages. Please try again shortly.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      work_email: email,
      organisation: data.organisation || null,
      enquiry_type: data.enquiryType,
      message: data.message,
    });
    if (error) throw new Error("We couldn't send your message. Please try again.");
    return { ok: true };
  });
