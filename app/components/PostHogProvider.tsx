"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

/**
 * PostHog analytics — client-only. Initialised once on mount from the public
 * NEXT_PUBLIC_POSTHOG_* env vars (safe to expose: the project key is meant for
 * the browser). If the key is missing (e.g. local dev without .env.local) we
 * stay silent and skip init, so the site never breaks on a missing key.
 *
 * Pageviews are captured manually: the App Router does client-side navigation,
 * so posthog-js's automatic pageview (which fires on hard loads) would miss all
 * in-app route changes. We disable it and re-capture $pageview whenever the
 * pathname or query changes instead.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

if (typeof window !== "undefined" && key && !posthog.__loaded) {
  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // handled by PageviewTracker below
    capture_pageleave: true,
  });
}

// Fires a $pageview on every App Router navigation. useSearchParams forces a
// Suspense boundary, so this lives in its own component wrapped below.
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!key) return;
    let url = window.origin + pathname;
    const qs = searchParams.toString();
    if (qs) url += "?" + qs;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nothing to wire up when the key is absent — render children untouched.
  if (!key) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
