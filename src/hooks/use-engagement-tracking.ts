import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Wires three engagement signals to Lovable analytics:
 *  - Scroll depth: fires "Scroll Depth" with {percent: 25|50|75|100}, once each per page load.
 *  - Section view: fires "Section View" with {section: <name>} when a [data-track-section] enters viewport, once each.
 *  - Click: fires "Click" with {target: <name>} on any element with [data-track-click].
 *
 * Mount once at the top of a page component.
 */
export function useEngagementTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ---- Scroll depth ----
    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track("Scroll Depth", { percent: t });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---- Section view ----
    const seenSections = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.trackSection;
          if (!name || seenSections.has(name)) continue;
          seenSections.add(name);
          track("Section View", { section: name });
          sectionObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>("[data-track-section]").forEach((el) => {
      sectionObserver.observe(el);
    });

    // ---- Click (delegated) ----
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track-click]");
      if (!el) return;
      const name = el.dataset.trackClick || "unknown";
      track("Click", { target: name });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
}
