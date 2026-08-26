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
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-muted"
          >
            <path
              d="M13.405 3.24805C14.4593 3.07751 15.4614 3.76553 15.6814 4.81055L17.1414 11.7432L18.5515 6.27148C18.8036 5.293 19.746 4.65597 20.7478 4.78711L22.7332 5.04785C23.8071 5.18889 24.5741 6.15891 24.4626 7.23633L23.6443 15.1357C24.705 15.185 25.5496 16.0589 25.5496 17.1318V19.6885C25.5495 22.2183 24.5438 24.6452 22.7527 26.4336C20.9616 28.222 18.5321 29.2266 15.9998 29.2266C13.4676 29.2265 11.0388 28.2218 9.2478 26.4336C7.4567 24.6452 6.44999 22.2183 6.44995 19.6885V15.3994C6.44995 14.3908 7.20107 13.5402 8.2019 13.415L10.1433 13.1719L9.34839 5.82422C9.23393 4.76681 9.96749 3.80484 11.0173 3.63477L13.405 3.24805ZM11.3367 5.6084L12.238 13.9346L12.239 13.9385L12.6023 17.4219C12.714 18.4928 11.9576 19.4605 10.8914 19.6104L8.45581 19.9521C8.5224 21.855 9.30757 23.6662 10.6609 25.0176C12.0766 26.4312 13.997 27.2265 15.9998 27.2266C18.0026 27.2266 19.9238 26.4312 21.3396 25.0176C22.755 23.604 23.5495 21.6867 23.5496 19.6885V17.1318H16.9998V18.1885C17 18.9393 17.7548 19.6631 18.6941 19.6631H19.5339C20.0862 19.6631 20.5339 20.1108 20.5339 20.6631C20.5338 21.2153 20.0861 21.6631 19.5339 21.6631H18.6941C16.9064 21.6631 15 20.2836 14.9998 18.1885V15.1318H15.8113L13.7244 5.22266L11.3367 5.6084ZM8.44995 15.3994V17.9336L10.613 17.6299L10.3552 15.1602L8.44995 15.3994ZM18.3337 15.1318H21.6345L22.4724 7.03027L20.488 6.77051L18.3337 15.1318Z"
              fill="currentColor"
            />
          </svg>
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
