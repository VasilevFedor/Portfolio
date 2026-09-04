"use client";

import { useEffect } from "react";
import { track } from "../analytics";

/**
 * Fires a `case_view` once the reader has stayed on a case page for ≥10s —
 * our definition of an actual view (not a bounce). The timer is cleared on
 * unmount, so leaving earlier sends nothing. Renders no DOM.
 */
export default function CaseViewTracker({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    const id = window.setTimeout(() => {
      track("case_view", { case_slug: slug, case_title: title });
    }, 10000);
    return () => window.clearTimeout(id);
  }, [slug, title]);

  return null;
}
