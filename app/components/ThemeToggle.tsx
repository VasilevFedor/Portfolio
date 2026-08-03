"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-9 place-items-center rounded-full border border-border-subtle text-muted transition-colors duration-200 hover:text-foreground hover:bg-card"
    >
      {/* Avoid an icon mismatch before we know the real theme */}
      <span className={mounted ? "" : "opacity-0"}>
        {dark ? (
          // moon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          // sun
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </g>
          </svg>
        )}
      </span>
    </button>
  );
}
