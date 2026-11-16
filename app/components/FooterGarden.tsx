import FooterFlowers from "./FooterFlowers";

export default function FooterGarden() {
  return (
    <footer className="footer-garden" aria-label="Flower garden">
      <div className="footer-garden__cluster footer-garden__cluster--left">
        <FooterFlowers accents={false} sourceUrl="/img/footer-flowers/tulips-source.png" label="Gently sway the tulips" />
      </div>
      <div className="footer-garden__cluster footer-garden__cluster--center">
        <FooterFlowers label="Gently sway the cosmos" />
      </div>
      <div className="footer-garden__cluster footer-garden__cluster--right">
        <FooterFlowers mirrored accents={false} sourceUrl="/img/footer-flowers/callas-source.png" label="Gently sway the calla lilies" />
      </div>
    </footer>
  );
}
