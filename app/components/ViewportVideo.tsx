"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster?: string; className?: string; eager?: boolean };

/** Prepare the next demo, but only play the one the visitor can see. */
export default function ViewportVideo({ src, poster, className, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    let disposed = false;
    const prepare = () => {
      if (video.getAttribute("src") === src) return;
      if (poster) video.poster = poster;
      video.preload = "auto";
      video.src = src;
      video.load();
    };
    const updatePlayback = () => {
      if (visible && !document.hidden) {
        prepare();
        void video.play().catch((error: DOMException) => {
          // A denied autoplay must not leave an unusable demo (e.g. iOS Low Power Mode).
          if (!disposed && error.name === "NotAllowedError") video.controls = true;
        });
      } else video.pause();
    };
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { prepare(); near.disconnect(); }
    }, { rootMargin: "600px 0px" });
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.05 });
    near.observe(video);
    view.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      disposed = true;
      near.disconnect(); view.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [src, poster]);

  return (
    <video
      ref={ref}
      src={eager ? src : undefined}
      poster={eager ? poster : undefined}
      preload={eager ? "auto" : "none"}
      muted
      loop
      playsInline
      aria-label="Project demonstration"
      className={className}
    />
  );
}
