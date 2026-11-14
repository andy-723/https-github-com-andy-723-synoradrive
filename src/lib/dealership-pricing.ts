/**
 * Per-rooftop subscription tiers and recommended add-ons. Prices stay
 * shown per rooftop per month (excl. GST); enterprise stays on request.
 */
export const pricingPlans = [
  {
    n: "Document & Compliance Core",
    s: "Rooftops digitising deal jackets and compliance",
    hi: false,
    price: "$699" as string | null,
    tag: null as string | null,
    f: [
      "DMS Contract of Sale extraction (OCR + AcroForm engine)",
      "Showroom & Pre-Delivery deal packs prepared for staff check",
      "VIC/NSW registration & transfer forms",
      "Deal-type compliance checklists and deferred-sales tracking",
      "Role-based access and staff TOTP MFA",
      "Unlimited staff logins per rooftop",
    ],
  },
  {
    n: "Full Pipeline & DealBoard",
    s: "Dealerships running sale-to-delivery on one board",
    hi: false,
    price: "$1,490" as string | null,
    tag: null as string | null,
    f: [
      "Everything in Document & Compliance Core, plus:",
      "Interactive 5-stage Delivery Board with configurable gates",
      "7-tab Deal Card and $0 Balance settlement check",
      "Parallel tasks, @mentions, approvals and escalations",
      "Activity and audit log",
      "Unlimited staff logins per rooftop",
    ],
  },
  {
    n: "Multi-Rooftop Enterprise Group",
    s: "Dealer groups across multiple rooftops",
    hi: false,
    price: null as string | null,
    tag: null as string | null,
    f: [
      "Everything in Full Pipeline & DealBoard, plus:",
      "Global and local admin roles across rooftops",
      "Brand-specific document packs per rooftop",
      "Microsoft Entra ID SSO and Graph mailbox intake (configured per group)",
      "Command Center reporting across the group",
      "Unlimited staff logins per rooftop",
    ],
  },
];

export const pricingAddOns = [
  { n: "Insights & Forecasting Add-On", b: "Live month-book, forward delivery timelines, target tracking, custom rooftop benchmarking and executive reporting." },
  { n: "Prospect Board Add-On", b: "Connects the showroom prospect pipeline directly with the active delivery board to identify opportunities." },
  { n: "Customer Experience & DocuSign Add-On", b: "Enhanced CX stage-triggered customer emails from In-Queue to Delivery, with Sales Consultant contact — on the roadmap, not available today. Branded mobile portals for document upload and DocuSign integration are configured during onboarding (subject to customer licence).", roadmap: true },
];

export const pricingNote = "Pricing per rooftop per month (excl. GST), subject to rooftop onboarding scope and signed Order Form.";
