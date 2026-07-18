import React from "react";
import "../App.css";

function InfoPage({ onBack }) {
  return (
    <div className="bc-card bc-info">
      <h2 className="bc-subtitle">Über BrainChain</h2>
      <p>
        <b>BrainChain</b> ist eine kreative Web-App, die das assoziative Denken und die Teamarbeit fördert.
        Ziel ist es, Begriffe zu einem Thema durch sinnvolle Sätze miteinander zu verknüpfen und so eine „Kette“ zu bilden.
        Die App funktioniert komplett im Browser und speichert deinen Fortschritt lokal in deinem Browser, damit er auch nach einem Neuladen erhalten bleibt.
      </p>
      <ul>
        <li>Individuell oder gemeinsam Begriffe sammeln</li>
        <li>Interaktive Ketten bauen und exportieren</li>
        <li>Fördert Kreativität, Sprache und logisches Denken</li>
      </ul>
      <p>
        <b>Optimiert für PC und Tablet.</b> Auf dem Smartphone ist die App
        aufgrund der vielen gleichzeitig sichtbaren Begriffe nur eingeschränkt
        nutzbar.
      </p>
      <hr style={{ margin: "24px 0" }} />
      <h3 style={{ marginBottom: 8 }}>Lizenz</h3>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a
          href="https://open-educational-resources.de/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: "none" }}
        >
          <img
            src="/oer-logo.svg"
            alt="Open Educational Resources"
            style={{ width: 64, height: "auto" }}
          />
        </a>
        <p style={{ margin: 0, fontSize: "0.9em" }}>
          Alle Inhalte dieser App stehen, soweit nicht anders angegeben,
          unter der Lizenz{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>{" "}
          (Namensnennung, nicht-kommerziell, Weitergabe unter gleichen
          Bedingungen) und dürfen für nicht-kommerzielle Bildungszwecke frei
          genutzt und angepasst werden. Mehr über offene Lizenzen im
          Bildungsbereich erfährst du bei der{" "}
          <a
            href="https://open-educational-resources.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Informationsstelle OERinfo
          </a>.
        </p>
      </div>
      <hr style={{ margin: "24px 0" }} />
      <h3 style={{ marginBottom: 8 }}>Entwicklung & Kontakt</h3>
      <p>
        <b>Entwicklung:</b> Fikiri<br />
        <b>Kontakt:</b> <a href="mailto:fikiri.info@icloud.com">fikiri.info@icloud.com</a><br />
        <b>App-Version:</b> 2.0
      </p>
      <p style={{ marginTop: 18, fontStyle: "italic" }}>
        Der Entwickler freut sich über Anregungen und Kritik!
      </p>
      <p>
        Gefällt dir BrainChain? Über eine freiwillige Unterstützung freue
        ich mich:{" "}
        <a
          href="https://paypal.me/LarsPongrac"
          target="_blank"
          rel="noopener noreferrer"
        >
          💛 paypal.me/LarsPongrac
        </a>
      </p>
      <div className="bc-btn-row">
        <button className="bc-btn" onClick={onBack}>
          Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
}

export default InfoPage;
