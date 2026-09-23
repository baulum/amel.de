import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/site";

export const metadata = {
  title: "Impressum – Amel's Team GmbH München",
  description: `Impressum von Amel's Team, dem Umzugsunternehmen in München. Handelsregisterauszug und Kontaktinformationen.`,
  alternates: { canonical: "/impressum/" },
  openGraph: { url: "/impressum/" },
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return (
    <LegalPage eyebrow="§ Rechtliches" title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {COMPANY.name}
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.zip} {COMPANY.city}
      </p>

      <h3>Vertreten durch den Geschäftsführer</h3>
      <p>{COMPANY.managingDirector}</p>

      <h3>Kontakt</h3>
      <p>
        Telefon: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </p>

      <h3>Registereintrag</h3>
      <p>
        Eintragung im Handelsregister
        <br />
        Registergericht: {COMPANY.registerCourt}
        <br />
        Registernummer: {COMPANY.registerNumber}
      </p>

      {COMPANY.vatId && (
        <>
          <h3>Umsatzsteuer-ID</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            {COMPANY.vatId}
          </p>
        </>
      )}

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
        keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
        nach den allgemeinen Gesetzen bleiben unberührt. Sobald uns eine konkrete
        Rechtsverletzung bekannt wird, entfernen wir die entsprechenden Inhalte
        umgehend.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot kann Links zu externen Websites Dritter enthalten, auf deren
        Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets der
        jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei
        Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
        entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser
        Website unterliegen dem deutschen Urheberrecht. Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
        des Urheberrechts bedürfen der schriftlichen Zustimmung der {COMPANY.name}.
      </p>

      <h3>Bildnachweis</h3>
      <p>
        Team- und Einsatzfotos: {COMPANY.name}. Weitere Fotos:{" "}
        <a href="https://unsplash.com" rel="noopener noreferrer" target="_blank">
          Unsplash
        </a>
        .
      </p>
    </LegalPage>
  );
}
