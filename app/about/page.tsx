import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import FanCarousel, { type FanPhoto } from "../components/FanCarousel";
import VinylAlbumCard from "../components/VinylAlbumCard";

export const metadata: Metadata = {
  title: "About — Fedor Vasiliev",
  description:
    "I'm a senior product designer with over 5 years of experience. I love sport, traveling, crafting things and product design.",
};

// Personal photos from the Framer /about page. Order interleaves travel shots
// with photos of Fedor so the initially centred frame is him.
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
    // Keep About locked to one viewport: the WebGL rail still bleeds past the
    // centred column, but the page can no longer stop at an awkward Y offset.
    <div className="fixed inset-0 mx-auto flex h-screen w-full max-w-[900px] flex-col px-6">
      <div className="about-load">
        <SiteHeader />
      </div>

      <main className="flex min-h-0 flex-1 flex-col pt-0 lg:pt-6">
        <section className="relative z-10 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_180px] lg:gap-10">
          <div className="about-load about-load-delay-1 flex max-w-[570px] flex-col pt-0 lg:pt-6">
            <h1 className="t-body">
              I&apos;m Fedor
            </h1>
            <div className="mt-5 space-y-3">
              <p className="t-body font-semibold text-foreground">
                I&apos;m a senior product designer with over five years of
                experience, focused on turning complex problems into clear,
                thoughtful products. I love sports, traveling, and making
                things—both digital and physical.
              </p>
              <p className="t-body font-semibold text-foreground">
                Outside of work, I&apos;m a big Formula 1 fan and hope to
                experience a Grand Prix in person one day. I also play chess
                and enjoy winding down in the evening with a game.
              </p>
            </div>
          </div>

          <div className="about-load about-load-delay-2 w-full pt-1 lg:justify-self-end lg:pt-6">
            <VinylAlbumCard />
          </div>
        </section>

        {/* The WebGL gallery itself expands to 100vw so its lens distortion
            meets the real viewport edges on every breakpoint. */}
        <div className="about-load about-load-delay-3 relative -mx-6 mt-4 w-auto sm:mx-0 sm:w-full lg:mt-6">
          <FanCarousel photos={photos} initial={3} />
        </div>
      </main>
    </div>
  );
}
