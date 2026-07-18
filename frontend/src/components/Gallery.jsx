import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "https://customer-assets-gfyr7b9c.emergentagent.net/job_munich-moves/artifacts/zczbk9za_40c1f3a6-8ff5-4b74-992e-ba494e2a32cc.jpeg",
    label: "Privater Umzug · Team im Einsatz",
    span: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1595867818082-083862f3d630?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxtdW5pY2glMjBjaXR5c2NhcGV8ZW58MHx8fHwxNzg0MzE2MDc3fDA&ixlib=rb-4.1.0&q=85",
    label: "Standort · München",
    span: "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-[3/4]",
  },
  {
    src: "https://customer-assets-gfyr7b9c.emergentagent.net/job_munich-moves/artifacts/ownpwf54_ca8e4021-5d58-4ae7-8b67-8ae6e95297b3.jpeg",
    label: "Vorher · Entrümpelung",
    span: "col-span-12 md:col-span-6 aspect-[4/5] md:aspect-[3/4]",
  },
  {
    src: "https://customer-assets-gfyr7b9c.emergentagent.net/job_munich-moves/artifacts/uodge2fd_ad228bd8-ab3b-4137-8d26-b01221b32738.jpeg",
    label: "Nachher · Besenrein",
    span: "col-span-12 md:col-span-6 aspect-[4/5] md:aspect-[3/4]",
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
