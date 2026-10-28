import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { blockedSiteRequest } from "@/lib/site-lock";

const publicLockMiddleware = createMiddleware().server(async ({ request, next }) => {
  const blocked = blockedSiteRequest(request);
  if (blocked) return blocked;
  if (new URL(request.url).pathname.startsWith('/private/site')) {
    const { isPrivateUnlocked } = await import('@/lib/private-access.server');
    if (!await isPrivateUnlocked()) return Response.redirect(new URL('/private', request.url), 303);
    const css = (await import('@/styles.css?url')).default;
    return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>SynoraDrive — Private website</title><link rel="stylesheet" href="${css}"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"></head><body><div id="private-site"></div><script src="/api/public/private-file?name=site.js"></script></body></html>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive' },
    });
  }
  const result = await next();
  if (!new URL(request.url).pathname.startsWith("/lovable/email/")) {
    const headers = new Headers(result.response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    headers.set("Cache-Control", "no-store");
    return new Response(result.response.body, { status: result.response.status, statusText: result.response.statusText, headers });
  }
  return result;
});

const errorMiddleware = createMiddleware().server(async ({ request, next }) => {
  if (new URL(request.url).pathname.startsWith("/lovable/")) return next();
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [publicLockMiddleware, errorMiddleware, csrfMiddleware],
}));
