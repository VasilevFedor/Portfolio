"use client";

import { useRef } from "react";
import { themeStorageKey } from "../theme";

export default function ThemeToggle() {
  const soundRef = useRef<HTMLAudioElement>(null);

  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      getComputedStyle(root).getPropertyValue("--background").trim(),
    );
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // The button still works when the browser disallows storage.
    }
    const sound = soundRef.current;
    if (sound) {
      sound.currentTime = 0;
      void sound.play().catch(() => {
        // The theme also works when playback is unavailable.
      });
    }
  }

  return (
    <button type="button" onClick={toggleTheme} className="theme-toggle">
      <audio ref={soundRef} src="/media/theme-toggle.wav" preload="auto" />
      <span className="theme-moon">
        <span className="sr-only">Switch to dark theme</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.2 14.1A8.5 8.5 0 0 1 9.9 3.8a8.5 8.5 0 1 0 10.3 10.3Z" />
        </svg>
      </span>
      <span className="theme-sun">
        <span className="sr-only">Switch to light theme</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
      </span>
    </button>
  );
}
