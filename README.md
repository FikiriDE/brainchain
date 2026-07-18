# BrainChain

Eine kreative Lern-App, die assoziatives Denken fördert: Begriffe zu einem
Thema werden Schritt für Schritt durch selbst formulierte Sätze zu einer
"Begriffskette" verknüpft. Optimiert für PC und Tablet.

Live: https://brainchain.lars-pongrac.workers.dev/

## Funktionsumfang

- Begriffe zu einem beliebigen Thema sammeln (10–35 Stück, einzeln oder per
  Mehrfach-Import) und im Spielmodus schrittweise zu einer Kette verbinden
- Sätze lassen sich nachträglich bearbeiten
- Optionale Bepunktung der Wortverbindungen (1 Punkt für eine einfache,
  2 Punkte für eine komplexe inhaltslogische Verbindung)
- Optionale QR-Code-Live-Anzeige: andere Geräte scannen einmalig einen
  QR-Code und sehen danach live die aktuell zu verbindenden Begriffe
  (Synchronisierung über Firebase Realtime Database)
- Export der fertigen Kette als PDF
- Fortschritt bleibt über einen Browser-Reload hinweg erhalten
  (localStorage)
- Helles/dunkles Farbschema je nach Systemeinstellung

## Tech-Stack

- React (Create React App / react-scripts)
- jsPDF für den PDF-Export
- Firebase Realtime Database (per CDN eingebunden, siehe
  `public/index.html`) für die QR-Code-Live-Synchronisierung

## Lokale Entwicklung

```
npm install
npm start
```

Für die QR-Code-Funktion wird eine Firebase-Projekt-Config als
Umgebungsvariablen benötigt - siehe [`.env.example`](.env.example). Ohne
diese Variablen läuft die App weiterhin normal, nur die QR-Code-Anzeige
funktioniert dann nicht.

```
npm test    # Tests ausführen
npm run build   # Produktions-Build nach ./build
```

## Deployment

Die App wird automatisch über Cloudflare Pages aus dem `main`-Branch
gebaut und deployed. Die Firebase-Umgebungsvariablen sind dafür im
Cloudflare-Projekt unter Settings → Environment variables hinterlegt.
