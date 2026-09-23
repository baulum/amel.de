"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";

const HERO_IMG = "/images/hero-wohnung.jpg";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: {
      duration: 1.1,
      delay: 0.2 + i * 0.12,
      ease: [0.7, 0, 0.2, 1],
    },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      id="top"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-16 px-6 md:px-10 overflow-hidden"
    >
      {/* Meta strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between text-xs uppercase tracking-widest text-[var(--muted-fg)]"
      >
        <div className="flex items-center gap-2">
          <MapPin size={12} />
          <span className="mono">48.1351° N / 11.5820° E</span>
        </div>
        <div className="mono">MUC — MÜNCHEN</div>
        <div className="hidden md:block mono">EST. 2004 · GMBH</div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto mt-8 md:mt-16 grid grid-cols-12 gap-6 items-end">
        {/* Massive headline */}
        <motion.div style={{ y: textY }} className="col-span-12 md:col-span-8">
          <h1
            data-testid="hero-headline"
            className="font-display leading-[0.85] tracking-tighter text-[16vw] md:text-[11.5vw] uppercase text-balance"
          >
            <span className="line-mask">
              <motion.span
                custom={0}
                variants={line}
                initial="hidden"
                animate="show"
                className="block"
              >
                Wir bewegen
              </motion.span>
            </span>{" "}
            <span className="line-mask">
              <motion.span
                custom={1}
                variants={line}
                initial="hidden"
                animate="show"
                className="block text-[var(--rust)] italic font-normal"
                style={{ fontStyle: "italic" }}
              >
                München.
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Right side chip */}
        <div className="col-span-12 md:col-span-4 md:pl-6 md:pb-4">
          <div className="line-mask">
            <motion.p
              custom={2}
              variants={line}
              initial="hidden"
              animate="show"
              className="text-sm md:text-base leading-relaxed text-[var(--ink)]/85 max-w-sm"
            >
              Ihr Umzugsunternehmen in München, seit über zwanzig Jahren. Umzüge,
              Entrümpelung, Montage — nah, fern und&nbsp;europaweit. Bayerische Präzision, ehrliches Handwerk.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Image + numbers row */}
      <div className="max-w-[1600px] mx-auto mt-14 md:mt-24 grid grid-cols-12 gap-6 items-end">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          className="col-span-12 md:col-span-7 relative"
        >
          <div className="relative overflow-hidden aspect-[16/10] border border-[var(--border-c)]">
            <motion.img
              src={HERO_IMG}
              alt="Leere, helle Wohnung nach dem Umzug – bereit für den Neustart"
              fetchPriority="high"
              style={{ y, scale }}
              className="w-full h-full object-cover"
            />
            {/* Spotlight overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            <div className="absolute left-6 bottom-6 text-white">
              <div className="mono text-[10px] tracking-widest opacity-80">
                CHAPTER 00 · FRESH START
              </div>
              <div className="font-display text-2xl mt-1">Ein leerer Raum.</div>
            </div>
          </div>
        </motion.div>

        <div className="col-span-12 md:col-span-5 md:pl-6 grid grid-cols-3 gap-4 md:gap-6">
          {[
            { k: "20+", v: "Jahre Erfahrung" },
            { k: "8k+", v: "Umzüge realisiert" },
            { k: "100%", v: "Versichert" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.15, duration: 0.7 }}
              className="border-t border-[var(--ink)] pt-4"
              data-testid={`hero-stat-${i}`}
            >
              <div className="font-display text-3xl md:text-5xl">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[var(--muted-fg)]">
                {s.v}
              </div>
            </motion.div>
          ))}

          <div className="col-span-3 mt-8 flex items-center gap-4">
            <a
              href="#kontakt"
              data-testid="hero-cta-primary"
              className="group relative inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bone)] px-6 py-4 text-xs uppercase tracking-widest overflow-hidden"
            >
              <span className="relative z-10">Kostenloses Angebot</span>
              <span className="relative z-10 w-6 h-px bg-current" />
              <span className="absolute inset-0 bg-[var(--rust)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]" />
            </a>
            <a
              href="#leistungen"
              data-testid="hero-cta-secondary"
              className="link-underline text-xs uppercase tracking-widest"
            >
              Leistungen entdecken
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-6 md:left-10 flex items-center gap-2 text-xs uppercase tracking-widest mono"
      >
        <ArrowDown size={12} className="animate-bounce" />
        Scrollen
      </motion.div>
    </section>
  );
}
