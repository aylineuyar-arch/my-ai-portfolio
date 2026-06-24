// Lightweight wrapper around Lovable analytics (Plausible-compatible).
// No-ops on SSR and when the analytics script hasn't loaded yet.

type PlausibleFn = (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  try {
    // Queue if plausible hasn't initialized yet — Plausible drains this queue on load.
    window.plausible =
      window.plausible ||
      function (...args: unknown[]) {
        (window.plausible!.q = window.plausible!.q || []).push(args);
      };
    window.plausible(event, props ? { props } : undefined);
  } catch {
    /* swallow */
  }
}
