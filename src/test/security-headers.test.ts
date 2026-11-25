import { describe, expect, it } from "vitest";
import { SECURITY_HEADERS, withSecurityHeaders } from "@/lib/security-headers";

describe("withSecurityHeaders", () => {
  it("adds every baseline header and keeps the body and status", async () => {
    const res = withSecurityHeaders(
      new Response("hello", { status: 201, headers: { "content-type": "text/plain" } }),
    );
    expect(res.status).toBe(201);
    expect(await res.text()).toBe("hello");
    expect(res.headers.get("content-type")).toBe("text/plain");
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      expect(res.headers.get(name)).toBe(value);
    }
    expect(res.headers.get("content-security-policy")).toContain("frame-ancestors 'none'");
  });

  it("does not override a header a route already set", () => {
    const res = withSecurityHeaders(
      new Response("", { headers: { "X-Frame-Options": "SAMEORIGIN" } }),
    );
    expect(res.headers.get("x-frame-options")).toBe("SAMEORIGIN");
  });
});
