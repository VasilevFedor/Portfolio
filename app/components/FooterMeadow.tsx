// Sparse character stars in the negative space around the flowers.
const stars = [
  { x: 96, y: 64, size: 12 }, { x: 216, y: 30, size: 8 },
  { x: 748, y: 135, size: 11 }, { x: 36, y: 220, size: 8 },
  { x: 570, y: 412, size: 9 }, { x: 767, y: 293, size: 7 },
];

export default function FooterMeadow() {
  return (
    <svg className="footer-flowers__meadow" viewBox="0 0 800 533" aria-hidden="true">
      <g className="footer-flowers__stars">
        {stars.map(({ x, y, size }, index) => (
          <text key={index} x={x} y={y} fontSize={size} textAnchor="middle">
            <tspan x={x} dy={-size * 0.65}>.</tspan>
            <tspan x={x} dy={size * 0.75}>-+-</tspan>
            <tspan x={x} dy={size * 0.75}>&apos;</tspan>
          </text>
        ))}
      </g>
    </svg>
  );
}
