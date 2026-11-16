import ReferenceSky from "./hero-sky/ReferenceSky";
import assets from "./hero-sky/assets.json";

/** The reference sky, isolated from the portfolio's content and interactions. */
export default function HeroSky() {
  return (
    <div className="hero-sky" aria-hidden="true">
      <ReferenceSky assets={assets} />
    </div>
  );
}
