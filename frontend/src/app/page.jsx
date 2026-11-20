import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { SITE_URL, COMPANY } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "MovingCompany"],
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
      priceRange: "€€",
      foundingDate: "2004",
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
        { "@type": "Country", name: "Deutschland" },
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
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?s={search_term_string}`,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wie viel kostet ein Umzug in München?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Die Kosten für einen Umzug hängen von der Größe Ihrer Wohnung, der Entfernung und den erforderlichen Services ab. Wir bieten eine kostenlose Besichtigung an und erstellen einen Festpreis ohne versteckte Gebühren. Rufen Sie uns unter 089 / 87579385 an.",
          },
        },
        {
          "@type": "Question",
          name: "Bietet Amel's Team auch Entrümpelung an?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, wir bieten professionelle Entrümpelung und Haushaltsauflösung an. Wir räumen konsequent, sortieren fachgerecht und entsorgen umweltbewusst. Die Räume werden besenrein übergeben.",
          },
        },
        {
          "@type": "Question",
          name: "Macht Amel's Team auch Möbelmontage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, wir montieren Küchen, Schränke, Betten und Büromöbel fachgerecht. Das beinhaltet Demontage am alten Ort und präzise Montage am neuen Ort, inclusive Bohrarbeiten.",
          },
        },
      ],
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
      <WhatsAppCTA />
    </main>
  );
}
