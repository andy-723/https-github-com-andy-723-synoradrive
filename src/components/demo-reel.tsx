import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import demoReel from "@/assets/demo-reel.mp4.asset.json";
import demoPoster from "@/assets/demo-reel-poster-1600.webp";

/**
 * Cinematic demo reel with a scroll-driven opening transition: the video
 * starts as a small floating card and expands to full bleed as the visitor
 * scrolls through the tall sticky section. Respects prefers-reduced-motion
 * by rendering the video statically at full size.
 */
export function DemoReel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setLoadVideo(true);
      observer.disconnect();
    }, { rootMargin: "250px" });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Scroll progress (0 → 1) across the tall sticky track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 1;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Play only while on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!loadVideo || !video || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [loadVideo]);

  // Ease the expansion so the opening feels weighted, not linear.
  const eased = 1 - Math.pow(1 - progress, 3);
  const scale = 0.62 + eased * 0.38;
  const radius = 28 - eased * 28;
  const glow = 0.25 + eased * 0.55;

  return (
    <section ref={trackRef} className="relative h-[240vh] border-t bg-background" aria-label="SynoraDrive demo film">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="glow-orb glow-orb-indigo left-[12%] top-[16%] size-72 opacity-70" />
        <div className="glow-orb glow-orb-mint bottom-[14%] right-[10%] size-64 opacity-70" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-7xl px-6 pt-24 lg:px-8 lg:pt-28">
          <div className="flex items-center gap-3 font-mono text-xs text-primary-glow">
            <span className="h-px w-8 bg-primary-glow" /> SEE IT RUN
          </div>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
            Watch a deal move<br />from signed to delivered.
          </h2>
        </div>

        <div
          className="relative w-full max-w-6xl px-6 will-change-transform lg:px-8"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className="relative overflow-hidden border border-foreground/15 shadow-elegant"
            style={{
              borderRadius: `${radius}px`,
              boxShadow: `0 30px 90px -30px color-mix(in oklab, var(--brand-mint) ${Math.round(glow * 45)}%, transparent)`,
            }}
          >
            <video
              ref={videoRef}
              src={loadVideo ? demoReel.url : undefined}
              poster={demoPoster}
              className="aspect-video w-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Cinematic film of a dealership floor and the SynoraDrive delivery board"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-glow sm:text-xs">
                  <Play className="size-3.5" /> The SynoraDrive film
                </div>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  A walkthrough of SynoraDrive using fictional demo data.
                </p>
              </div>
              <Link
                to="/demo"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Book a rooftop walkthrough <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
