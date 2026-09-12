"use client";

import { useMemo, useState } from "react";

type Action = { task: string; owner: string; timing: string; status: "Ready" | "Blocked" | "Next" };
type Sample = {
  id: string;
  label: string;
  source: string;
  note: string;
  summary: string;
  decision: string;
  actions: Action[];
  risks: string[];
  nextCheckpoint: string;
};

type Tab = "overview" | "decisions" | "tasks" | "risks";

const samples: Sample[] = [
  {
    id: "launch",
    label: "Launch sync",
    source: "Meeting · 10:30 AM",
    note: "Publicar landing v2 el viernes. Sara cierra el copy del hero hoy. Diego conecta analytics antes del jueves. Revisar navegación móvil con diseño antes de QA. Si analytics no queda listo, el release se mueve.",
    summary: "El lanzamiento sigue previsto para el viernes, con analytics y QA móvil como dependencias principales.",
    decision: "Mantener el release del viernes condicionado a analytics + QA móvil.",
    actions: [
      { task: "Cerrar copy del hero", owner: "Sara", timing: "Hoy", status: "Ready" },
      { task: "Conectar analytics", owner: "Diego", timing: "Jueves", status: "Ready" },
      { task: "Revisar navegación móvil", owner: "Design", timing: "Antes de QA", status: "Next" },
      { task: "Validar release candidate", owner: "QA", timing: "Viernes", status: "Blocked" },
    ],
    risks: ["QA depende de la navegación móvil aprobada.", "El release se mueve si analytics no queda conectado."],
    nextCheckpoint: "Jueves · 4:00 PM · Release readiness",
  },
  {
    id: "sales",
    label: "Sales handoff",
    source: "Call notes · 2:15 PM",
    note: "El prospecto pidió un sandbox y una revisión técnica. Paula prepara el resumen de requisitos. Marco coordina la demo con producto. Falta confirmar quién valida seguridad antes de enviar la propuesta.",
    summary: "El equipo debe preparar una demo técnica con requisitos resumidos y resolver el owner de seguridad antes de enviar propuesta.",
    decision: "No enviar propuesta hasta asignar revisión de seguridad y completar demo técnica.",
    actions: [
      { task: "Resumir requisitos", owner: "Paula", timing: "Hoy", status: "Ready" },
      { task: "Coordinar demo técnica", owner: "Marco", timing: "Esta semana", status: "Ready" },
      { task: "Asignar revisión de seguridad", owner: "Sin asignar", timing: "Pendiente", status: "Blocked" },
    ],
    risks: ["No hay owner para seguridad.", "La propuesta depende de la demo técnica."],
    nextCheckpoint: "Viernes · 11:00 AM · Proposal review",
  },
  {
    id: "bugs",
    label: "Bug triage",
    source: "Triage · 9:05 AM",
    note: "El error de exportación bloquea a dos cuentas de prueba. Andrés reproduce el caso. Frontend prepara un fix. QA valida CSV y PDF antes de moverlo a release candidate. No se aprueba RC hasta cerrar ambos formatos.",
    summary: "El bug de exportación es bloqueante y debe validarse en CSV y PDF antes de aprobar el release candidate.",
    decision: "Tratar exportación como blocker del RC hasta completar validación en ambos formatos.",
    actions: [
      { task: "Reproducir exportación", owner: "Andrés", timing: "Ahora", status: "Ready" },
      { task: "Preparar fix frontend", owner: "Frontend", timing: "Después de repro", status: "Next" },
      { task: "Validar CSV y PDF", owner: "QA", timing: "Antes de RC", status: "Blocked" },
    ],
    risks: ["Dos cuentas de prueba siguen bloqueadas.", "El RC no puede aprobarse sin validar ambos formatos."],
    nextCheckpoint: "Hoy · 3:30 PM · Triage follow-up",
  },
];

