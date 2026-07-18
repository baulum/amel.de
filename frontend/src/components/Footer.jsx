export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="bg-[var(--bone)] text-[var(--ink)] px-6 md:px-10 pt-24 pb-10 border-t border-[var(--ink)]"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Giant word-mark */}
        <div className="font-display text-[22vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase text-balance">
          Amel&apos;s
          <br />
          <span className="text-[var(--rust)] italic font-normal">Team.</span>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-[var(--ink)] pt-10">
          <div className="col-span-12 md:col-span-3">
            <div className="mono text-[10px] uppercase tracking-widest text-[var(--muted-fg)] mb-2">
              Firma
            </div>
            <div className="font-display text-lg">Amel&apos;s Team GmbH</div>
            <div className="text-sm text-[var(--muted-fg)] mt-1">
              GmbH seit über 20 Jahren
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="mono text-[10px] uppercase tracking-widest text-[var(--muted-fg)] mb-2">
              Anschrift
            </div>
            <div className="text-sm leading-relaxed">
              Ravensburgerring 23
              <br />
              81243 München
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mono text-[10px] uppercase tracking-widest text-[var(--muted-fg)] mb-2">
              Kontakt
            </div>
            <a
              href="tel:+498987579385"
              className="text-sm block link-underline"
            >
              089 / 87579385
            </a>
            <a
              href="mailto:Info@amel.de"
              className="text-sm block link-underline mt-1"
            >
              Info@amel.de
            </a>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="mono text-[10px] uppercase tracking-widest text-[var(--muted-fg)] mb-2">
              Öffnungszeiten
            </div>
            <div className="text-sm">Mo – Sa</div>
            <div className="text-sm text-[var(--muted-fg)] mt-1">
              08:00 – 18:00 Uhr
            </div>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="mono text-[10px] uppercase tracking-widest text-[var(--muted-fg)] mb-2">
              Standort
            </div>
            <div className="text-sm">München — Bayern</div>
            <div className="mono text-xs mt-1 text-[var(--muted-fg)]">
              48.1351°N
              <br />
              11.5820°E
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs mono uppercase tracking-widest text-[var(--muted-fg)]">
          <div>© {year} Amel&apos;s Team GmbH — Alle Rechte vorbehalten.</div>
          <div className="flex items-center gap-6">
            <span className="link-underline cursor-default">Impressum</span>
            <span className="link-underline cursor-default">Datenschutz</span>
            <span>MUC · MADE WITH CARE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
