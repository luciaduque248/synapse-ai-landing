"use client";

import { useMemo, useState } from "react";

type Task = { id: string; title: string; owner: string; timing: string };
type MeetingSample = {
  id: string;
  label: string;
  meta: string;
  note: string;
  summary: string;
  transcript: { speaker: string; time: string; text: string }[];
  decisions: string[];
  tasks: Task[];
  risks: string[];
  checkpoint: string;
};
type View = "overview" | "transcript" | "decisions" | "tasks" | "risks";

type Analysis = Pick<MeetingSample, "summary" | "decisions" | "tasks" | "risks" | "checkpoint">;

const samples: MeetingSample[] = [
  {
    id: "launch",
    label: "Launch sync",
    meta: "Meeting · 10:30 AM · 4 people",
    note: "Publicar landing v2 el viernes. Sara cierra el copy del hero hoy. Diego conecta analytics antes del jueves. Revisar navegación móvil con diseño antes de QA. Si analytics no queda listo, el release se mueve.",
    summary: "El lanzamiento sigue previsto para el viernes. Analytics y QA móvil son las dependencias principales antes del release.",
    transcript: [
      { speaker: "Sara", time: "10:31", text: "El hero queda cerrado hoy y mañana revisamos la versión móvil." },
      { speaker: "Diego", time: "10:34", text: "Puedo dejar analytics conectado antes del jueves." },
      { speaker: "Design", time: "10:38", text: "Revisamos navegación móvil antes de pasar a QA." },
      { speaker: "Team", time: "10:41", text: "Entonces mantenemos viernes, salvo que analytics no quede listo." },
    ],
    decisions: ["Mantener el release del viernes condicionado a analytics y QA móvil."],
    tasks: [
      { id: "launch-1", title: "Cerrar copy del hero", owner: "Sara", timing: "Hoy" },
      { id: "launch-2", title: "Conectar analytics", owner: "Diego", timing: "Antes del jueves" },
      { id: "launch-3", title: "Revisar navegación móvil", owner: "Design", timing: "Antes de QA" },
      { id: "launch-4", title: "Validar release readiness", owner: "QA", timing: "Jueves 4:00 PM" },
    ],
    risks: ["Analytics es una dependencia directa del release.", "QA móvil todavía no está cerrado."],
    checkpoint: "Jueves · 4:00 PM · Release readiness",
  },
  {
    id: "sales",
    label: "Sales handoff",
    meta: "Client call · 2:15 PM · 5 people",
    note: "El prospecto pidió un sandbox y una revisión técnica. Paula prepara el resumen de requisitos hoy. Marco coordina una demo con producto esta semana. Falta confirmar quién valida seguridad antes de la demo.",
    summary: "El prospecto avanza a una demo técnica. Antes se necesita consolidar requisitos y asignar la revisión de seguridad.",
    transcript: [
      { speaker: "Client", time: "14:16", text: "Queremos probar el flujo en un sandbox antes de avanzar." },
      { speaker: "Paula", time: "14:20", text: "Hoy dejo resumidos los requisitos que vimos." },
      { speaker: "Marco", time: "14:24", text: "Coordino con producto una demo técnica esta semana." },
      { speaker: "Client", time: "14:28", text: "Necesitamos que seguridad revise el acceso antes de esa demo." },
    ],
    decisions: ["El siguiente paso comercial es una demo técnica con sandbox."],
    tasks: [
      { id: "sales-1", title: "Resumir requisitos", owner: "Paula", timing: "Hoy" },
      { id: "sales-2", title: "Coordinar demo técnica", owner: "Marco", timing: "Esta semana" },
      { id: "sales-3", title: "Asignar revisión de seguridad", owner: "Por asignar", timing: "Antes de la demo" },
    ],
    risks: ["La revisión de seguridad todavía no tiene owner."],
    checkpoint: "Viernes · 11:00 AM · Technical demo readiness",
  },
  {
    id: "bugs",
    label: "Bug triage",
    meta: "Triage · 9:05 AM · 4 people",
    note: "El error de exportación bloquea dos cuentas de prueba. Andrés reproduce el caso ahora. Frontend prepara un fix después. QA valida CSV y PDF antes de moverlo a release candidate. El bug queda como prioridad del RC.",
    summary: "El bug de exportación pasa a prioridad del release candidate porque bloquea cuentas de prueba y requiere validación en CSV y PDF.",
    transcript: [
      { speaker: "Support", time: "09:06", text: "Dos cuentas de prueba no pueden exportar." },
      { speaker: "Andrés", time: "09:09", text: "Voy a reproducir el caso ahora mismo." },
      { speaker: "Frontend", time: "09:13", text: "Con reproducción confirmada preparo el fix." },
      { speaker: "QA", time: "09:16", text: "Validamos CSV y PDF antes de pasarlo a RC." },
    ],
    decisions: ["El bug de exportación es prioridad del release candidate."],
    tasks: [
      { id: "bugs-1", title: "Reproducir exportación", owner: "Andrés", timing: "Ahora" },
      { id: "bugs-2", title: "Preparar fix frontend", owner: "Frontend", timing: "Después de reproducción" },
      { id: "bugs-3", title: "Validar CSV y PDF", owner: "QA", timing: "Antes de RC" },
    ],
    risks: ["Dos cuentas de prueba están bloqueadas por exportación."],
    checkpoint: "Hoy · 3:00 PM · RC status",
  },
];

