import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("rendert das Hauptmenü mit dem BrainChain-Titel", () => {
  render(<App />);
  expect(screen.getByText("BrainChain")).toBeInTheDocument();
});

test("Spiel-starten-Button ist ohne Thema deaktiviert", () => {
  render(<App />);
  expect(
    screen.getByText("Begriffe eingeben & Spiel starten")
  ).toBeDisabled();
});

test("Spiel-starten-Button wird aktiv, sobald ein Thema eingegeben ist", () => {
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  expect(
    screen.getByText("Begriffe eingeben & Spiel starten")
  ).toBeEnabled();
});

test("ein neuer Begriff wird der Wortliste hinzugefügt", () => {
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  userEvent.click(screen.getByText("Begriffe eingeben & Spiel starten"));
  userEvent.type(screen.getByPlaceholderText("Neuen Begriff eingeben"), "Löwe");
  userEvent.click(screen.getByText("Hinzufügen"));
  expect(screen.getByText("Löwe")).toBeInTheDocument();
});

test("ein Begriff wird case-insensitive als Duplikat abgewiesen und zeigt eine Fehlermeldung", () => {
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  userEvent.click(screen.getByText("Begriffe eingeben & Spiel starten"));
  const wordInput = screen.getByPlaceholderText("Neuen Begriff eingeben");
  userEvent.type(wordInput, "Löwe");
  userEvent.click(screen.getByText("Hinzufügen"));
  userEvent.type(wordInput, "löwe");
  userEvent.click(screen.getByText("Hinzufügen"));
  expect(screen.getByText(/wurde bereits hinzugefügt/i)).toBeInTheDocument();
  expect(screen.getByText("Löwe")).toBeInTheDocument();
});

test("die Fehlermeldung verschwindet, sobald weitergetippt wird", () => {
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  userEvent.click(screen.getByText("Begriffe eingeben & Spiel starten"));
  const wordInput = screen.getByPlaceholderText("Neuen Begriff eingeben");
  userEvent.type(wordInput, "Löwe");
  userEvent.click(screen.getByText("Hinzufügen"));
  userEvent.type(wordInput, "löwe");
  userEvent.click(screen.getByText("Hinzufügen"));
  expect(screen.getByText(/wurde bereits hinzugefügt/i)).toBeInTheDocument();
  userEvent.type(wordInput, "x");
  expect(screen.queryByText(/wurde bereits hinzugefügt/i)).not.toBeInTheDocument();
});

test("Bepunktung ist erst nach dem Absenden des Satzes möglich", () => {
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  const wordCountInput = screen.getByDisplayValue("10");
  userEvent.clear(wordCountInput);
  userEvent.type(wordCountInput, "2");
  userEvent.click(
    screen.getByLabelText(/Bepunktung der Wortverbindungen aktivieren/i)
  );
  userEvent.click(screen.getByText("Begriffe eingeben & Spiel starten"));

  const wordInput = screen.getByPlaceholderText("Neuen Begriff eingeben");
  userEvent.type(wordInput, "Hund");
  userEvent.click(screen.getByText("Hinzufügen"));
  userEvent.type(wordInput, "Katze");
  userEvent.click(screen.getByText("Hinzufügen"));

  userEvent.click(screen.getByText("Spiel starten"));

  userEvent.click(screen.getByText("Hund"));
  userEvent.click(screen.getByText("Katze"));

  // Vor dem Absenden gibt es noch keine Bewertungs-Buttons
  expect(screen.queryByText("1 Punkt")).not.toBeInTheDocument();

  userEvent.type(
    screen.getByPlaceholderText("Satz mit den ausgewählten Begriffen"),
    "Der Hund jagt die Katze."
  );
  userEvent.click(screen.getByText("Satz speichern & weiter"));

  // Nach dem Absenden lässt sich die Verbindung bewerten
  userEvent.click(screen.getByText("2 Punkte"));
  expect(screen.getByText(/\+2 Punkte/)).toBeInTheDocument();
});

test("QR-Code-Checkbox lässt sich umschalten", () => {
  render(<App />);
  const checkbox = screen.getByLabelText(
    /Wortpaar per QR-Code auf anderen Geräten anzeigen/i
  );
  expect(checkbox).not.toBeChecked();
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("Alle Daten zurücksetzen leert das Thema nach Bestätigung", () => {
  jest.spyOn(window, "confirm").mockReturnValue(true);
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  userEvent.click(screen.getByText("Alle Daten zurücksetzen"));
  expect(screen.getByPlaceholderText("Thema eingeben")).toHaveValue("");
  // Die Persistenz-Logik schreibt direkt danach den (jetzt geleerten) Stand
  // wieder nach localStorage - der Eintrag ist also nicht null, aber leer.
  const saved = JSON.parse(localStorage.getItem("brainchain_state_v1"));
  expect(saved.topic).toBe("");
  expect(saved.words).toEqual([]);
  window.confirm.mockRestore();
});

test("Alle Daten zurücksetzen passiert nicht ohne Bestätigung", () => {
  jest.spyOn(window, "confirm").mockReturnValue(false);
  render(<App />);
  userEvent.type(screen.getByPlaceholderText("Thema eingeben"), "Tiere");
  userEvent.click(screen.getByText("Alle Daten zurücksetzen"));
  expect(screen.getByPlaceholderText("Thema eingeben")).toHaveValue("Tiere");
  window.confirm.mockRestore();
});
