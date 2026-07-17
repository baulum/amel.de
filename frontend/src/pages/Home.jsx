import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      data-testid="home-page"
      className="min-h-screen bg-[var(--bone)] text-[var(--ink)] font-body"
    >
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Manifesto />
      <Gallery />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
