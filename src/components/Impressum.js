import React from "react";

function Impressum({ onBack }) {
  return (
    <div className="bc-card bc-info">
      <h2 className="bc-subtitle">Impressum</h2>
      <p>
        Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).
      </p>
      <p>
        <b>Lars Pongrac</b><br />
        Freiherr-vom-Stein-Straße 23<br />
        59379 Selm<br />
        Deutschland
      </p>
      <p>
        <b>Kontakt:</b><br />
        E-Mail: <a href="mailto:fikiri.info@icloud.com">fikiri.info@icloud.com</a>
      </p>
      <p>
        BrainChain wird von mir privat und nicht-kommerziell betrieben
        (keine Werbung, keine Bezahlfunktionen, keine gewerbliche Nutzung
        der App selbst).
      </p>
      <div className="bc-btn-row">
        <button className="bc-btn" onClick={onBack}>
          Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
}

export default Impressum;
