export const pricingTiers = [
  { n: "Core", s: "Single rooftop", p: "$1,490", u: "AUD / rooftop / mo", note: "", hi: false, f: ["Pentana Contract of Sale PDF & mailbox ingest", "5-Stage Dealership Board across all 9 roles", "Automated Showroom, Trade-In & State Compliance packs", "$0 Balance F&I Settlement & V2 Aftermarket gates", "VicRoads Plate Register & 28-day eRWC bridge"] },
  { n: "Dealer Group", s: "2–9 rooftops", p: "$1,190", u: "AUD / rooftop / mo", note: "Billed per rooftop for 2 to 9 locations", hi: true, f: ["Everything in Core, plus:", "DP & GSM Executive Sales Log (DOC) & PVR Gross Tracker", "Multi-rooftop EOM Realistic Call-In & Quota Rollup", "OEM Rebate Cliff & Pre-Reported (RDA) Audit Watch", "Centralised Group Registration & Plate Box Queue"] },
  { n: "Enterprise", s: "10+ rooftops / OEM", p: "Custom", u: "Volume group agreement", note: "", hi: false, f: ["Everything in Dealer Group, plus:", "Dedicated Azure Australia East tenant isolation", "Microsoft Entra ID enterprise SSO & SCIM", "Custom DMS / ERP bi-directional connectors", "Dedicated Melbourne onboarding & compliance engineer"] },
];

export function monthlyGroupPrice(rooftops: number): number | null {
  if (!Number.isInteger(rooftops) || rooftops < 1) throw new Error("Enter a positive whole number of rooftops");
  if (rooftops >= 10) return null;
  return rooftops * (rooftops === 1 ? 1490 : 1190);
}