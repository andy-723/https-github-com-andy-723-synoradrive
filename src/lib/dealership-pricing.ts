/**
 * Pricing plans per Website Copy v4 (22 Oct 2026): prices are published
 * "on request" only — the earlier per-rooftop dollar figures were estimates
 * and must not appear on the site until commercially set.
 */
export const pricingPlans = [
  {
    n: "Document & Compliance",
    s: "Rooftops digitising deal jackets and compliance",
    hi: false,
    tag: null as string | null,
    f: [
      "Contract-of-sale reading (PDF from your DMS)",
      "Deal pack prepared for staff to check",
      "Staff preview, then download or print",
      "Planned: deal-type checklists and deferred-sales date tracking",
      "Planned: PPSR certificate reading and company search",
      "Planned: customer portal and DocuSign e-signature",
    ],
  },
  {
    n: "Pipeline",
    s: "Dealerships running sale-to-delivery and live reporting",
    hi: false,
    tag: "Planned",
    f: [
      "Everything in Document & Compliance, plus:",
      "Five-stage delivery board with configurable gates",
      "Parallel tasks, @mentions, approvals and escalations",
      "Month book and RDA watchlist",
      "Weighted pipeline and staff KPIs",
    ],
  },
  {
    n: "Insights & Forecasting",
    s: "Multi-rooftop groups and leadership",
    hi: false,
    tag: "Roadmap add-on",
    f: [
      "Cross-rooftop dashboards",
      "Multi-quarter forecasting",
      "Rooftop benchmarking",
      "OEM target tracking",
    ],
  },
];
