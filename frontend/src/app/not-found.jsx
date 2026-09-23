import Link from "next/link";

export const metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bone)] text-[var(--ink)] font-body flex items-center px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="mono text-xs uppercase tracking-widest text-[var(--muted-fg)] mb-6">
          § Fehler 404
        </div>
        <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tighter">
          Diese Seite ist{" "}
          <span className="italic font-normal text-[var(--rust)]">umgezogen.</span>
        </h1>
        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bone)] px-6 py-4 text-xs uppercase tracking-widest hover:bg-[var(--rust)] transition-colors duration-300"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
