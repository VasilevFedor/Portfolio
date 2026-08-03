"use client";

import { useEffect, useState } from "react";

const TZ = "Europe/Moscow"; // St. Petersburg shares Moscow time

/** Hour (0–23) in St. Petersburg. */
function hourInSpb() {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: TZ,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  return h === 24 ? 0 : h;
}

/**
 * Little companion cat that mirrors the local time in St. Petersburg.
 * 8:00–23:59 → awake: eyes glance left/right and blink.
 * 00:00–07:59 → asleep: two z's drift up and fade.
 */
export default function Cat() {
  const [awake, setAwake] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const h = hourInSpb();
      setAwake(h >= 8 && h < 24);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Reserve the space before we know the time to avoid layout shift.
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[26px] shrink-0 text-muted"
    >
      {awake === null ? null : awake ? <CatAwake /> : <CatAsleep />}
    </span>
  );
}

function CatAwake() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full">
      {/* legs */}
      <path
        d="M5 15V13H3V15H5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.112245"
      />
      <path
        d="M9 15V13H7V15H9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.112245"
      />
      {/* body outline */}
      <path
        d="M18.8472 14.5204V16.5969H16.8268V15.8673H14.7502V16.5969H12.7298V17.3265H11.2145V18H2.29105V17.3265H1.61758V16.5969H1.00023V13.1735H1.61758V7.67347H2.29105V7H3.02064V7.67347H3.69411V8.40306H4.36758V9.02041H5.09717V9.75H6.44411V9.02041H7.22982V7.67347H7.84717V7H8.46451V7.67347H9.19411V8.40306H9.86758V9.02041H10.541V9.75H11.2145V10.4235H12.6176V11.0969H13.3472V11.8265H13.9645V14.5204H14.7502V13.8469H18.1176V14.5204H18.8472Z"
        stroke="currentColor"
      />
      {/* eyes — glance (translate) wraps blink (scaleY) */}
      <g className="cat-eyes">
        <g className="cat-eyes-lids">
          <path
            d="M4.22949 10.4354V9.91303H3.70708V9.39062H3.14114V10.9579H3.70708V10.4354H4.22949Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.261205"
          />
          <path
            d="M9.84717 10.6543V10.0884H9.36829V9.52241H8.80235V9H8.27994V10.0884H8.80235V10.6543H9.84717Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.261205"
          />
        </g>
      </g>
    </svg>
  );
}

function CatAsleep() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full">
      {/* legs */}
      <path
        d="M4.42383 15.2496V14.5762H2.3473V15.2496H4.42383Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.112245"
      />
      <path
        d="M9.19434 15.1935V14.5762H7.11781V15.1935H9.19434Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.112245"
      />
      {/* closed eye + body + closed eye */}
      <path
        d="M4.22949 10.4354V9.91303H3.70708V9.39062H3.14114V10.9579H3.70708V10.4354H4.22949Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.261205"
      />
      <path
        d="M18.8472 14.5204V16.5969H16.8268V15.8673H14.7502V16.5969H12.7298V17.3265H11.2145V18H2.29105V17.3265H1.61758V16.5969H1.00023V13.1735H1.61758V7.67347H2.29105V7H3.02064V7.67347H3.69411V8.40306H4.36758V9.02041H5.09717V9.75H6.44411V9.02041H7.22982V7.67347H7.84717V7H8.46451V7.67347H9.19411V8.40306H9.86758V9.02041H10.541V9.75H11.2145V10.4235H12.6176V11.0969H13.3472V11.8265H13.9645V14.5204H14.7502V13.8469H18.1176V14.5204H18.8472Z"
        stroke="currentColor"
      />
      <path
        d="M9.84717 10.6543V10.0884H9.36829V9.52241H8.80235V9H8.27994V10.0884H8.80235V10.6543H9.84717Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.261205"
      />
      {/* z's drifting up */}
      <path
        className="cat-z"
        d="M4.85547 6C4.68555 6 4.57812 5.89844 4.57812 5.74219C4.57812 5.66211 4.60352 5.59961 4.66992 5.51953L5.57812 4.40625V4.39258H4.83789C4.66797 4.39258 4.56836 4.29688 4.56836 4.13281C4.56836 3.96875 4.66797 3.87305 4.83789 3.87305H6.08008C6.26758 3.87305 6.38672 3.98633 6.38672 4.16406C6.38672 4.25977 6.35938 4.33203 6.29102 4.41992L5.47852 5.4668V5.48047H6.18359C6.35352 5.48047 6.45508 5.57617 6.45508 5.74023C6.45508 5.9043 6.35352 6 6.18359 6H4.85547Z"
        fill="currentColor"
      />
      <path
        className="cat-z cat-z-2"
        d="M8.0332 4C7.77832 4 7.61719 3.84766 7.61719 3.61328C7.61719 3.49316 7.65527 3.39941 7.75488 3.2793L9.11719 1.60938V1.58887H8.00684C7.75195 1.58887 7.60254 1.44531 7.60254 1.19922C7.60254 0.953125 7.75195 0.80957 8.00684 0.80957H9.87012C10.1514 0.80957 10.3301 0.979492 10.3301 1.24609C10.3301 1.38965 10.2891 1.49805 10.1865 1.62988L8.96777 3.2002V3.2207H10.0254C10.2803 3.2207 10.4326 3.36426 10.4326 3.61035C10.4326 3.85645 10.2803 4 10.0254 4H8.0332Z"
        fill="currentColor"
      />
    </svg>
  );
}
