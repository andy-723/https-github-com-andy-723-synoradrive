import { createFileRoute } from "@tanstack/react-router";
import { HoldingPage } from "@/components/holding-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SynoraDrive — Public access paused" },
      { name: "description", content: "The SynoraDrive website is temporarily unavailable to the public. Thank you for your patience." },
      { property: "og:title", content: "SynoraDrive — Public access paused" },
      { property: "og:description", content: "The SynoraDrive website is temporarily unavailable to the public." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: HoldingPage,
});