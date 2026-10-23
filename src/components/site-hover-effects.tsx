import { useEffect } from "react";

const framedSelector = ':is(div, article, details, form)[class*="rounded"][class~="border"]';

/** Pointer coordinates only; visuals stay in the shared semantic theme. */
export function SiteHoverEffects() {
  useEffect(() => {
    const root = document.querySelector(".site-hover-effects");
    if (!root) return;
    let frame = 0;
    let active: HTMLElement | null = null;
    const move = (event: Event) => {
      if (!(event instanceof PointerEvent) || event.pointerType === "touch") return;
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(framedSelector);
      if (!card || card.closest("header")) return;
      if (active !== card) active?.removeAttribute("data-pointer-highlight");
      active = card;
      const { clientX, clientY } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${clientX - bounds.left}px`);
        card.style.setProperty("--pointer-y", `${clientY - bounds.top}px`);
        card.setAttribute("data-pointer-highlight", "true");
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      active?.removeAttribute("data-pointer-highlight");
      active = null;
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    return () => {
      leave();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);
  return null;
}