import FastMarquee from "react-fast-marquee";

const items = [
  "Wohnungsumzüge",
  "Entrümpelungen",
  "Möbelmontage",
  "Fernumzüge",
  "Büroumzüge",
  "Klaviertransport",
  "Kartons & Verpackung",
  "Halteverbotszonen",
];

export default function Marquee() {
  return (
    <section
      data-testid="marquee-section"
      className="border-y border-[var(--ink)] bg-[var(--bone)] py-6 md:py-8 overflow-hidden"
    >
      <FastMarquee speed={38} gradient={false} pauseOnHover>
        {items.map((it, i) => (
          <span
            key={i}
            className="marquee-item font-display uppercase text-4xl md:text-6xl tracking-tight"
          >
            {it}
            <span className="inline-block w-3 h-3 bg-[var(--rust)] ml-6 align-middle" />
          </span>
        ))}
      </FastMarquee>
    </section>
  );
}
