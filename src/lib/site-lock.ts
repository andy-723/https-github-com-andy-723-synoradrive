/** No owner bypass or browser-storage flag: public access is paused for everyone. */
export function blockedSiteRequest(request: Request): Response | undefined {
  const pathname = new URL(request.url).pathname;
  // Managed email tooling verifies its own callers; it never serves marketing content.
  if (pathname.startsWith("/lovable/email/")) return undefined;
  if (request.method === "GET" || request.method === "HEAD") return undefined;
  return new Response("Public access is temporarily paused.", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}