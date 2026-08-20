import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import FanCarousel, { type FanPhoto } from "../components/FanCarousel";

export const metadata: Metadata = {
  title: "About — Fedor Vasiliev",
  description:
    "I'm a senior product designer with over 5 years of experience. I love sport, traveling, crafting things and product design.",
};

// Personal photos from the Framer /about page, fanned into the deck. Order
// interleaves travel shots with photos of Fedor so the centred card is him.
const photos: FanPhoto[] = [
  { src: "/img/about/01.jpg", alt: "Grand Palace temples in Bangkok" },
  { src: "/img/about/03.jpg", alt: "A monk looking out over the city" },
  { src: "/img/about/07.jpg", alt: "Turquoise beach lagoon in Thailand" },
  { src: "/img/about/02.jpg", alt: "Fedor with a bicycle by the sea" },
  { src: "/img/about/06.jpg", alt: "Fedor on the beach at sunset" },
  { src: "/img/about/04.jpg", alt: "Wat Arun temple stairs" },
  { src: "/img/about/05.jpg", alt: "On a boat with friends" },
  { src: "/img/about/08.jpg", alt: "Walking through a resort" },
];

export default function About() {
  return (
    // Mobile: exactly one screen, clipped on every edge so the fan can bleed
    // off the real screen edges. Desktop: natural min-h-screen, nothing clipped.
    <div className="mx-auto flex h-screen w-full max-w-[900px] flex-col overflow-clip px-6 sm:h-auto sm:min-h-screen sm:overflow-visible">
      <SiteHeader />

      <main className="flex flex-1 flex-col items-center justify-center pt-6 sm:pb-16">
        <div className="rise flex flex-col items-center text-center">
          <p className="t-sub uppercase tracking-[0.18em]">Nice to meet you</p>
          <h1 className="mt-3 text-[clamp(34px,6vw,52px)] font-semibold leading-[1.05] tracking-tight text-foreground">
            I&apos;m Fedor
          </h1>
          <p className="t-body mt-5 max-w-[520px]">
            I&apos;m a senior product designer with over 5 years of experience.
            I love sport, traveling, crafting things and product design.
          </p>
        </div>

        {/* Full-bleed on mobile: `-mx-6` cancels the page padding so the deck
            spans the whole viewport width and its side/bottom cards run off the
            true screen edges — the container's `overflow-clip` cuts them exactly
            at the edge, so no grey band shows. Desktop reverts to the padded,
            centred layout. */}
        <div className="relative -mx-6 mt-10 w-auto sm:mx-0 sm:mt-12 sm:w-full">
          <FanCarousel photos={photos} initial={3} />
        </div>
      </main>
    </div>
  );
}
