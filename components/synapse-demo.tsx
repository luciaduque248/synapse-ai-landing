"use client";

import { useMemo, useState } from "react";

type DemoSample = {
  id: string;
  label: string;
  note: string;
  decision: string;
  actions: { task: string; owner: string; timing: string }[];
};

const samples: DemoSample[] = [
  {
    id: "launch",
    label: "Launch sync",
    note: "Publicar landing v2 el viernes. Sara cierra el copy del hero. Diego conecta analytics antes del jueves. Revisar navegación móvil con diseño antes de QA.",
    decision: "La salida se mantiene para el viernes, condicionada al cierre de analytics y QA móvil.",
    actions: [
      { task: "Cerrar copy del hero", owner: "Sara", timing: "Hoy" },
      { task: "Conectar analytics", owner: "Diego", timing: "Jueves" },
      { task: "Revisar navegación móvil", owner: "Design", timing: "Antes de QA" },
    ],
  },
  {
    id: "sales",
    label: "Sales handoff",
    note: "El prospecto pidió un sandbox y una revisión técnica. Paula prepara el resumen de requisitos. Marco coordina la demo con producto. Falta confirmar quién valida seguridad.",
    decision: "El siguiente paso es una demo técnica con requisitos resumidos y responsable de seguridad confirmado.",
    actions: [
      { task: "Resumir requisitos", owner: "Paula", timing: "Hoy" },
      { task: "Coordinar demo", owner: "Marco", timing: "Esta semana" },
      { task: "Asignar revisión de seguridad", owner: "Sin asignar", timing: "Pendiente" },
    ],
  },
  {
    id: "bugs",
    label: "Bug triage",
    note: "El error de exportación bloquea a dos cuentas de prueba. Andrés reproduce el caso. Frontend prepara un fix. QA valida CSV y PDF antes de moverlo a release candidate.",
    decision: "El bug de exportación entra como prioridad del release candidate hasta completar validación en ambos formatos.",
    actions: [
      { task: "Reproducir exportación", owner: "Andrés", timing: "Ahora" },
      { task: "Preparar fix frontend", owner: "Frontend", timing: "Después" },
      { task: "Validar CSV y PDF", owner: "QA", timing: "Antes de RC" },
    ],
  },
];

export function SynapseDemo() {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const [note, setNote] = useState(samples[0].note);
  const [resultId, setResultId] = useState(samples[0].id);

  const result = useMemo(
    () => samples.find((sample) => sample.id === resultId) ?? samples[0],
    [resultId],
  );

  const selectSample = (sample: DemoSample) => {
    setSampleId(sample.id);
    setNote(sample.note);
    setResultId(sample.id);
  };

  const runDemo = () => {
    const exactMatch = samples.find((sample) => sample.note === note);
    setResultId(exactMatch?.id ?? sampleId);
  };

  return (
    <div className="demo-shell">
      <div className="demo-input-panel">
        <div className="panel-label-row">
          <span className="panel-label">INPUT / NOTES</span>
          <span className="demo-badge">LOCAL DEMO</span>
        </div>

        <h3>Contexto de reunión</h3>
        <p className="panel-copy">Selecciona un ejemplo o edita la nota antes de ejecutar la simulación.</p>

        <div className="sample-switcher" aria-label="Ejemplos de notas">
          {samples.map((sample) => (
            <button
              key={sample.id}
              type="button"
              className={sampleId === sample.id ? "sample-chip is-active" : "sample-chip"}
              onClick={() => selectSample(sample)}
              aria-pressed={sampleId === sample.id}
            >
              {sample.label}
            </button>
          ))}
        </div>

        <label className="demo-field">
          <span>Meeting notes</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={6}
            aria-describedby="demo-note-help"
          />
        </label>
        <p id="demo-note-help" className="field-help">
          La salida es predefinida. No se envían datos a un modelo ni se almacena información.
        </p>

        <button type="button" className="demo-run" onClick={runDemo}>
          Convertir en acciones <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="demo-output-panel" aria-live="polite">
        <div className="panel-label-row">
          <span className="panel-label">OUTPUT / EXECUTION</span>
          <span className="output-status"><i /> READY</span>
        </div>

        <div className="decision-card">
          <span>DECISION</span>
          <p>{result.decision}</p>
        </div>

        <div className="action-list">
          <div className="action-list-head">
            <span>Acciones</span>
            <span>{String(result.actions.length).padStart(2, "0")}</span>
          </div>
          {result.actions.map((action, index) => (
            <article key={`${result.id}-${action.task}`} className="action-row">
              <span className="action-index">0{index + 1}</span>
              <div>
                <strong>{action.task}</strong>
                <span>{action.owner}</span>
              </div>
              <span className="action-time">{action.timing}</span>
            </article>
          ))}
        </div>

        <div className="demo-output-foot">
          <span>Concept output</span>
          <span>No AI request · No storage</span>
        </div>
      </div>
    </div>
  );
}
