import React from "react";

function WordsPhase({
  topic,
  wordCount,
  words,
  setWords,
  newWord,
  setNewWord,
  wordError,
  onAddWord,
  importWords,
  setImportWords,
  importFeedback,
  onImport,
  onStartGame,
  onBack,
}) {
  return (
    <div className="bc-card bc-words">
      <h2 className="bc-subtitle">Begriffe zu: {topic}</h2>
      {/* Einzelbegriff-Eingabe */}
      <div className="bc-word-input-row">
        <input
          className="bc-input"
          value={newWord}
          onChange={e => setNewWord(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") onAddWord();
          }}
          placeholder="Neuen Begriff eingeben"
        />
        <button className="bc-btn" onClick={onAddWord}>
          Hinzufügen
        </button>
      </div>
      {wordError && (
        <div className="bc-error" role="alert">
          {wordError}
        </div>
      )}
      {/* Mehrfach-Import */}
      <div className="bc-word-import-row" style={{ margin: "10px 0" }}>
        <input
          className="bc-input"
          value={importWords}
          onChange={e => setImportWords(e.target.value)}
          placeholder="Mehrere Begriffe, durch Komma getrennt"
          style={{ minWidth: 220 }}
        />
        <button className="bc-btn" onClick={onImport}>
          Begriffe importieren
        </button>
      </div>
      {importFeedback && <div className="bc-hint">{importFeedback}</div>}
      {words.length === 0 ? (
        <div className="bc-empty-state">
          <span className="bc-empty-icon" aria-hidden="true">📝</span>
          Noch keine Begriffe — leg los und füge deinen ersten hinzu!
        </div>
      ) : (
        <div className="bc-words-list">
          {words.map((w, i) => (
            <div key={i} className="bc-word-item">
              {w}
              <button
                className="bc-btn bc-btn-small"
                onClick={() => setWords(words.filter((x) => x !== w))}
                title="Entfernen"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="bc-hint">
        {words.length} / {wordCount} Begriffe eingegeben
      </div>
      <div className="bc-btn-row">
        <button
          className="bc-btn bc-btn-main"
          onClick={onStartGame}
          disabled={words.length !== wordCount}
        >
          Spiel starten
        </button>
        <button className="bc-btn" onClick={onBack}>
          Zurück
        </button>
      </div>
    </div>
  );
}

export default WordsPhase;
