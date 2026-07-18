import React, { useEffect, useState } from "react";

function WatchPage({ sessionId }) {
  const [pair, setPair] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.brainchainFirebase) {
      setError(
        "Live-Synchronisierung nicht verfügbar (evtl. durch einen Werbe-/Trackingblocker verhindert)."
      );
      return;
    }
    setConnected(true);
    const unsubscribe = window.brainchainFirebase.subscribeWords(
      sessionId,
      (data, err) => {
        if (err) {
          setError(
            "Verbindung verloren. Möglicherweise sind die Firebase-Sicherheitsregeln abgelaufen."
          );
          return;
        }
        setError("");
        setPair(data);
      }
    );
    return unsubscribe;
  }, [sessionId]);

  return (
    <div className="bc-root">
      <div className="bc-card bc-watch">
        <h1 className="bc-title" style={{ fontSize: "1.8rem" }}>
          <span className="bc-logo-mark" aria-hidden="true">🔗</span>
          <span>BrainChain</span>
        </h1>
        <div className="bc-hint" style={{ marginBottom: 18 }}>
          Code: {sessionId}
        </div>
        {error ? (
          <div className="bc-error" role="alert">⚠️ {error}</div>
        ) : !connected ? (
          <div className="bc-hint">Verbinde…</div>
        ) : pair && pair.a && pair.b ? (
          <div className="bc-watch-pair">
            <span className="bc-chain-word bc-chain-word-big">{pair.a}</span>
            <span className="bc-chain-link bc-chain-link-big" aria-hidden="true">
              🔗
            </span>
            <span className="bc-chain-word bc-chain-word-big">{pair.b}</span>
          </div>
        ) : (
          <div className="bc-hint">Warte auf die nächste Wortverbindung…</div>
        )}
      </div>
    </div>
  );
}

export default WatchPage;