export function SynapseDemo() {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const [resultId, setResultId] = useState(samples[0].id);
  const [note, setNote] = useState(samples[0].note);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [processing, setProcessing] = useState(false);

  const sample = useMemo(() => samples.find((item) => item.id === sampleId) ?? samples[0], [sampleId]);
  const result = useMemo(() => samples.find((item) => item.id === resultId) ?? samples[0], [resultId]);

  const selectSample = (next: Sample) => {
    setSampleId(next.id);
    setResultId(next.id);
    setNote(next.note);
    setActiveTab("overview");
  };

  const runDemo = () => {
    setProcessing(true);
    window.setTimeout(() => {
      const exactMatch = samples.find((item) => item.note === note);
      setResultId(exactMatch?.id ?? sample.id);
      setActiveTab("overview");
      setProcessing(false);
    }, 700);
  };

  return (
    <div className="demo-app">
      <aside className="demo-sidebar" aria-label="Navegación de la demo conceptual">
        <div className="demo-sidebar-brand">S</div>
        <button type="button" className="is-active" aria-label="Workspace">⌂</button>
        <button type="button" aria-label="Inbox">◎</button>
        <button type="button" aria-label="Decisions">◇</button>
        <button type="button" aria-label="Actions">✓</button>
        <span />
        <div className="demo-avatar">SD</div>
      </aside>

      <div className="demo-workspace">
        <div className="demo-topbar">
          <div>
            <span className="demo-breadcrumb">Workspace / Launch v2</span>
            <strong>Meeting intelligence</strong>
          </div>
          <div className="demo-topbar-actions">
            <span className="sample-data-pill">LOCAL SIMULATION</span>
            <button type="button" aria-label="Más opciones">•••</button>
          </div>
        </div>

        <div className="demo-body">
          <section className="source-column">
            <div className="demo-section-label"><span>01</span><b>SOURCE CONTEXT</b></div>
            <div className="source-switcher" aria-label="Fuentes de ejemplo">
              {samples.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={sampleId === item.id ? "source-chip is-active" : "source-chip"}
                  onClick={() => selectSample(item)}
                  aria-pressed={sampleId === item.id}
                >
                  <span>{item.label}</span>
                  <small>{item.source}</small>
                </button>
              ))}
            </div>

            <label className="note-editor">
              <span>Context</span>
              <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={10} />
            </label>

            <div className="analysis-pipeline" aria-label="Pasos de análisis de la simulación">
              <span className={processing ? "is-running" : "is-done"}><i /> Parse context</span>
              <span className={processing ? "is-running" : "is-done"}><i /> Detect decisions</span>
              <span className={processing ? "is-running" : "is-done"}><i /> Route actions</span>
            </div>

            <button type="button" className="analyze-button" onClick={runDemo} disabled={processing}>
              {processing ? "Analizando contexto…" : "Analizar reunión"}<span aria-hidden="true">→</span>
            </button>
            <p className="demo-disclaimer">Salida predefinida para el caso de portafolio. No se envían ni almacenan datos.</p>
          </section>

          <section className="insight-column" aria-live="polite" aria-busy={processing}>
            <div className="insight-summary-bar">
              <div><span>RESULT</span><strong>{processing ? "Processing…" : "Execution brief ready"}</strong></div>
              <span className={processing ? "processing-pill" : "ready-pill"}>{processing ? "ANALYZING" : "READY"}</span>
            </div>

            <div className="result-tabs" role="tablist" aria-label="Resultado del análisis">
              {(["overview", "decisions", "tasks", "risks"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={activeTab === tab ? "is-active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "overview" ? "Overview" : tab === "decisions" ? "Decisions" : tab === "tasks" ? `Tasks ${result.actions.length}` : `Risks ${result.risks.length}`}
                </button>
              ))}
            </div>

            <div className={processing ? "result-content is-processing" : "result-content"}>
              {activeTab === "overview" && (
                <div className="overview-tab">
                  <article className="summary-card">
                    <span>AI SUMMARY · CONCEPT OUTPUT</span>
                    <p>{result.summary}</p>
                  </article>
                  <article className="decision-highlight">
                    <div><span>KEY DECISION</span><strong>{result.decision}</strong></div>
                    <i>✓</i>
                  </article>
                  <div className="overview-stats">
                    <article><span>Actions</span><strong>{String(result.actions.length).padStart(2, "0")}</strong></article>
                    <article><span>Risks</span><strong>{String(result.risks.length).padStart(2, "0")}</strong></article>
                    <article><span>Owners</span><strong>{String(new Set(result.actions.map((action) => action.owner)).size).padStart(2, "0")}</strong></article>
                  </div>
                  <div className="next-checkpoint"><span>NEXT CHECKPOINT</span><strong>{result.nextCheckpoint}</strong></div>
                </div>
              )}

              {activeTab === "decisions" && (
                <div className="decision-tab">
                  <article><span>01</span><div><small>Confirmed decision</small><strong>{result.decision}</strong><p>Source: {sample.label}</p></div><b>CONFIRMED</b></article>
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="tasks-tab">
                  {result.actions.map((action, index) => (
                    <article key={`${result.id}-${action.task}`}>
                      <span>0{index + 1}</span>
                      <div><strong>{action.task}</strong><small>{action.owner}</small></div>
                      <em>{action.timing}</em>
                      <b className={`task-status task-status--${action.status.toLowerCase()}`}>{action.status}</b>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === "risks" && (
                <div className="risks-tab">
                  {result.risks.map((risk, index) => (
                    <article key={risk}><span>0{index + 1}</span><div><small>Flagged risk</small><strong>{risk}</strong></div><b>REVIEW</b></article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
