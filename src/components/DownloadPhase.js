import React from "react";
import SentenceListItem from "./SentenceListItem";

function DownloadPhase({
  topic,
  sentences,
  onDownloadPdf,
  onBack,
  editingIndex,
  editingText,
  setEditingText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  scoringEnabled,
  totalScore,
  onSetPoints,
}) {
  return (
    <div className="bc-card bc-download">
      <h2 className="bc-subtitle">
        BrainChain – Begriffskette zu: {topic}
      </h2>
      {sentences.length === 0 ? (
        <div className="bc-empty-state">
          <span className="bc-empty-icon" aria-hidden="true">🔗</span>
          Noch keine Sätze erstellt.
        </div>
      ) : (
        <>
          {scoringEnabled && (
            <div className="bc-hint" style={{ marginBottom: 10 }}>
              Gesamtpunktzahl: {totalScore}
            </div>
          )}
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
          <button className="bc-btn bc-btn-main" onClick={onDownloadPdf}>
            Kette als PDF exportieren
          </button>
        </>
      )}
      <div className="bc-btn-row">
        <button className="bc-btn" onClick={onBack}>
          Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
}

export default DownloadPhase;
