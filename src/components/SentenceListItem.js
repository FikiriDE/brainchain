import React from "react";

function SentenceListItem({
  sentence,
  isEditing,
  editingText,
  setEditingText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  scoringEnabled,
  onSetPoints,
}) {
  if (isEditing) {
    return (
      <span className="bc-sentence-edit-row">
        <span className="bc-chain-word">{sentence.a}</span>
        <span className="bc-chain-link" aria-hidden="true">🔗</span>
        <span className="bc-chain-word">{sentence.b}</span>
        {sentence.points != null && (
          <span
            className={
              "bc-points-badge" +
              (sentence.points === 2 ? " bc-points-badge-complex" : "")
            }
          >
            +{sentence.points} {sentence.points === 1 ? "Punkt" : "Punkte"}
          </span>
        )}
        <input
          className="bc-input bc-sentence-edit-input"
          value={editingText}
          onChange={e => setEditingText(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") onSaveEdit();
            if (e.key === "Escape") onCancelEdit();
          }}
          autoFocus
        />
        <button
          className="bc-btn bc-btn-small bc-btn-save"
          onClick={onSaveEdit}
          disabled={!editingText.trim()}
          title="Speichern"
        >
          ✓
        </button>
        <button
          className="bc-btn bc-btn-small"
          onClick={onCancelEdit}
          title="Abbrechen"
        >
          ×
        </button>
      </span>
    );
  }

  return (
    <span className="bc-sentence-chain">
      <span className="bc-chain-word">{sentence.a}</span>
      <span className="bc-chain-link" aria-hidden="true">🔗</span>
      <span className="bc-chain-word">{sentence.b}</span>
      {sentence.points != null && (
        <span
          className={
            "bc-points-badge" +
            (sentence.points === 2 ? " bc-points-badge-complex" : "")
          }
        >
          +{sentence.points} {sentence.points === 1 ? "Punkt" : "Punkte"}
        </span>
      )}
      <span className="bc-chain-text">: {sentence.text}</span>
      <button
        className="bc-btn bc-btn-small bc-btn-edit"
        onClick={onStartEdit}
        title="Satz bearbeiten"
      >
        ✎
      </button>
      {scoringEnabled && sentence.points == null && (
        <span className="bc-rate-row" role="group" aria-label="Verbindung bewerten">
          <button
            type="button"
            className="bc-btn bc-btn-small bc-rate-btn"
            onClick={() => onSetPoints(1)}
          >
            1 Punkt
          </button>
          <button
            type="button"
            className="bc-btn bc-btn-small bc-rate-btn bc-rate-btn-complex"
            onClick={() => onSetPoints(2)}
          >
            2 Punkte
          </button>
        </span>
      )}
    </span>
  );
}

export default SentenceListItem;
