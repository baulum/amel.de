import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/site";

export const metadata = {
  title: "Datenschutzerklärung – Amel's Team GmbH München",
  description: `Datenschutzerklärung von Amel's Team München: Erfahren Sie, welche Daten wir verarbeiten, wofür und welche Rechte Sie gemäß DSGVO haben.`,
  alternates: { canonical: "/datenschutz/" },
  openGraph: { url: "/datenschutz/" },
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return (
    <LegalPage eyebrow="§ Rechtliches" title="Datenschutz&shy;erklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
        Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <p>
        {COMPANY.name}
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.zip} {COMPANY.city}
        <br />
        Geschäftsführer: {COMPANY.managingDirector}
        <br />
        Telefon: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </p>

      <h2>2. Das Wichtigste in Kürze</h2>
      <ul>
        <li>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.</li>
        <li>Schriften und Bilder werden von unserem eigenen Server geladen, nicht von Drittanbietern.</li>
        <li>
          Personenbezogene Daten verarbeiten wir nur, wenn Sie uns über das
          Kontaktformular, per E-Mail oder telefonisch eine Anfrage senden – und
          nur, um diese Anfrage zu bearbeiten.
        </li>
      </ul>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei der Emergent Labs Inc., 2380 Via Espada,
        Pleasanton, CA 94566, USA, gehostet. Die Auslieferung erfolgt über das
        Content-Delivery-Netzwerk der Cloudflare, Inc., 101 Townsend St, San
        Francisco, CA 94107, USA.
      </p>
      <p>
        Beim Aufruf der Website werden technisch notwendige Daten verarbeitet, die
        Ihr Browser automatisch übermittelt:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite bzw. Datei und übertragene Datenmenge</li>
        <li>Referrer-URL (zuvor besuchte Seite)</li>
        <li>verwendeter Browser und Betriebssystem</li>
      </ul>
      <p>
        Diese Daten sind erforderlich, um die Website auszuliefern sowie ihre
        Stabilität und Sicherheit zu gewährleisten, etwa zur Abwehr von Angriffen.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes
        Interesse liegt im sicheren und fehlerfreien Betrieb der Website. Wir
        führen diese Daten nicht mit anderen Datenquellen zusammen und werten sie
        nicht zu Marketingzwecken aus.
      </p>
      <p>
        Mit den Dienstleistern bestehen Verträge zur Auftragsverarbeitung nach
        Art. 28 DSGVO. Da die Anbieter ihren Sitz in den USA haben, kann eine
        Übermittlung in die USA stattfinden. Cloudflare ist unter dem
        EU-US Data Privacy Framework zertifiziert (Angemessenheitsbeschluss nach
        Art. 45 DSGVO). Im Übrigen erfolgt die Übermittlung auf Grundlage der
        EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
      </p>

      <h2>4. Kontaktformular</h2>
      <p>
        Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir
        die von Ihnen eingegebenen Daten: Name, E-Mail-Adresse, Telefonnummer,
        gewünschte Leistung, Wunschtermin (optional) und Ihre Nachricht.
      </p>
      <p>
        Wir nutzen diese Daten ausschließlich, um Ihre Anfrage zu beantworten, eine
        Besichtigung zu vereinbaren und Ihnen ein Angebot zu erstellen.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung
        vorvertraglicher Maßnahmen auf Ihre Anfrage) sowie Art. 6 Abs. 1 lit. f
        DSGVO (unser berechtigtes Interesse an der Beantwortung von Anfragen).
      </p>
      <p>
        Die Anfrage wird in einer Datenbank bei unserem Hosting-Anbieter (siehe
        Abschnitt 3) gespeichert und zusätzlich per E-Mail an unser Postfach
        weitergeleitet. Für den E-Mail-Versand nutzen wir den Dienst Resend der
        Plus Five Five, Inc., USA. Resend ist unter dem EU-US Data Privacy
        Framework zertifiziert; zusätzlich bestehen EU-Standardvertragsklauseln.
      </p>
      <p>
        Die Angaben sind freiwillig. Ohne Name, Kontaktdaten und Nachricht können
        wir Ihre Anfrage jedoch nicht bearbeiten. Wir löschen Ihre Daten, sobald
        die Anfrage abschließend bearbeitet ist, spätestens nach sechs Monaten,
        sofern kein Auftrag zustande kommt. Kommt ein Auftrag zustande, bewahren
        wir die Daten so lange auf, wie es handels- und steuerrechtliche
        Aufbewahrungspflichten verlangen (in der Regel sechs bzw. zehn Jahre, § 257
        HGB, § 147 AO).
      </p>

      <h2>5. Kontakt per E-Mail oder Telefon</h2>
      <p>
        Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre
        Angaben (z. B. Name, Kontaktdaten, Inhalt Ihres Anliegens) zur Bearbeitung
        Ihrer Anfrage. Rechtsgrundlage und Speicherdauer entsprechen Abschnitt 4.
      </p>

      <h2>5a. Kontakt per WhatsApp</h2>
      <p>
        Auf dieser Website befindet sich ein Link, der WhatsApp auf Ihrem Gerät
        öffnet. Beim Aufruf der Seite werden dafür keine Daten an WhatsApp
        übertragen; erst wenn Sie den Link anklicken und uns eine Nachricht senden,
        verarbeitet WhatsApp (WhatsApp Ireland Limited bzw. Meta) Ihre Daten nach
        eigenen Datenschutzbestimmungen. Wir verarbeiten Ihre Nachricht zur
        Bearbeitung Ihrer Anfrage (Rechtsgrundlage Abschnitt 4).
      </p>

      <h2>6. SSL- bzw. TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw.
        TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an
        „https://“ in der Adresszeile Ihres Browsers. Daten, die Sie über das
        Kontaktformular senden, können dadurch nicht von Dritten mitgelesen werden.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>Sie haben uns gegenüber folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
      </ul>
      <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
      <p>
        Soweit wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
        verarbeiten, können Sie aus Gründen, die sich aus Ihrer besonderen
        Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einlegen.
      </p>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
      <h3>Beschwerderecht bei einer Aufsichtsbehörde</h3>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren. Für uns zuständig ist das Bayerische Landesamt für
        Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach,{" "}
        <a href="https://www.lda.bayern.de" rel="noopener noreferrer" target="_blank">
          www.lda.bayern.de
        </a>
        .
      </p>

      <h2>8. Automatisierte Entscheidungen</h2>
      <p>
        Wir setzen keine automatisierte Entscheidungsfindung einschließlich
        Profiling im Sinne von Art. 22 DSGVO ein.
      </p>

      <h2>9. Stand</h2>
      <p>
        Diese Datenschutzerklärung hat den Stand September 2026. Wir passen sie an,
        wenn sich die Website oder die rechtlichen Vorgaben ändern.
      </p>
    </LegalPage>
  );
}
