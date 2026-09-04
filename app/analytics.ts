import posthog from "posthog-js";

/**
 * Thin, typed wrapper over posthog.capture — the single place our custom events
 * are named, so event names and property shapes stay consistent across
 * components. Safe to call before PostHog finishes init (posthog-js queues
 * events and flushes them once loaded) and during SSR (no-op without a window;
 * also a no-op when no key is configured, since posthog is never initialised).
 */
export type AnalyticsEvent =
  | "case_click"
  | "nav_click"
  | "social_click"
  | "case_view";

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  posthog.capture(event, props);
}
