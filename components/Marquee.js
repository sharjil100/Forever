export default function Marquee() {
  const text =
    'FOREVER \u00a0\u2014\u00a0 Clothing \u00a0\u2014\u00a0 Hoodies \u00a0\u2014\u00a0 T-Shirts \u00a0\u2014\u00a0 Sweatpants \u00a0\u2014\u00a0 Built to Last \u00a0\u2014\u00a0 Worn with Intention \u00a0\u2014\u00a0 ';

  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
