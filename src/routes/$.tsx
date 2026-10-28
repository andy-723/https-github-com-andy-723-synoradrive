import { createFileRoute } from "@tanstack/react-router";
import { HoldingPage } from "@/components/holding-page";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "SynoraDrive — Website temporarily unavailable" },
      { name: "description", content: "Public access to this SynoraDrive page is temporarily paused. Thank you for your patience." },
      { property: "og:title", content: "SynoraDrive — Website temporarily unavailable" },
      { property: "og:description", content: "Public access to the SynoraDrive website is temporarily paused." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: HoldingPage,
});