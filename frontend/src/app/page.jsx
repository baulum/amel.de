import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE_URL, COMPANY } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      "@id": `${SITE_URL}/#business`,
      name: COMPANY.name,
      alternateName: COMPANY.brand,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/favicon.svg`,
      description:
        "Umzugsunternehmen in München für Privat- und Firmenumzüge, Fern- und Auslandsumzüge, Entrümpelungen und Möbelmontage. Festpreis nach kostenloser Besichtigung.",
      telephone: COMPANY.phoneIntl,
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.street,
        postalCode: COMPANY.zip,
        addressLocality: COMPANY.city,
        addressRegion: "Bayern",
        addressCountry: "DE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "München" },
        { "@type": "State", name: "Bayern" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: [
          "Privatumzug in München",
          "Firmen- und Büroumzug",
          "Fern- und Auslandsumzug",
          "Entrümpelung und Haushaltsauflösung",
          "Möbel- und Küchenmontage",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: COMPANY.brand,
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function Home() {
  return (
    <main
      data-testid="home-page"
      className="min-h-screen bg-[var(--bone)] text-[var(--ink)] font-body"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
