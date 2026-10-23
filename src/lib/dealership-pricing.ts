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
      "Contract ingest from Pentana eraPower",
      "Auto-filled showroom and pre-delivery packs",
      "Deal-type compliance checklist and ASIC deferred-sales tracking",
      "PPSR certificate reading and ASIC company search",
      "Dealer-branded customer portal and DocuSign",
      "Business-hours support",
    ],
  },
  {
    n: "Pipeline",
    s: "Dealerships running sale-to-delivery and live reporting",
    hi: true,
    tag: "Most popular",
    f: [
      "Everything in Document & Compliance, plus:",
      "Five-stage delivery board with enforced gates",
      "Parallel tasks, @mentions, approvals and escalations",
      "Live month book and RDA watchlist",
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
