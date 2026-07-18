import React from "react";

function MenuPhase({
  topic,
  setTopic,
  wordCount,
  setWordCount,
  sentences,
  scoringEnabled,
  setScoringEnabled,
  qrModeEnabled,
  setQrModeEnabled,
  onStartNewGame,
  onResetEverything,
  onDownload,
  onHelp,
  onInfo,
  onImpressum,
  onDatenschutz,
}) {
  return (
    <div className="bc-card bc-menu">
      <h1 className="bc-title">
        <span className="bc-logo-mark" aria-hidden="true">🔗</span>
        <span>BrainChain</span>
      </h1>
      <label className="bc-label">
        Thema:
        <input
          className="bc-input"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Thema eingeben"
        />
      </label>
      <label className="bc-label">
        Anzahl Begriffe:
        <input
          className="bc-input"
          type="number"
          min={10}
          max={35}
          value={wordCount}
          onChange={e => setWordCount(Number(e.target.value))}
        />
      </label>
      <label className="bc-label bc-checkbox-label">
        <input
          type="checkbox"
          checked={scoringEnabled}
          onChange={e => setScoringEnabled(e.target.checked)}
        />
        Bepunktung der Wortverbindungen aktivieren (optional)
      </label>
      <label className="bc-label bc-checkbox-label">
        <input
          type="checkbox"
          checked={qrModeEnabled}
          onChange={e => setQrModeEnabled(e.target.checked)}
        />
        Wortpaar per QR-Code auf anderen Geräten anzeigen (optional)
      </label>
      <div className="bc-btn-row">
        <button
          className="bc-btn bc-btn-main"
          onClick={onStartNewGame}
          disabled={!topic.trim()}
        >
          Begriffe eingeben & Spiel starten
        </button>
        <button
          className="bc-btn"
          onClick={onDownload}
          disabled={sentences.length === 0}
        >
          Kette downloaden
        </button>
        <button className="bc-btn" onClick={onHelp}>
          Spielanleitung
        </button>
        <button className="bc-btn" onClick={onInfo}>
          Über die App
        </button>
      </div>
      <button
        type="button"
        className="bc-danger-link"
        onClick={onResetEverything}
      >
        Alle Daten zurücksetzen
      </button>
      <div className="bc-footer-links">
        <button type="button" className="bc-footer-link" onClick={onImpressum}>
          Impressum
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" className="bc-footer-link" onClick={onDatenschutz}>
          Datenschutz
        </button>
      </div>
    </div>
  );
}

export default MenuPhase;
