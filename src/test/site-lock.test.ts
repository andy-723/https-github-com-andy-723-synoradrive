import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { blockedSiteRequest } from "@/lib/site-lock";

describe("Temporary public IP lock", () => {
  it("does not register any former marketing page in the active router", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const path of ["/pricing", "/demo", "/contact", "/about", "/platform", "/platform/compliance", "/security", "/privacy", "/terms"]) {
      expect(router.matchRoutes(path).at(-1)?.routeId, path).toBe("/$");
    }
  });

  it("blocks enquiry and server-function POST requests even with a fake unlock cookie", () => {
    for (const path of ["/demo", "/contact", "/_serverFn/test", "/api/public/test"]) {
      const response = blockedSiteRequest(new Request(`https://www.synoradrive.com.au${path}`, {
        method: "POST", headers: { Cookie: "unlocked=true" },
      }));
      expect(response?.status).toBe(503);
      expect(response?.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
    }
  });

  it("allows read requests to reach only the holding-page router", () => {
    expect(blockedSiteRequest(new Request("https://www.synoradrive.com.au/pricing"))).toBeUndefined();
  });
});