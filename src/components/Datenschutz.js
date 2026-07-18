import React from "react";

function Datenschutz({ onBack }) {
  return (
    <div className="bc-card bc-info">
      <h2 className="bc-subtitle">Datenschutzerklärung</h2>

      <h3 style={{ marginBottom: 8 }}>1. Verantwortlicher</h3>
      <p>
        Lars Pongrac<br />
        Freiherr-vom-Stein-Straße 23<br />
        59379 Selm<br />
        E-Mail: <a href="mailto:fikiri.info@icloud.com">fikiri.info@icloud.com</a>
      </p>

      <h3 style={{ marginBottom: 8 }}>2. Kein Nutzerkonto, keine Registrierung</h3>
      <p>
        BrainChain funktioniert vollständig ohne Anmeldung. Es werden keine
        Namen, E-Mail-Adressen oder sonstigen Kontodaten von dir erhoben.
      </p>

      <h3 style={{ marginBottom: 8 }}>3. Hosting</h3>
      <p>
        Die App wird über Cloudflare, Inc. gehostet. Beim Aufruf der Seite
        verarbeitet Cloudflare technisch bedingt Server-Logfiles (u. a.
        IP-Adresse, Datum/Uhrzeit des Zugriffs, aufgerufene Datei), wie es
        bei jedem Webhosting-Anbieter üblich ist. Details entnimmst du der
        Datenschutzerklärung von Cloudflare:{" "}
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          cloudflare.com/privacypolicy
        </a>.
      </p>

      <h3 style={{ marginBottom: 8 }}>4. Lokale Speicherung im Browser</h3>
      <p>
        Dein Spielstand (Thema, Begriffe, Sätze, Einstellungen) wird
        ausschließlich lokal in deinem Browser gespeichert (localStorage),
        damit er einen Seiten-Reload übersteht. Diese Daten verlassen dein
        Gerät nicht und werden nicht an mich übertragen. Über den Button
        "Alle Daten zurücksetzen" im Hauptmenü kannst du sie jederzeit
        vollständig löschen.
      </p>

      <h3 style={{ marginBottom: 8 }}>5. Optionale QR-Code-Funktion (Firebase)</h3>
      <p>
        Nur wenn du im Menü die Option "Wortpaar per QR-Code auf anderen
        Geräten anzeigen" aktivierst, werden die beiden gerade zu
        verbindenden Begriffe sowie ein zufällig erzeugter Sitzungscode an
        die Firebase Realtime Database (Google Ireland Limited bzw. Google
        LLC, Serverstandort EU/europe-west1) übertragen, damit andere
        Geräte sie live mitverfolgen können. Es werden dabei keine Namen
        oder sonstigen personenbezogenen Daten übertragen. Die Sitzung wird
        gelöscht, sobald du ein neues Thema startest. Weitere Informationen:{" "}
        <a
          href="https://firebase.google.com/support/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          firebase.google.com/support/privacy
        </a>.
      </p>

      <h3 style={{ marginBottom: 8 }}>6. Anonyme Nutzungsstatistik (Firebase)</h3>
      <p>
        Um ein grobes Bild davon zu bekommen, wie oft BrainChain aufgerufen
        und genutzt wird, zählt die App bei jedem Öffnen sowie bei jedem
        Spielstart jeweils einen Zähler in der Firebase Realtime Database
        (Serverstandort EU/europe-west1) um eins hoch. Dabei werden keine
        IP-Adressen, Cookies, Geräte-Kennungen oder sonstige
        personenbezogenen Daten gespeichert - es entsteht lediglich eine
        anonyme Gesamtzahl (z. B. "240 App-Aufrufe insgesamt"), aus der
        sich keine Rückschlüsse auf einzelne Personen ziehen lassen.
      </p>

      <h3 style={{ marginBottom: 8 }}>7. PDF-Export</h3>
      <p>
        Der PDF-Export deiner Begriffskette wird vollständig lokal in
        deinem Browser erzeugt (jsPDF) und direkt auf deinem Gerät
        gespeichert - er wird nicht an mich oder Dritte übertragen.
      </p>

      <h3 style={{ marginBottom: 8 }}>8. Keine Cookies</h3>
      <p>
        BrainChain setzt keine Cookies ein. Es kommen keine
        personenbezogenen Tracking- oder Analyse-Tools (z. B. Google
        Analytics) zum Einsatz - die einzige Ausnahme ist der in Punkt 6
        beschriebene rein anonyme Zähler.
      </p>

      <h3 style={{ marginBottom: 8 }}>9. Deine Rechte</h3>
      <p>
        Nach Art. 15-21 DSGVO hast du das Recht auf Auskunft, Berichtigung,
        Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
        Widerspruch bezüglich der dich betreffenden Daten. Da BrainChain
        keine personenbezogenen Daten auf einem Server speichert (siehe
        Punkt 2 und 4) und die Nutzungsstatistik in Punkt 6 anonym ist,
        betrifft dies vor allem die in Punkt 5 genannte optionale
        Firebase-Nutzung. Wende dich dazu gerne per E-Mail an mich.
        Außerdem steht dir ein Beschwerderecht bei einer
        Datenschutz-Aufsichtsbehörde zu.
      </p>

      <div className="bc-btn-row">
        <button className="bc-btn" onClick={onBack}>
          Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
}

export default Datenschutz;