function analyzeEditedNote(note: string, sample: MeetingSample): Analysis {
  const clean = note.trim();
  if (clean === sample.note) {
    return {
      summary: sample.summary,
      decisions: sample.decisions,
      tasks: sample.tasks,
      risks: sample.risks,
      checkpoint: sample.checkpoint,
    };
  }

  const sentences = clean
    .split(/[.\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const summarySource = sentences.slice(0, 2).join(". ");
  const decisions = sentences
    .filter((sentence) => /decid|queda|mant|release|lanzamiento|prioridad|siguiente paso|aprob/i.test(sentence))
    .slice(0, 3);
  const risks = sentences
    .filter((sentence) => /si |bloque|pendiente|falta|riesg|depend|condicion/i.test(sentence))
    .slice(0, 3);

  const ownerNames = ["Sara", "Diego", "Design", "Diseño", "QA", "Paula", "Marco", "Andrés", "Frontend", "Producto", "Seguridad"];
  const taskSentences = sentences.filter((sentence) => /cierra|conecta|revis|prepara|coordina|valida|reproduce|asigna|debe|hacer|completa|entrega/i.test(sentence));
  const tasks = taskSentences.slice(0, 5).map((sentence, index) => {
    const owner = ownerNames.find((name) => new RegExp(`\\b${name}\\b`, "i").test(sentence)) ?? "Por asignar";
    const timingMatch = sentence.match(/hoy|mañana|jueves|viernes|esta semana|antes de [^,.]+|ahora/i);
    return {
      id: `custom-${index}`,
      title: sentence.length > 72 ? `${sentence.slice(0, 69)}…` : sentence,
      owner,
      timing: timingMatch?.[0] ?? "Por definir",
    };
  });

  return {
    summary: summarySource ? `${summarySource}.` : "Añade contexto de reunión para generar el brief local.",
    decisions: decisions.length ? decisions : ["No se detectó una decisión explícita en el texto editado."],
    tasks: tasks.length ? tasks : [{ id: "custom-empty", title: "Revisar contexto y asignar próximos pasos", owner: "Por asignar", timing: "Por definir" }],
    risks: risks.length ? risks : ["No se detectaron bloqueos explícitos en el texto editado."],
    checkpoint: sample.checkpoint,
  };
}

export function MeetingDemo() {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const [note, setNote] = useState(samples[0].note);
  const [analysis, setAnalysis] = useState<Analysis>(() => analyzeEditedNote(samples[0].note, samples[0]));
  const [view, setView] = useState<View>("overview");
  const [phase, setPhase] = useState<"ready" | "analyzing">("ready");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const sample = useMemo(() => samples.find((item) => item.id === sampleId) ?? samples[0], [sampleId]);

  const selectSample = (next: MeetingSample) => {
    setSampleId(next.id);
    setNote(next.note);
    setAnalysis(analyzeEditedNote(next.note, next));
    setCompletedTasks([]);
    setView("overview");
    setCopied(false);
  };

  const runAnalysis = () => {
    setPhase("analyzing");
    setCopied(false);
    window.setTimeout(() => {
      setAnalysis(analyzeEditedNote(note, sample));
      setCompletedTasks([]);
      setView("overview");
      setPhase("ready");
    }, 700);
  };

  const resetNote = () => {
    setNote(sample.note);
    setAnalysis(analyzeEditedNote(sample.note, sample));
    setCompletedTasks([]);
    setView("overview");
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((current) => current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]);
  };

  const copyBrief = async () => {
    const brief = [
      `SYNAPSE — ${sample.label}`,
      `Summary: ${analysis.summary}`,
      "Decisions:",
      ...analysis.decisions.map((item) => `- ${item}`),
      "Tasks:",
      ...analysis.tasks.map((item) => `- ${item.title} — ${item.owner} — ${item.timing}`),
      "Risks:",
      ...analysis.risks.map((item) => `- ${item}`),
      `Next checkpoint: ${analysis.checkpoint}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const views: { id: View; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "transcript", label: "Transcript", icon: "≡" },
    { id: "decisions", label: "Decisions", icon: "◇" },
    { id: "tasks", label: "Tasks", icon: "✓" },
    { id: "risks", label: "Risks", icon: "!" },
  ];

  return (
    <div className="demo-app">
      <aside className="demo-sidebar" aria-label="Vistas del workspace">
        <div className="demo-sidebar-brand">S</div>
        {views.map((item) => (
          <button
            key={item.id}
            type="button"
            className={view === item.id ? "is-active" : ""}
            onClick={() => setView(item.id)}
            aria-label={item.label}
            aria-pressed={view === item.id}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
        <span />
        <div className="demo-avatar">SD</div>
      </aside>

      <div className="demo-workspace">
        <div className="demo-topbar">
          <div>
            <span className="demo-breadcrumb">Workspace / {sample.label}</span>
            <strong>Meeting intelligence</strong>
          </div>
          <div className="demo-topbar-actions">
            <span className="sample-data-pill">LOCAL DEMO</span>
            <button type="button" className="copy-button" onClick={copyBrief}>{copied ? "Copied ✓" : "Copy brief"}</button>
          </div>
        </div>

        <div className="demo-body">
          <section className="source-column">
            <div className="demo-section-label"><span>01</span><b>MEETING SOURCE</b></div>
            <div className="source-switcher" aria-label="Reuniones de ejemplo">
              {samples.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={sampleId === item.id ? "source-chip is-active" : "source-chip"}
                  onClick={() => selectSample(item)}
                  aria-pressed={sampleId === item.id}
                >
                  <span>{item.label}</span><small>{item.meta}</small>
                </button>
              ))}
            </div>

            <label className="note-editor">
              <span>Transcript / notes</span>
              <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={10} />
            </label>

            <div className="source-actions">
              <button type="button" className="reset-button" onClick={resetNote}>Reset</button>
              <button type="button" className="analyze-button" onClick={runAnalysis} disabled={phase === "analyzing"}>
                {phase === "analyzing" ? "Analizando…" : "Analizar reunión"}<span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="demo-disclaimer">La demo usa lógica local y sample data. No hay llamada a un modelo ni almacenamiento.</p>
          </section>

          <section className="insight-column" aria-live="polite" aria-busy={phase === "analyzing"}>
            <div className="insight-summary-bar">
              <div><span>RESULT</span><strong>{phase === "analyzing" ? "Structuring meeting…" : "Meeting brief ready"}</strong></div>
              <span className={phase === "analyzing" ? "ready-pill is-processing" : "ready-pill"}>{phase === "analyzing" ? "WORKING" : "READY"}</span>
            </div>

            <div className="result-tabs" role="tablist" aria-label="Resultados de la reunión">
              {views.map((item) => (
                <button key={item.id} type="button" role="tab" aria-selected={view === item.id} className={view === item.id ? "is-active" : ""} onClick={() => setView(item.id)}>
                  {item.label}{item.id === "tasks" ? ` ${analysis.tasks.length}` : item.id === "risks" ? ` ${analysis.risks.length}` : ""}
                </button>
              ))}
            </div>

            <div className="result-content">
              {phase === "analyzing" ? (
                <div className="processing-state">
                  <div className="processing-orb" />
                  <strong>Organizando la reunión</strong>
                  <span>Detectando decisiones, acciones, owners y riesgos…</span>
                </div>
              ) : view === "overview" ? (
                <div className="overview-tab">
                  <article className="summary-card"><span>MEETING SUMMARY</span><p>{analysis.summary}</p></article>
                  <article className="decision-highlight"><div><span>KEY DECISION</span><strong>{analysis.decisions[0]}</strong></div><i>✓</i></article>
                  <div className="overview-stats">
                    <article><span>Decisions</span><strong>{String(analysis.decisions.length).padStart(2,"0")}</strong></article>
                    <article><span>Tasks</span><strong>{String(analysis.tasks.length).padStart(2,"0")}</strong></article>
                    <article><span>Risks</span><strong>{String(analysis.risks.length).padStart(2,"0")}</strong></article>
                  </div>
                  <div className="next-checkpoint"><span>NEXT CHECKPOINT</span><strong>{analysis.checkpoint}</strong></div>
                </div>
              ) : view === "transcript" ? (
                <div className="transcript-list">
                  {sample.transcript.map((line) => <article key={`${line.time}-${line.speaker}`}><span>{line.time}</span><div><strong>{line.speaker}</strong><p>{line.text}</p></div></article>)}
                  {note !== sample.note && <p className="custom-note-hint">El transcript visual permanece como sample; el análisis superior sí usa el texto que editaste.</p>}
                </div>
              ) : view === "decisions" ? (
                <div className="decision-list">{analysis.decisions.map((item, index) => <article key={`${index}-${item}`}><span>0{index+1}</span><div><b>Decision</b><p>{item}</p></div><i>✓</i></article>)}</div>
              ) : view === "tasks" ? (
                <div className="task-list">
                  {analysis.tasks.map((task) => {
                    const done = completedTasks.includes(task.id);
                    return <article key={task.id} className={done ? "is-complete" : ""}>
                      <button type="button" className="task-check" onClick={() => toggleTask(task.id)} aria-pressed={done} aria-label={`${done ? "Reabrir" : "Completar"} ${task.title}`}>{done ? "✓" : ""}</button>
                      <div><strong>{task.title}</strong><span>{task.owner}</span></div><em>{task.timing}</em>
                    </article>;
                  })}
                </div>
              ) : (
                <div className="risk-list">{analysis.risks.map((risk, index) => <article key={`${index}-${risk}`}><span>!</span><div><b>Risk {index+1}</b><p>{risk}</p></div></article>)}</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
