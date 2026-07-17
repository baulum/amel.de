import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Umzüge",
    subtitle: "Nah & Fern",
    desc: "Von der ersten Kiste bis zum letzten Handgriff. Wir planen, verpacken und transportieren — souverän, versichert und ohne Überraschungen. Innerhalb Münchens oder quer durch Europa.",
    bullets: [
      "Privat- & Firmenumzüge",
      "Verpackung inkl. Material",
      "Halteverbotszonen",
      "Klavier- & Schwerguttransporte",
    ],
  },
  {
    id: "02",
    title: "Entrümpelung",
    subtitle: "Besenrein & diskret",
    desc: "Wohnungen, Keller, Dachböden, Nachlässe. Wir räumen konsequent, sortieren fachgerecht und entsorgen umweltbewusst. Sie erhalten den Schlüssel zurück — besenrein.",
    bullets: [
      "Wohnungs- & Haushaltsauflösungen",
      "Messiwohnungen",
      "Nachlassauflösungen",
      "Wertanrechnung möglich",
    ],
  },
  {
    id: "03",
    title: "Montage",
    subtitle: "Auf- & Abbau",
    desc: "Küchen, Schränke, Betten, Büromöbel. Fachgerechte Demontage am alten und präzise Montage am neuen Ort. Werkzeuge, Erfahrung, ruhige Hand.",
    bullets: [
      "Küchen- & Schrankmontage",
      "Elektro- & Wasseranschlüsse (Partner)",
      "IKEA & Systemmöbel",
      "Bohrarbeiten inkl.",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="leistungen"
      data-testid="services-section"
      className="px-6 md:px-10 py-24 md:py-40 max-w-[1600px] mx-auto"
    >
      {/* Section header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-4">
          <div className="mono text-xs uppercase tracking-widest text-[var(--muted-fg)]">
            § Leistungen
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
            Drei Disziplinen.
            <br />
            <span className="text-[var(--muted-fg)]">
              Ein Anspruch: Sauber, pünktlich, ehrlich.
            </span>
          </h2>
        </div>
      </div>

      {/* Chapters */}
      <div>
        {services.map((s, idx) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
            className="grid grid-cols-12 gap-6 py-12 md:py-20 border-t border-[var(--ink)] group"
            data-testid={`service-${s.id}`}
          >
            <div className="col-span-12 md:col-span-2">
              <div className="font-display text-6xl md:text-7xl leading-none">
                {s.id}
                <span className="text-[var(--rust)]">.</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div className="mono text-xs uppercase tracking-widest text-[var(--muted-fg)] mb-3">
                {s.subtitle}
              </div>
              <h3 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tighter group-hover:text-[var(--rust)] transition-colors duration-500">
                {s.title}
              </h3>
            </div>

            <div className="col-span-12 md:col-span-4 md:pl-6">
              <p className="text-[var(--ink)]/85 leading-relaxed max-w-md">
                {s.desc}
              </p>
              <ul className="mt-6 space-y-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-[var(--ink)]/80"
                  >
                    <span className="mt-2 w-2 h-2 bg-[var(--rust)] flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-2 flex md:justify-end items-start">
              <a
                href="#kontakt"
                data-testid={`service-cta-${s.id}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest link-underline"
              >
                Anfragen
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.article>
        ))}
        <div className="border-t border-[var(--ink)]" />
      </div>
    </section>
  );
}
