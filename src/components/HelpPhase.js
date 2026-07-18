import React from "react";

function HelpPhase({ onBack }) {
  return (
    <div className="bc-card bc-help">
      <h2 className="bc-subtitle">BrainChain – Spielanleitung</h2>
      <p>
        <b>Ziel:</b><br />
        Verbinde Begriffe zu einem Thema durch sinnvolle Sätze zu einer Kette.
      </p>
      <p>
        <b>Ablauf:</b><br />
        1. Gib ein Thema und die gewünschte Anzahl an Begriffen ein.<br />
        2. Sammle die Begriffe (mind. 10, max. 35).<br />
        3. Im Spielmodus werden die Begriffe auf der Tafel angezeigt.<br />
        4. <b>Runde 1:</b> Wähle zwei beliebige Begriffe aus und verbinde sie durch einen Satz.<br />
        5. <b>Ab Runde 2:</b> Verbinde immer das zuletzt verwendete Wort mit einem neuen, noch nicht benutzten Begriff.<br />
        6. Bereits benutzte Begriffe werden ausgegraut und können nicht mehr gewählt werden.<br />
        7. Nach jeder Verbindung gibst du einen Satz ein, der die beiden Begriffe sinnvoll verbindet. Sätze lassen sich später über das Stift-Symbol noch einmal bearbeiten.<br />
        8. Am Ende kannst du die gesamte Kette als PDF exportieren.
      </p>
      <p>
        <b>Optionale Bepunktung:</b><br />
        Im Menü lässt sich "Bepunktung der Wortverbindungen aktivieren"
        anhaken. Nach dem Speichern eines Satzes kannst du die Verbindung
        dann direkt in der Liste mit 1 Punkt (einfache Verbindung) oder
        2 Punkten (komplexe Verbindung) bewerten. Die Gesamtpunktzahl wird
        währenddessen und auf der Download-Seite angezeigt.
      </p>
      <p>
        <b>Optionale QR-Code-Live-Anzeige:</b><br />
        Mit "Wortpaar per QR-Code auf anderen Geräten anzeigen" lässt sich
        im Spiel ein QR-Code einblenden. Wird er von einem anderen Gerät
        (z. B. einem Handy) gescannt, zeigt dieses live die aktuell zu
        verbindenden Begriffe an — praktisch für Gruppenarbeit, bei der
        nicht alle direkt vor dem Hauptgerät sitzen. Ein erneutes Scannen
        ist dabei nicht nötig, die Anzeige aktualisiert sich automatisch.
      </p>
      <hr style={{ margin: "24px 0" }} />
      <h3 style={{ marginBottom: 8 }}>Didaktischer Kommentar</h3>
      <p>
        BrainChain setzt auf die Methode der Assoziationskette und verbindet
        dabei zwei Lernschritte mit hohem Wiederholungswert:
      </p>
      <p>
        Bereits die Begriffsauswahl ist ein Lernschritt: Wenn die Lernenden
        die Schlüsselbegriffe eines Themas selbst benennen (von der Lehrkraft
        an der Tafel gesammelt), müssen sie zentrale Fachbegriffe von
        Nebensächlichem unterscheiden – eine Kompetenz, die oft unterschätzt
        wird, aber selbst zeigt, wie gut ein Thema durchdrungen wurde.
      </p>
      <p>
        Das eigentliche Verknüpfen ist ein Verständnistest: Zwei Begriffe
        lassen sich nur sinnvoll zu einer Kette verbinden, wenn das
        inhaltliche Verständnis wirklich vorhanden ist. Reines
        Auswendiglernen reicht nicht aus – wer die Zusammenhänge nicht
        verstanden hat, scheitert an der Kette. Damit wird aus dem Spiel
        unbemerkt eine Verständnisprüfung, die über bloßes Reproduzieren
        hinausgeht.
      </p>
      <p>
        Weil dabei Wissen aktiv abgerufen statt nur wiedererkannt werden
        muss, profitiert die Methode vom sogenannten Testing-Effekt: aktives
        Erinnern festigt Gelerntes nachhaltiger als passives Wiederlesen.
        Gleichzeitig ist die Methode schnell und flexibel einsetzbar – sie
        braucht kaum Vorbereitung und passt in jede Stundenphase, etwa als
        Einstieg oder Abschluss.
      </p>
      <p>
        Der PDF-Export der fertigen Kette macht das Ergebnis greifbar:
        ausgedruckt und in der Mappe abgeheftet, steht es später – etwa vor
        einer Klassenarbeit – als kompaktes Wiederholungsmaterial zur
        Verfügung.
      </p>
      <div className="bc-btn-row">
        <button className="bc-btn" onClick={onBack}>
          Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
}

export default HelpPhase;
