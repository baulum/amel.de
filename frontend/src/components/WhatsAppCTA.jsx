"use client";

import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/site";

const href = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
  COMPANY.whatsappText
)}`;

export default function WhatsAppCTA() {
  const [visible, setVisible] = useState(false);

  // Erst nach dem Hero einblenden, damit er die erste Ansicht nicht überlagert.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!COMPANY.whatsappNumber) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-cta"
      aria-label="Per WhatsApp schreiben"
      tabIndex={visible ? 0 : -1}
      className={`fixed z-40 right-4 bottom-4 md:right-8 md:bottom-8 flex items-center gap-3 bg-[#1faa59] text-white pl-4 pr-4 md:pr-5 h-14 shadow-[0_4px_0_0_#111] transition-all duration-300 hover:bg-[#188a47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24Zm-3.07 4.3c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.16 1.75 2.67 4.23 3.74 2.07.89 2.49.72 2.94.67.45-.04 1.44-.59 1.64-1.16.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28-.25-.13-1.44-.71-1.66-.79-.22-.08-.39-.13-.55.12-.16.25-.63.79-.77.95-.14.17-.28.19-.53.06-.25-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.35-.76-1.84-.2-.48-.4-.42-.55-.42Z" />
      </svg>
      <span className="font-display text-sm uppercase tracking-widest hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
