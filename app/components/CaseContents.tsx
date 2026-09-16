"use client";

import { useEffect, useState } from "react";

export type CaseContentsItem = {
  id: string;
  title: string;
  description: string;
};

const COLLAPSED_SCALE = 0.23;
const HOVER_SCALES = [1, 0.76, 0.54, 0.38];
const ITEM_STEP = 11;

export default function CaseContents({ items }: { items: CaseContentsItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [railTop, setRailTop] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.35;
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= marker) {
          current = item.id;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = items.at(-1)?.id ?? current;
      }

      const heading = document.querySelector("h1");
      if (heading) {
        const rect = heading.getBoundingClientRect();
        setRailTop(Math.max(32, rect.top + rect.height / 2 - 1.5));
      }

      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    const settleTimer = window.setTimeout(updateActiveSection, 700);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.clearTimeout(settleTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  const goToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveId(id);
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const previewIndex = hoveredIndex ?? focusedIndex;
  const previewItem = previewIndex === null ? null : items[previewIndex];

  return (
    <nav
      aria-label="Case contents"
      onMouseLeave={() => setHoveredIndex(null)}
      data-ready={railTop !== null}
      className="fixed z-40 hidden flex-col gap-2 opacity-0 transition-opacity duration-200 data-[ready=true]:opacity-100 motion-reduce:transition-none min-[1100px]:flex"
      style={{
        left: 16,
        top: railTop ?? 32,
      }}
    >
      {items.map((item, index) => {
        const active = item.id === activeId;
        const distance = previewIndex === null ? null : Math.abs(previewIndex - index);
        const scale =
          distance === null
            ? COLLAPSED_SCALE
            : HOVER_SCALES[distance] ?? COLLAPSED_SCALE;
        const highlighted = active || previewIndex === index;

        return (
          <div className="relative flex h-[3px] w-[52px] items-center" key={item.id}>
            <button
              type="button"
              aria-label={`Go to ${item.title}`}
              aria-current={active ? "location" : undefined}
              onClick={() => goToSection(item.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              className="absolute left-0 top-1/2 flex h-[11px] w-full -translate-y-1/2 items-center focus-visible:outline-none"
            >
              <span
                className={`block h-[3px] w-full origin-left rounded-full transition-transform duration-200 ease-[var(--ease-out-strong)] motion-reduce:transition-none ${
                  highlighted ? "bg-foreground" : "bg-border-subtle"
                }`}
                style={{ transform: `scaleX(${scale})` }}
              />
            </button>
          </div>
        );
      })}

      <span
        aria-hidden="true"
        data-shown={previewItem !== null}
        className="pointer-events-none absolute left-[calc(100%+18px)] top-[1.5px] w-max max-w-[320px] rounded-2xl bg-card px-4 py-3 opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] data-[shown=true]:opacity-100 motion-reduce:transition-none"
        style={{
          transform: `translate(${previewItem ? 0 : -4}px, calc(${(previewIndex ?? 0) * ITEM_STEP}px - 50%))`,
        }}
      >
        <span className="t-writing-title block text-foreground">
          {previewItem?.title}
        </span>
      </span>
    </nav>
  );
}
