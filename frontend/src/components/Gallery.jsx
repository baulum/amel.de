"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "/images/umzug-team.jpg",
    label: "Privater Umzug · Team im Einsatz",
    alt: "Umzugsteam von Amel's Team beim Beladen des Umzugswagens in München",
    span: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/4]",
  },
  {
    src: "/images/muenchen.jpg",
    label: "Standort · München",
    alt: "Blick über die Münchner Innenstadt",
    span: "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-[3/4]",
  },
  {
    src: "/images/entruempelung-vorher.jpg",
    label: "Vorher · Entrümpelung",
    alt: "Vollgestellter Raum vor der Entrümpelung",
    span: "col-span-12 md:col-span-6 aspect-[4/5] md:aspect-[3/4]",
  },
  {
    src: "/images/entruempelung-nachher.jpg",
    label: "Nachher · Besenrein",
    alt: "Raum nach der Entrümpelung, besenrein übergeben",
    span: "col-span-12 md:col-span-6 aspect-[4/5] md:aspect-[3/4]",
  },
];

function GalleryImage({ src, label, alt, span, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
      className={`${span} relative overflow-hidden border border-[var(--border-c)] group`}
      data-testid={`gallery-item-${index}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="absolute inset-0 -top-[8%] -bottom-[8%] w-full h-[116%] object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <figcaption className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
        <div className="mono text-[10px] uppercase tracking-widest opacity-80">
          Nr. {String(index + 1).padStart(2, "0")}
        </div>
        <div className="font-display text-lg md:text-2xl mt-1">{label}</div>
      </figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  return (
    <section
      id="galerie"
      data-testid="gallery-section"
      className="px-6 md:px-10 py-24 md:py-40 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-4">
          <div className="mono text-xs uppercase tracking-widest text-[var(--muted-fg)]">
            § Galerie
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
            Ausschnitte aus dem Alltag —{" "}
            <span className="text-[var(--muted-fg)] italic font-normal">
              privater Umzug und Vorher/Nachher aus echten Entrümpelungen.
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {images.map((img, i) => (
          <GalleryImage key={img.src} {...img} index={i} />
        ))}
      </div>
    </section>
  );
}
