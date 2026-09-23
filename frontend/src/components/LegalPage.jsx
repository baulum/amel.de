import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function LegalPage({ eyebrow, title, children }) {
  return (
    <main className="min-h-screen bg-[var(--bone)] text-[var(--ink)] font-body">
      <Nav />
      <article className="px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32 max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
        <header className="col-span-12 md:col-span-4">
          <div className="mono text-xs uppercase tracking-widest text-[var(--muted-fg)] mb-6">
            {eyebrow}
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tighter">
            {title}
          </h1>
        </header>
        <div className="legal col-span-12 md:col-span-8 max-w-3xl">
          {children}
        </div>
      </article>
      <Footer />
    </main>
  );
}
