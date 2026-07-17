import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Anfrage",
    body: "Sie senden uns Ihre Eckdaten — Adresse, Zimmer, Termin. Wir melden uns innerhalb von 24 Stunden.",
  },
  {
    n: "02",
    title: "Besichtigung",
    body: "Kostenlos, unverbindlich, in München und Umgebung. Wir sehen uns Ihre Räume an und beraten ehrlich.",
  },
  {
    n: "03",
    title: "Festpreis",
    body: "Sie erhalten ein transparentes Festpreisangebot. Keine Überraschungen am Umzugstag.",
  },
  {
    n: "04",
    title: "Umzug",
    body: "Am Termin steht das Team pünktlich vor der Tür. Wir verpacken, tragen, transportieren, montieren.",
  },
  {
    n: "05",
    title: "Übergabe",
    body: "Alles am neuen Ort — besenrein, montiert, kontrolliert. Sie prüfen, wir übergeben.",
  },
];

export default function Process() {
  return (
    <section
      id="ablauf"
      data-testid="process-section"
      className="px-6 md:px-10 py-24 md:py-40 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-4">
          <div className="mono text-xs uppercase tracking-widest text-[var(--muted-fg)]">
            § Ablauf
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
            In fünf Schritten{" "}
            <span className="italic font-normal text-[var(--rust)]">
              vom ersten Anruf
            </span>{" "}
            bis zum neuen Zuhause.
          </h2>
        </div>
      </div>

      <ol className="border-t border-[var(--ink)]">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="grid grid-cols-12 gap-6 py-8 md:py-10 border-b border-[var(--border-c)] group hover:bg-[var(--muted)] transition-colors duration-500 -mx-6 md:-mx-10 px-6 md:px-10"
            data-testid={`process-step-${s.n}`}
          >
            <div className="col-span-3 md:col-span-2 font-display text-4xl md:text-6xl text-[var(--ink)]/25 group-hover:text-[var(--rust)] transition-colors duration-500">
              {s.n}
            </div>
            <div className="col-span-9 md:col-span-4">
              <h3 className="font-display text-2xl md:text-4xl tracking-tight">
                {s.title}
              </h3>
            </div>
            <div className="col-span-12 md:col-span-6 text-[var(--ink)]/80 leading-relaxed">
              {s.body}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
