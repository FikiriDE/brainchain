import React from "react";

const STEPS = [
  { key: "menu", label: "Menü" },
  { key: "words", label: "Begriffe" },
  { key: "game", label: "Spiel" },
];

function PhaseStepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="bc-stepper" aria-hidden="true">
      {STEPS.map((step, i) => (
        <div
          key={step.key}
          className={[
            "bc-step",
            i < currentIndex ? "bc-step-done" : "",
            i === currentIndex ? "bc-step-current" : "",
          ].join(" ")}
        >
          <span className="bc-step-dot">{i + 1}</span>
          <span className="bc-step-label">{step.label}</span>
          {i < STEPS.length - 1 && <span className="bc-step-line" />}
        </div>
      ))}
    </div>
  );
}

export default PhaseStepper;
