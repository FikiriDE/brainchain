import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import InfoPage from "./components/InfoPage";
import MenuPhase from "./components/MenuPhase";
import WordsPhase from "./components/WordsPhase";
import GamePhase from "./components/GamePhase";
import DownloadPhase from "./components/DownloadPhase";
import HelpPhase from "./components/HelpPhase";
import PhaseStepper from "./components/PhaseStepper";
import WatchPage from "./components/WatchPage";
import Impressum from "./components/Impressum";
import Datenschutz from "./components/Datenschutz";
import "./App.css";

const STORAGE_KEY = "brainchain_state_v1";
const SESSION_ID_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function generateSessionId() {
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += SESSION_ID_CHARS[Math.floor(Math.random() * SESSION_ID_CHARS.length)];
  }
  return id;
}

function formatSentence(s) {
  const base = `(${s.a}) und (${s.b}): ${s.text}`;
  if (s.points == null) return base;
  return `${base} [${s.points} ${s.points === 1 ? "Punkt" : "Punkte"}]`;
}

function downloadPDF(title, sentences) {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);

  let y = 35;
  sentences.forEach((s, i) => {
    const lines = doc.splitTextToSize(`${i + 1}. ${formatSentence(s)}`, 180);
    doc.text(lines, 14, y);
    y += lines.length * 8 + 2;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  const anyScored = sentences.some((s) => s.points != null);
  if (anyScored) {
    const totalScore = sentences.reduce((sum, s) => sum + (s.points || 0), 0);
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.text(`Gesamtpunktzahl: ${totalScore}`, 14, y + 6);
  }

  doc.save("brainchain.pdf");
}

function App() {
  // Ein ?watch=SESSIONID in der URL zeigt statt der normalen App die
  // schlanke Zuschauer-Ansicht (siehe WatchPage) - einmalig beim Mount gelesen.
  const [watchSessionId] = useState(
    () => new URLSearchParams(window.location.search).get("watch")
  );

  // Beim ersten Rendern einmalig aus localStorage laden, damit ein Reload
  // mitten im Spiel nicht die gesamte Kette verwirft.
  const [initial] = useState(() => loadState() || {});

  const [phase, setPhase] = useState(initial.phase ?? "menu");
  const [topic, setTopic] = useState(initial.topic ?? "");
  const [wordCount, setWordCountRaw] = useState(initial.wordCount ?? 10);
  const [words, setWords] = useState(initial.words ?? []);
  const [newWord, setNewWord] = useState("");
  const [wordError, setWordError] = useState("");
  const [importWords, setImportWords] = useState("");
  const [importFeedback, setImportFeedback] = useState("");
  const [used, setUsed] = useState(initial.used ?? []);
  const [selected, setSelected] = useState(initial.selected ?? []);
  const [sentences, setSentences] = useState(initial.sentences ?? []);
  const [currentSentence, setCurrentSentence] = useState(initial.currentSentence ?? "");
  const [lastWord, setLastWord] = useState(initial.lastWord ?? null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [scoringEnabled, setScoringEnabled] = useState(initial.scoringEnabled ?? false);
  const [totalScore, setTotalScore] = useState(initial.totalScore ?? 0);
  const [qrModeEnabled, setQrModeEnabled] = useState(initial.qrModeEnabled ?? false);
  const [sessionId, setSessionId] = useState(initial.sessionId ?? null);
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    const toSave = {
      phase, topic, wordCount, words, used, selected, sentences, currentSentence, lastWord,
      scoringEnabled, totalScore, qrModeEnabled, sessionId,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // localStorage kann in privaten Tabs oder bei vollem Speicher fehlschlagen -
      // Persistenz ist ein Komfortfeature, kein Muss.
    }
  }, [phase, topic, wordCount, words, used, selected, sentences, currentSentence, lastWord, scoringEnabled, totalScore, qrModeEnabled, sessionId]);

  // Anonymer Nutzungszähler (kein Cookie, keine Nutzer-ID) - zählt nur
  // App-Aufrufe, keine Zuschauer-Ansicht. Scheitert er (z. B. Blocker),
  // bleibt das für die Nutzung der App folgenlos.
  useEffect(() => {
    if (watchSessionId || !window.brainchainFirebase) return;
    window.brainchainFirebase.trackEvent("appOpens");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Begriffspaar, das gerade verbunden wird (bzw. als nächstes verbunden werden
  // soll) - wird bei aktiviertem QR-Modus live nach Firebase geschrieben, damit
  // verbundene Handys es sofort anzeigen können, ohne neu zu scannen.
  const activePair = !lastWord
    ? (selected.length === 2 ? [selected[0], selected[1]] : null)
    : (selected.length === 1 ? [lastWord, selected[0]] : null);

  useEffect(() => {
    if (!qrModeEnabled || !sessionId || phase !== "game") return;
    if (!window.brainchainFirebase) {
      setSyncError(
        "Live-Synchronisierung nicht verfügbar (evtl. durch einen Werbe-/Trackingblocker verhindert)."
      );
      return;
    }
    const [a, b] = activePair || [null, null];
    Promise.resolve(window.brainchainFirebase.setWords(sessionId, a, b))
      .then(() => setSyncError(""))
      .catch(() =>
        setSyncError(
          "Live-Synchronisierung fehlgeschlagen. Möglicherweise sind die Firebase-Sicherheitsregeln abgelaufen."
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrModeEnabled, sessionId, phase, selected, lastWord]);

  function resetAll() {
    if (sessionId && window.brainchainFirebase) {
      window.brainchainFirebase.removeSession(sessionId);
    }
    setWords([]);
    setNewWord("");
    setWordError("");
    setImportWords("");
    setImportFeedback("");
    setUsed([]);
    setSelected([]);
    setSentences([]);
    setCurrentSentence("");
    setLastWord(null);
    setEditingIndex(null);
    setEditingText("");
    setTotalScore(0);
    setSessionId(null);
    setSyncError("");
  }

  function resetEverything() {
    const ok = window.confirm(
      "Wirklich alle gespeicherten Daten löschen? Thema, Begriffe, Sätze und Einstellungen gehen dabei unwiderruflich verloren."
    );
    if (!ok) return;
    resetAll();
    setTopic("");
    setWordCountRaw(10);
    setScoringEnabled(false);
    setQrModeEnabled(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage evtl. nicht verfügbar - kein Problem, es gibt ohnehin
      // nichts mehr zu löschen.
    }
  }

  function startNewGame() {
    if (sentences.length > 0) {
      const ok = window.confirm(
        "Es gibt eine noch nicht heruntergeladene Begriffskette. Wenn du jetzt ein neues Thema startest, geht sie verloren. Trotzdem fortfahren?"
      );
      if (!ok) return;
    }
    resetAll();
    setPhase("words");
  }

  function setWordCount(n) {
    setWordCountRaw(n);
    // Wurden bereits mehr Begriffe gesammelt als die neue Anzahl erlaubt,
    // werden die überzähligen automatisch abgeschnitten statt den
    // "Spiel starten"-Button stillschweigend deaktiviert zu lassen.
    if (words.length > n) {
      setWords(words.slice(0, n));
    }
  }

  function shuffle(arr) {
    return arr
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  function addWord(word) {
    const trimmed = word.trim();
    if (!trimmed) return "empty";
    if (words.length >= wordCount) return "limit";
    const alreadyExists = words.some(
      (w) => w.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return "duplicate";
    setWords([...words, trimmed]);
    return "ok";
  }

  function handleAddNewWord() {
    const result = addWord(newWord);
    if (result === "ok") {
      setNewWord("");
      setWordError("");
    } else if (result === "duplicate") {
      setWordError(`"${newWord.trim()}" wurde bereits hinzugefügt.`);
    } else if (result === "limit") {
      setWordError("Maximale Anzahl an Begriffen bereits erreicht.");
    } else {
      setWordError("");
    }
  }

  function handleNewWordChange(value) {
    setNewWord(value);
    if (wordError) setWordError("");
  }

  function handleImport() {
    const candidates = importWords
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
    const availableSlots = wordCount - words.length;
    const seen = new Set(words.map((w) => w.toLowerCase()));
    const toAdd = [];
    let duplicateCount = 0;
    let skippedForSpace = 0;
    for (const candidate of candidates) {
      const key = candidate.toLowerCase();
      if (seen.has(key)) {
        duplicateCount++;
        continue;
      }
      if (toAdd.length >= availableSlots) {
        skippedForSpace++;
        continue;
      }
      seen.add(key);
      toAdd.push(candidate);
    }
    setWords([...words, ...toAdd]);
    setImportWords("");
    if (duplicateCount > 0 || skippedForSpace > 0) {
      const parts = [];
      if (duplicateCount > 0) {
        parts.push(`${duplicateCount} bereits vorhanden`);
      }
      if (skippedForSpace > 0) {
        parts.push(`${skippedForSpace} kein Platz mehr`);
      }
      setImportFeedback(
        `${toAdd.length} Begriffe hinzugefügt, ${parts.join(", ")}.`
      );
    } else {
      setImportFeedback("");
    }
  }

  function handleWordClick(word) {
    if (used.includes(word)) return;
    if (!lastWord) {
      if (selected.length < 2 && !selected.includes(word)) {
        setSelected([...selected, word]);
      }
    } else {
      if (selected.length === 0 && word !== lastWord) {
        setSelected([word]);
      }
    }
  }

  function handleSentenceSubmit() {
    let entry;
    if (!lastWord) {
      entry = { a: selected[0], b: selected[1], text: currentSentence, points: null };
      setUsed([selected[0], selected[1]]);
      setLastWord(selected[1]);
    } else {
      entry = { a: lastWord, b: selected[0], text: currentSentence, points: null };
      setUsed([...used, selected[0]]);
      setLastWord(selected[0]);
    }
    setSentences([...sentences, entry]);
    setSelected([]);
    setCurrentSentence("");
    // setUsed/setLastWord oben wirken erst im nächsten Render, `used` und
    // `lastWord` sind hier also noch der alte Stand. Runde 1 verkettet 2
    // Begriffe, jede weitere Runde genau 1 - daher der Offset statt eines
    // direkten Zugriffs auf die (noch nicht aktualisierte) Wortliste.
    if (used.length + (lastWord ? 1 : 2) >= words.length) {
      setPhase("end");
    }
  }

  function startEditSentence(i) {
    setEditingIndex(i);
    setEditingText(sentences[i].text);
  }

  function saveEditSentence() {
    if (!editingText.trim()) return;
    const next = sentences.slice();
    next[editingIndex] = { ...next[editingIndex], text: editingText.trim() };
    setSentences(next);
    setEditingIndex(null);
    setEditingText("");
  }

  function cancelEditSentence() {
    setEditingIndex(null);
    setEditingText("");
  }

  function setSentencePoints(i, points) {
    const next = sentences.slice();
    const prevPoints = next[i].points;
    next[i] = { ...next[i], points };
    setSentences(next);
    setTotalScore(totalScore - (prevPoints || 0) + (points || 0));
  }

  if (watchSessionId) {
    return <WatchPage sessionId={watchSessionId} />;
  }

  return (
    <div className="bc-root">
      {(phase === "menu" || phase === "words" || phase === "game") && (
        <PhaseStepper current={phase} />
      )}

      {phase === "menu" && (
        <MenuPhase
          topic={topic}
          setTopic={setTopic}
          wordCount={wordCount}
          setWordCount={setWordCount}
          sentences={sentences}
          scoringEnabled={scoringEnabled}
          setScoringEnabled={setScoringEnabled}
          qrModeEnabled={qrModeEnabled}
          setQrModeEnabled={setQrModeEnabled}
          onStartNewGame={startNewGame}
          onResetEverything={resetEverything}
          onDownload={() => setPhase("download")}
          onHelp={() => setPhase("help")}
          onInfo={() => setPhase("info")}
          onImpressum={() => setPhase("impressum")}
          onDatenschutz={() => setPhase("datenschutz")}
        />
      )}

      {phase === "words" && (
        <WordsPhase
          topic={topic}
          wordCount={wordCount}
          words={words}
          setWords={setWords}
          newWord={newWord}
          setNewWord={handleNewWordChange}
          wordError={wordError}
          onAddWord={handleAddNewWord}
          importWords={importWords}
          setImportWords={setImportWords}
          importFeedback={importFeedback}
          onImport={handleImport}
          onStartGame={() => {
            setWords(shuffle(words));
            if (qrModeEnabled) {
              setSessionId(generateSessionId());
            }
            if (window.brainchainFirebase) {
              window.brainchainFirebase.trackEvent("gamesStarted");
            }
            setPhase("game");
          }}
          onBack={() => setPhase("menu")}
        />
      )}

      {(phase === "game" || phase === "end") && (
        <GamePhase
          phase={phase}
          topic={topic}
          words={words}
          used={used}
          selected={selected}
          lastWord={lastWord}
          currentSentence={currentSentence}
          setCurrentSentence={setCurrentSentence}
          sentences={sentences}
          onWordClick={handleWordClick}
          onSentenceSubmit={handleSentenceSubmit}
          onBack={() => setPhase("menu")}
          onEndGame={() => setPhase("end")}
          onDownload={() => setPhase("download")}
          editingIndex={editingIndex}
          editingText={editingText}
          setEditingText={setEditingText}
          onStartEdit={startEditSentence}
          onSaveEdit={saveEditSentence}
          onCancelEdit={cancelEditSentence}
          scoringEnabled={scoringEnabled}
          totalScore={totalScore}
          onSetPoints={setSentencePoints}
          qrModeEnabled={qrModeEnabled}
          sessionId={sessionId}
          syncError={syncError}
        />
      )}

      {phase === "download" && (
        <DownloadPhase
          topic={topic}
          sentences={sentences}
          onDownloadPdf={() =>
            downloadPDF(`BrainChain – Begriffskette zu: ${topic}`, sentences)
          }
          onBack={() => setPhase("menu")}
          editingIndex={editingIndex}
          editingText={editingText}
          setEditingText={setEditingText}
          onStartEdit={startEditSentence}
          onSaveEdit={saveEditSentence}
          onCancelEdit={cancelEditSentence}
          scoringEnabled={scoringEnabled}
          totalScore={totalScore}
          onSetPoints={setSentencePoints}
        />
      )}

      {phase === "help" && <HelpPhase onBack={() => setPhase("menu")} />}

      {phase === "info" && <InfoPage onBack={() => setPhase("menu")} />}

      {phase === "impressum" && (
        <Impressum onBack={() => setPhase("menu")} />
      )}

      {phase === "datenschutz" && (
        <Datenschutz onBack={() => setPhase("menu")} />
      )}
    </div>
  );
}

export default App;
