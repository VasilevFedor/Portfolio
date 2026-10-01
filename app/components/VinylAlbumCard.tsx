"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface VinylAlbumCardProps {
  title?: string;
  artist?: string;
  releaseType?: string;
  year?: string;
  coverImage?: string;
  previewUrl?: string;
}

export default function VinylAlbumCard({
  title = "#3",
  artist = "Aphex Twin",
  releaseType = "Selected Ambient Works II",
  year = "1994",
  coverImage = "/img/aphex-selected-ambient-works-ii.jpg",
  previewUrl = "https://p.scdn.co/mp3-preview/fb49a7d2589b5c7c162c16e46daf69a087876cef",
}: VinylAlbumCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const playbackIcon = isPlaying ? (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4 3.5h3v9H4zM9 3.5h3v9H9z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="m5 3 8 5-8 5V3Z" fill="currentColor" />
    </svg>
  );

  return (
    <div className="relative h-10 w-full max-w-[420px] lg:h-[188px] lg:w-[180px]">
      <button
        type="button"
        className="group relative flex size-full select-none flex-row items-center text-left lg:flex-col lg:items-start"
        onClick={togglePlayback}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${title} by ${artist}`}
        aria-pressed={isPlaying}
      >
        <div className="relative z-10 flex h-[35px] w-[55px] shrink-0 items-center justify-start lg:size-32 lg:justify-center">
          <div className="absolute translate-x-[20px] lg:translate-x-[52px]">
            <motion.div
              className="relative flex size-[35px] items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-black lg:size-32"
              animate={{ rotate: isPlaying && !reduceMotion ? 360 : 0 }}
              transition={
                isPlaying && !reduceMotion
                  ? { duration: 2.4, ease: "linear", repeat: Infinity }
                  : { duration: 0.35 }
              }
            >
              {[1, 2, 4, 6, 8, 10, 12, 16].map((inset) => (
                <span
                  key={inset}
                  className="absolute rounded-full border border-white/10"
                  style={{ inset }}
                />
              ))}

              <div className="relative flex size-3 items-center justify-center overflow-hidden rounded-full bg-white lg:size-11">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt=""
                  className="absolute inset-0 size-full scale-105 object-cover"
                  draggable={false}
                />
                <span className="relative z-10 size-0.5 rounded-full bg-neutral-950 ring-1 ring-black/50 lg:size-1.5" />
              </div>

              <span className="pointer-events-none absolute inset-0 rotate-45 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay" />
            </motion.div>
          </div>

          <motion.div
            className="absolute z-20 size-[35px] overflow-hidden rounded-sm lg:size-32 lg:rounded-lg"
            initial={false}
            animate={{ rotate: -4, x: -8 }}
            whileHover={{ rotate: -5, scale: 0.98, x: -10 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={`${title} cover`}
              className="absolute inset-0 size-full scale-105 object-cover"
              draggable={false}
            />
          </motion.div>

          <span className="pointer-events-none relative z-30 hidden size-9 place-items-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur-sm lg:grid">
            {playbackIcon}
          </span>
        </div>

        <div className="z-30 ml-3 flex min-w-0 flex-1 flex-row items-center lg:ml-0 lg:mt-3 lg:w-40 lg:flex-none lg:flex-col lg:items-start">
          <div className="min-w-0 flex-1 lg:w-full lg:flex-none">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {title} — {artist}
            </h2>
            <p className="mt-1 text-xs font-medium text-muted">
              {releaseType} &bull; {year}
            </p>
          </div>
          <span className="ml-3 grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background lg:hidden">
            {playbackIcon}
          </span>
        </div>
      </button>

      <audio
        ref={audioRef}
        src={previewUrl}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
