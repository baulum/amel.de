"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#manifest", label: "Manifest" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[var(--bone)]/85 backdrop-blur-md border-b border-[var(--border-c)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <a
          href="/#top"
          data-testid="brand-link"
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-[var(--rust)] rounded-none" />
          <span className="font-display text-lg tracking-tight">
            Amel&apos;s Team
            <span className="text-[var(--muted-fg)] font-body font-normal ml-2 text-xs align-top mono">
              GmbH
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="link-underline text-sm uppercase tracking-widest text-[var(--ink)]/80 hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#kontakt"
          data-testid="nav-cta"
          className="hidden md:inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--bone)] px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-[var(--rust)] transition-colors duration-300"
        >
          Kostenlose Besichtigung
          <span className="inline-block w-1.5 h-1.5 bg-[var(--rust)] group-hover:bg-white" />
        </a>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Menü"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border-c)] bg-[var(--bone)]">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-display"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--bone)] px-5 py-3 text-xs uppercase tracking-widest w-max"
            >
              Kostenlose Besichtigung
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
