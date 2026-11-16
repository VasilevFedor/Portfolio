import ReferenceSky from "./hero-sky/ReferenceSky";

/** The reference sky, isolated from the portfolio's content and interactions. */
export default function HeroSky() {
  return (
    <div className="hero-sky" aria-hidden="true">
      <ReferenceSky />
    </div>
  );
}
