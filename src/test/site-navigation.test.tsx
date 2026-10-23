import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/site-header";
import { SiteHoverEffects } from "@/components/site-hover-effects";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, activeProps: _activeProps, ...props }: { to: string; activeProps?: unknown }) => <a href={to} {...props} />,
  useLocation: () => "/",
}));
vi.mock("@/components/gamified", () => ({ ScrollProgressBar: () => null }));

beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("Navigation dismissal", () => {
  it("toggles a touch disclosure and dismisses outside it", () => {
    render(<SiteHeader />);
    const platform = screen.getByRole("button", { name: "Platform" });
    fireEvent.click(platform);
    expect(platform).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(platform);
    expect(platform).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(platform);
    fireEvent.pointerDown(document.body);
    expect(platform).toHaveAttribute("aria-expanded", "false");
  });
  it("closes a disclosure on Escape and returns keyboard focus", () => {
    render(<SiteHeader />);
    const platform = screen.getByRole("button", { name: "Platform" });
    fireEvent.click(platform);
    const link = screen.getByRole("link", { name: "Platform overview" });
    link.focus();
    fireEvent.keyDown(link, { key: "Escape" });
    expect(platform).toHaveAttribute("aria-expanded", "false");
    expect(platform).toHaveFocus();
  });
  it("closes the mobile menu on Escape and returns focus to its toggle", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = screen.getByRole("navigation", { name: "Mobile navigation" });
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});

describe("Touch section highlights", () => {
  it("does not schedule pointer tracking for touch gestures", () => {
    class TestPointerEvent extends MouseEvent {
      pointerType: string;
      constructor(type: string, init: MouseEventInit & { pointerType?: string }) {
        super(type, init);
        this.pointerType = init.pointerType ?? "mouse";
      }
    }
    vi.stubGlobal("PointerEvent", TestPointerEvent);
    const frame = vi.fn();
    vi.stubGlobal("requestAnimationFrame", frame);
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    render(<div className="site-hover-effects"><SiteHoverEffects /><article className="rounded border" data-testid="card">Example</article></div>);
    screen.getByTestId("card").dispatchEvent(new TestPointerEvent("pointermove", { bubbles: true, pointerType: "touch" }));
    expect(frame).not.toHaveBeenCalled();
    expect(screen.getByTestId("card")).not.toHaveAttribute("data-pointer-highlight");
  });
});