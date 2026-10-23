import { useEffect } from "react";

const framedSelector = ':is(div, article, details, form)[class*="rounded"][class~="border"]';

/** Pointer coordinates only; visuals stay in the shared semantic theme. */
export function SiteHoverEffects() {
  useEffect(() => {
    const root = document.querySelector(".site-hover-effects");
    if (!root) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active: HTMLElement | null = null;
    const leave = () => {
      cancelAnimationFrame(frame);
      active?.removeAttribute("data-pointer-highlight");
      active?.style.removeProperty("--pointer-x");
      active?.style.removeProperty("--pointer-y");
      active = null;
    };
    const move = (event: Event) => {
      if (!(event instanceof PointerEvent) || event.pointerType !== "mouse" || !finePointer.matches || reducedMotion.matches) { leave(); return; }
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(framedSelector);
      if (!card || card.closest("header")) { leave(); return; }
      if (active !== card) leave();
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
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    window.addEventListener("scroll", leave, { passive: true, capture: true });
    finePointer.addEventListener("change", leave);
    reducedMotion.addEventListener("change", leave);
    return () => {
      leave();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      window.removeEventListener("scroll", leave, true);
      finePointer.removeEventListener("change", leave);
      reducedMotion.removeEventListener("change", leave);
    };
  }, []);
  return null;
}