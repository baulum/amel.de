import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1624137527136-66e631bdaa0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxtb3ZpbmclMjBib3hlc3xlbnwwfHx8fDE3ODQzMTYwNzd8MA&ixlib=rb-4.1.0&q=85",
    label: "Kartons · Verpackung",
    span: "col-span-12 md:col-span-7 aspect-[16/11]",
  },
  {
    src: "https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHw0fHxkZWxpdmVyeSUyMHRydWNrfGVufDB8fHx8MTc4NDMxNjA3N3ww&ixlib=rb-4.1.0&q=85",
    label: "Transport · Fernumzug",
    span: "col-span-12 md:col-span-5 aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1595867818082-083862f3d630?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxtdW5pY2glMjBjaXR5c2NhcGV8ZW58MHx8fHwxNzg0MzE2MDc3fDA&ixlib=rb-4.1.0&q=85",
    label: "Standort · München",
    span: "col-span-12 md:col-span-5 aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    label: "Nachher · besenrein",
    span: "col-span-12 md:col-span-7 aspect-[16/11]",
  },
];

function GalleryImage({ src, label, span, index }) {
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
        alt={label}
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
              zwischen Karton und Übergabe.
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
