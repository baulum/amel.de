import { motion } from "framer-motion";

const chapters = [
  {
    n: "I",
    title: "Handschlag statt Kleingedrucktes.",
    body: "Fester Preis nach Besichtigung. Keine versteckten Kosten, keine Wortkosmetik. Was besprochen ist, wird geliefert.",
  },
  {
    n: "II",
    title: "Zeit ist ein Ort.",
    body: "Wir kommen pünktlich, arbeiten schnell und hinterlassen Ordnung. Ihre Wohnung ist bei uns keine Baustelle.",
  },
  {
    n: "III",
    title: "München im Blut.",
    body: "Von Schwabing bis Sendling, vom Altbau in Haidhausen bis zur Doppelhaushälfte in Grünwald — wir kennen die Stadt und ihre Treppenhäuser.",
  },
  {
    n: "IV",
    title: "Kein Möbelstück ist zu schwer.",
    body: "Klavier, Marmortisch, Panzerschrank. Was Sie mitnehmen wollen, tragen wir. Sicher verpackt, sauber transportiert.",
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifest"
      data-testid="manifesto-section"
      className="bg-[var(--ink)] text-[var(--bone)] px-6 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <div className="mono text-xs uppercase tracking-widest text-[var(--bone)]/60">
              § Manifest — Vier Kapitel
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
              Warum uns Kunden{" "}
              <span className="italic font-normal text-[var(--rust)]">
                weiterempfehlen.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
          {chapters.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className={`p-8 md:p-12 border-t border-[var(--bone)]/25 ${
                i % 2 === 0 ? "md:border-r md:border-[var(--bone)]/25" : ""
              }`}
              data-testid={`manifesto-chapter-${c.n}`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-6xl md:text-7xl leading-none text-[var(--rust)]">
                  {c.n}
                </span>
                <span className="mono text-[10px] uppercase tracking-widest text-[var(--bone)]/50">
                  Kapitel
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mb-4">
                {c.title}
              </h3>
              <p className="text-[var(--bone)]/75 leading-relaxed max-w-md">
                {c.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
