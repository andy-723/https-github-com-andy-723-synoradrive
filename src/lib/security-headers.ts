// Baseline browser security headers for every SSR / server-route response.
// Applied in src/server.ts so they hold on any host (Vercel, Cloudflare, Node).
// The CSP is limited to directives that cannot break page scripts or styles:
// it blocks framing (clickjacking), plugins, <base> hijacking and off-site form posts.
export const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy":
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests",
};

export function withSecurityHeaders(response: Response): Response {
  // Fetch responses can carry immutable headers; copy before setting.
  const out = new Response(response.body, response);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!out.headers.has(name)) out.headers.set(name, value);
  }
  return out;
}
