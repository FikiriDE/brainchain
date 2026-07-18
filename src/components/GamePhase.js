import React, { useState } from "react";
import SentenceListItem from "./SentenceListItem";
import QrCode from "./QrCode";

function GamePhase({
  phase,
  topic,
  words,
  used,
  selected,
  lastWord,
  currentSentence,
  setCurrentSentence,
  sentences,
  onWordClick,
  onSentenceSubmit,
  onBack,
  onEndGame,
  onDownload,
  editingIndex,
  editingText,
  setEditingText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  scoringEnabled,
  totalScore,
  onSetPoints,
  qrModeEnabled,
  sessionId,
  syncError,
}) {
  const [qrPanelOpen, setQrPanelOpen] = useState(false);
  const watchUrl =
    sessionId &&
    `${window.location.origin}${window.location.pathname}?watch=${sessionId}`;

  return (
    <div className="bc-game">
      <div className="bc-game-header">
        <h2 className="bc-subtitle">{topic}</h2>
        <div className="bc-btn-row">
          <button className="bc-btn" onClick={onBack}>
            {phase === "end" ? "Zurück zum Hauptmenü" : "Spiel abbrechen"}
          </button>
          {phase === "end" && (
            <button className="bc-btn" onClick={onDownload}>
              Kette downloaden
            </button>
          )}
          {phase === "game" && qrModeEnabled && sessionId && (
            <button
              className="bc-btn"
              onClick={() => setQrPanelOpen(!qrPanelOpen)}
              style={{ marginLeft: 10 }}
            >
              {qrPanelOpen ? "QR-Code ausblenden" : "QR-Code anzeigen"}
            </button>
          )}
          {phase === "game" && (
            <button
              className="bc-btn"
              onClick={onEndGame}
              style={{ marginLeft: 10 }}
            >
              Spiel vorzeitig beenden
            </button>
          )}
        </div>
      </div>

      {phase === "game" && qrModeEnabled && sessionId && syncError && (
        <div
          className="bc-error"
          role="alert"
          style={{ margin: "16px 38px 0 38px" }}
        >
          ⚠️ {syncError}
        </div>
      )}

      {phase === "game" && qrModeEnabled && sessionId && qrPanelOpen && (
        <div className="bc-qr-panel">
          <QrCode value={watchUrl} />
          <div className="bc-qr-info">
            <div className="bc-hint" style={{ margin: 0, textAlign: "left" }}>
              <b>Code: {sessionId}</b>
            </div>
            <div className="bc-hint" style={{ margin: 0, textAlign: "left" }}>
              QR-Code scannen, um die aktuellen Begriffe live auf einem
              anderen Gerät mitzuverfolgen.
            </div>
          </div>
        </div>
      )}

      {phase === "game" && (
        <div className="bc-progress-wrap">
          <div className="bc-progress-bar">
            <div
              className="bc-progress-fill"
              style={{ width: `${(used.length / words.length) * 100}%` }}
            />
          </div>
          <div className="bc-hint" style={{ margin: "4px 0 0 0" }}>
            {used.length} / {words.length} Begriffe verkettet
          </div>
          {scoringEnabled && (
            <div className="bc-hint" style={{ margin: "2px 0 0 0" }}>
              Punkte: {totalScore}
            </div>
          )}
        </div>
      )}

      <div className="bc-board">
        {words.map((w, i) => {
          const isUsed = used.includes(w);
          const isSelected = selected.includes(w);
          const isLast = lastWord === w;
          return (
            <div
              key={i}
              onClick={() => onWordClick(w)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onWordClick(w);
                }
              }}
              role="button"
              aria-pressed={isSelected}
              aria-disabled={isUsed}
              className={[
                "bc-board-word",
                isUsed ? "bc-board-word-used" : "",
                isSelected ? "bc-board-word-selected" : "",
                isLast ? "bc-board-word-last" : "",
              ].join(" ")}
              tabIndex={isUsed ? -1 : 0}
              style={{ pointerEvents: isUsed ? "none" : "auto" }}
            >
              {w}
            </div>
          );
        })}
      </div>
      <div className="bc-game-main">
        {phase === "end" ? (
          <h3 className="bc-success">Spiel beendet! 🎉</h3>
        ) : (
          <>
            <div className="bc-hint" style={{ marginBottom: 14 }}>
              <b>
                {lastWord
                  ? `Verbinde "${lastWord}" mit einem neuen Begriff`
                  : "Wähle zwei Begriffe für den ersten Satz"}
              </b>
            </div>
            {(selected.length === 2 || (lastWord && selected.length === 1)) && (
              <div className="bc-sentence-row">
                <input
                  className="bc-input"
                  style={{ flex: 1 }}
                  value={currentSentence}
                  onChange={e => setCurrentSentence(e.target.value)}
                  placeholder="Satz mit den ausgewählten Begriffen"
                />
                <button
                  className="bc-btn bc-btn-main"
                  onClick={onSentenceSubmit}
                  disabled={!currentSentence.trim()}
                >
                  Satz speichern & weiter
                </button>
              </div>
            )}
          </>
        )}
        <div className="bc-sentence-list">
          <b>Bisherige Sätze:</b>
          {sentences.length === 0 ? (
            <div className="bc-empty-state">
              <span className="bc-empty-icon" aria-hidden="true">🔗</span>
              Noch keine Verbindung — wähle zwei Begriffe, um die Kette zu starten.
            </div>
          ) : (
            <ol>
              {sentences.map((s, i) => (
                <li key={i}>
                  <SentenceListItem
                    sentence={s}
                    isEditing={editingIndex === i}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    onStartEdit={() => onStartEdit(i)}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                    scoringEnabled={scoringEnabled}
                    onSetPoints={(points) => onSetPoints(i, points)}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePhase;
