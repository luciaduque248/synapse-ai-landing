"use client";

import { ChangeEvent, useMemo, useState } from "react";

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
type AnalysisPhase = "ready" | "analyzing";
type TranscriptionPhase = "idle" | "ready" | "transcribing" | "done" | "error";

const ACCEPTED_TEXT_EXTENSIONS = ["txt", "md", "csv", "json", "srt", "vtt"];
const ACCEPTED_AUDIO_EXTENSIONS = ["mp3", "m4a", "wav", "webm", "ogg", "mp4"];
const MAX_TEXT_BYTES = 1024 * 1024;
const MAX_AUDIO_BYTES = 4 * 1024 * 1024;

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
    .filter((sentence) => /decid|queda|mant|release|lanzamiento|prioridad|siguiente paso|aprob|acord/i.test(sentence))
    .slice(0, 3);
  const risks = sentences
    .filter((sentence) => /si |bloque|pendiente|falta|riesg|depend|condicion|problema|impide/i.test(sentence))
    .slice(0, 3);

  const ownerNames = ["Sara", "Diego", "Design", "Diseño", "QA", "Paula", "Marco", "Andrés", "Frontend", "Producto", "Seguridad", "Marketing", "Ventas", "Operaciones"];
  const taskSentences = sentences.filter((sentence) => /cierra|conecta|revis|prepara|coordina|valida|reproduce|asigna|debe|hacer|completa|entrega|envía|envia|actualiza|corrige|confirma/i.test(sentence));
  const tasks = taskSentences.slice(0, 6).map((sentence, index) => {
    const owner = ownerNames.find((name) => new RegExp(`\\b${name}\\b`, "i").test(sentence)) ?? "Por asignar";
    const timingMatch = sentence.match(/hoy|mañana|jueves|viernes|lunes|martes|miércoles|miercoles|esta semana|antes de [^,.]+|ahora|próxima semana|proxima semana/i);
    return {
      id: `custom-${index}`,
      title: sentence.length > 82 ? `${sentence.slice(0, 79)}…` : sentence,
      owner,
      timing: timingMatch?.[0] ?? "Por definir",
    };
  });

  return {
    summary: summarySource ? `${summarySource}.` : "Añade contexto de reunión para generar el brief local.",
    decisions: decisions.length ? decisions : ["No se detectó una decisión explícita en el texto."],
    tasks: tasks.length ? tasks : [{ id: "custom-empty", title: "Revisar contexto y asignar próximos pasos", owner: "Por asignar", timing: "Por definir" }],
    risks: risks.length ? risks : ["No se detectaron bloqueos explícitos en el texto."],
    checkpoint: "Por definir · Añade el próximo checkpoint en las notas",
  };
}

function buildImportedTranscript(note: string) {
  const byLine = note.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const source = byLine.length > 1 ? byLine : note.split(/(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);
  return source.slice(0, 18).map((text, index) => ({ speaker: "Imported", time: `0${index + 1}`.slice(-2), text }));
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MeetingDemo() {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const [note, setNote] = useState(samples[0].note);
  const [analysis, setAnalysis] = useState<Analysis>(() => analyzeEditedNote(samples[0].note, samples[0]));
  const [view, setView] = useState<View>("overview");
  const [phase, setPhase] = useState<AnalysisPhase>("ready");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [customSourceName, setCustomSourceName] = useState("");
  const [customSourceOriginal, setCustomSourceOriginal] = useState("");
  const [textFileName, setTextFileName] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcriptionPhase, setTranscriptionPhase] = useState<TranscriptionPhase>("idle");
  const [fileError, setFileError] = useState("");
  const [dirty, setDirty] = useState(false);

  const sample = useMemo(() => samples.find((item) => item.id === sampleId) ?? samples[0], [sampleId]);
  const sourceTitle = customSourceName || audioFile?.name || sample.label;
  const isBusy = phase === "analyzing" || transcriptionPhase === "transcribing";
  const transcript = useMemo(
    () => customSourceName || note !== sample.note ? buildImportedTranscript(note) : sample.transcript,
    [customSourceName, note, sample],
  );

  const resetWorkspaceToSample = (next: MeetingSample) => {
    setSampleId(next.id);
    setNote(next.note);
    setAnalysis(analyzeEditedNote(next.note, next));
    setCustomSourceName("");
    setCustomSourceOriginal("");
    setTextFileName("");
    setAudioFile(null);
    setTranscriptionPhase("idle");
    setFileError("");
    setDirty(false);
    setCompletedTasks([]);
    setView("overview");
    setCopied(false);
  };

  const loadTextFile = async (file: File) => {
    setFileError("");
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_TEXT_EXTENSIONS.includes(extension)) {
      setFileError("Formato de texto no compatible. Usa TXT, MD, CSV, JSON, SRT o VTT.");
      return;
    }
    if (file.size > MAX_TEXT_BYTES) {
      setFileError("El transcript supera 1 MB. Usa un archivo más pequeño para esta demo.");
      return;
    }

    try {
      const text = (await file.text()).trim();
      if (!text) {
        setFileError("El archivo está vacío o no contiene texto legible.");
        return;
      }
      setTextFileName(file.name);
      setAudioFile(null);
      setTranscriptionPhase("idle");
      setCustomSourceName(file.name);
      setCustomSourceOriginal(text);
      setNote(text);
      setDirty(true);
      setCompletedTasks([]);
      setCopied(false);
      setView("overview");
    } catch {
      setFileError("No se pudo leer el archivo localmente.");
    }
  };

  const handleTextFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await loadTextFile(file);
    event.target.value = "";
  };

  const handleAudioFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setFileError("");
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_AUDIO_EXTENSIONS.includes(extension)) {
      setFileError("Formato de audio no compatible. Usa MP3, M4A, WAV, WEBM, OGG o MP4.");
      setAudioFile(null);
      setTranscriptionPhase("error");
      return;
    }
    if (file.size > MAX_AUDIO_BYTES) {
      setFileError("El audio supera 4 MB. Usa un clip más corto para esta demo en Vercel.");
      setAudioFile(null);
      setTranscriptionPhase("error");
      return;
    }

    setAudioFile(file);
    setTextFileName("");
    setTranscriptionPhase("ready");
    setCopied(false);
  };

  const transcribeAudio = async () => {
    if (!audioFile) return;

    setTranscriptionPhase("transcribing");
    setFileError("");
    setCopied(false);

    try {
      const formData = new FormData();
      formData.append("file", audioFile, audioFile.name);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { text?: string; error?: string };

      if (!response.ok || !payload.text) {
        throw new Error(payload.error || "No se pudo transcribir el audio.");
      }

      const transcriptText = payload.text.trim();
      setCustomSourceName(audioFile.name);
      setCustomSourceOriginal(transcriptText);
      setNote(transcriptText);
      setDirty(true);
      setCompletedTasks([]);
      setView("transcript");
      setTranscriptionPhase("done");
    } catch (error) {
      setTranscriptionPhase("error");
      setFileError(error instanceof Error ? error.message : "No se pudo transcribir el audio.");
    }
  };

  const runAnalysis = () => {
    if (!note.trim()) {
      setFileError("Añade notas, sube un transcript o transcribe un audio antes de analizar.");
      return;
    }
    setPhase("analyzing");
    setFileError("");
    setCopied(false);
    window.setTimeout(() => {
      setAnalysis(analyzeEditedNote(note, sample));
      setCompletedTasks([]);
      setView("overview");
      setDirty(false);
      setPhase("ready");
    }, 700);
  };

  const resetNote = () => {
    const resetValue = customSourceOriginal || sample.note;
    setNote(resetValue);
    setAnalysis(analyzeEditedNote(resetValue, sample));
    setDirty(false);
    setFileError("");
    setCompletedTasks([]);
    setView("overview");
  };

  const clearCustomSource = () => {
    setCustomSourceName("");
    setCustomSourceOriginal("");
    setTextFileName("");
    setAudioFile(null);
    setTranscriptionPhase("idle");
    setNote(sample.note);
    setAnalysis(analyzeEditedNote(sample.note, sample));
    setDirty(false);
    setFileError("");
    setCompletedTasks([]);
    setView("overview");
  };

  const clearAudioSelection = () => {
    if (customSourceName === audioFile?.name) {
      clearCustomSource();
      return;
    }
    setAudioFile(null);
    setTranscriptionPhase("idle");
    setFileError("");
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((current) => current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]);
  };

  const copyBrief = async () => {
    if (dirty || isBusy) return;
    const brief = [
      `SYNAPSE — ${sourceTitle}`,
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
      const textarea = document.createElement("textarea");
      textarea.value = brief;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const views: { id: View; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "transcript", label: "Transcript", icon: "≡" },
    { id: "decisions", label: "Decisions", icon: "◇" },
    { id: "tasks", label: "Tasks", icon: "✓" },
    { id: "risks", label: "Risks", icon: "!" },
  ];

  const resultTitle = transcriptionPhase === "transcribing"
    ? "Transcribing audio…"
    : phase === "analyzing"
      ? "Structuring meeting…"
      : dirty
        ? "Ready to analyze"
        : "Meeting brief ready";
  const resultStatus = transcriptionPhase === "transcribing"
    ? "TRANSCRIBING"
    : phase === "analyzing"
      ? "WORKING"
      : dirty
        ? "PENDING"
        : "READY";
  const resultStatusClass = transcriptionPhase === "transcribing" || phase === "analyzing"
    ? "ready-pill is-processing"
    : dirty
      ? "ready-pill is-pending"
      : "ready-pill";

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
            <span className="demo-breadcrumb">Workspace / {sourceTitle}</span>
            <strong>Meeting intelligence</strong>
          </div>
          <div className="demo-topbar-actions">
            <span className="sample-data-pill">LIVE TRANSCRIPTION DEMO</span>
            <button type="button" className="copy-button" onClick={copyBrief} disabled={dirty || isBusy}>
              {dirty ? "Analyze first" : copied ? "Copied ✓" : "Copy brief"}
            </button>
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
                  className={!customSourceName && !audioFile && sampleId === item.id ? "source-chip is-active" : "source-chip"}
                  onClick={() => resetWorkspaceToSample(item)}
                  aria-pressed={!customSourceName && !audioFile && sampleId === item.id}
                >
                  <span>{item.label}</span><small>{item.meta}</small>
                </button>
              ))}
            </div>

            <div className="input-methods">
              <div className="upload-block">
                <label className="upload-control">
                  <input
                    type="file"
                    accept=".txt,.md,.csv,.json,.srt,.vtt,text/plain,text/csv,application/json"
                    onChange={handleTextFileChange}
                  />
                  <span className="upload-icon" aria-hidden="true">↑</span>
                  <span className="upload-copy">
                    <strong>Subir transcript o notas</strong>
                    <small>TXT, MD, CSV, JSON, SRT o VTT · máximo 1 MB · lectura local</small>
                  </span>
                </label>
                {textFileName && (
                  <div className="upload-file-row">
                    <span title={textFileName}>Texto: {textFileName}</span>
                    <button type="button" onClick={clearCustomSource}>Quitar</button>
                  </div>
                )}
              </div>

              <div className="upload-block audio-upload-block">
                <label className="upload-control audio-upload-control">
                  <input
                    type="file"
                    accept=".mp3,.m4a,.wav,.webm,.ogg,.mp4,audio/mpeg,audio/mp4,audio/wav,audio/webm,audio/ogg"
                    onChange={handleAudioFileChange}
                  />
                  <span className="upload-icon audio-upload-icon" aria-hidden="true">◉</span>
                  <span className="upload-copy">
                    <strong>Subir audio de reunión</strong>
                    <small>MP3, M4A, WAV, WEBM, OGG o MP4 · máximo 4 MB</small>
                  </span>
                </label>

                {audioFile && (
                  <div className="audio-file-card">
                    <div>
                      <span className="audio-file-kicker">AUDIO READY</span>
                      <strong title={audioFile.name}>{audioFile.name}</strong>
                      <small>{formatBytes(audioFile.size)} · {transcriptionPhase === "done" ? "Transcript ready" : "Ready to transcribe"}</small>
                    </div>
                    <div className="audio-file-actions">
                      <button type="button" className="audio-remove-button" onClick={clearAudioSelection} disabled={transcriptionPhase === "transcribing"}>Quitar</button>
                      <button
                        type="button"
                        className="transcribe-button"
                        onClick={transcribeAudio}
                        disabled={transcriptionPhase === "transcribing"}
                      >
                        {transcriptionPhase === "transcribing" ? "Transcribiendo…" : transcriptionPhase === "done" ? "Transcribir otra vez" : "Transcribir audio"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {fileError && <p className="upload-error" role="alert">{fileError}</p>}
            </div>

            <label className="note-editor">
              <span>Transcript / notes</span>
              <textarea
                value={note}
                onChange={(event) => {
                  setNote(event.target.value);
                  setDirty(true);
                  setCopied(false);
                }}
                rows={10}
              />
            </label>

            {transcriptionPhase === "done" && <p className="transcription-success">Audio transcrito. Revisa el texto y después analiza la reunión.</p>}
            {dirty && <p className="pending-note">Hay cambios sin analizar. Ejecuta la reunión para actualizar el brief.</p>}

            <div className="source-actions">
              <button type="button" className="reset-button" onClick={resetNote} disabled={isBusy}>Reset</button>
              <button type="button" className="analyze-button" onClick={runAnalysis} disabled={isBusy}>
                {phase === "analyzing" ? "Analizando…" : "Analizar reunión"}<span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="demo-disclaimer">Los archivos de texto se leen en el navegador. El audio se envía a la API de transcripción y no se guarda en una base de datos propia de esta demo.</p>
          </section>

          <section className="insight-column" aria-live="polite" aria-busy={isBusy}>
            <div className="insight-summary-bar">
              <div><span>RESULT</span><strong>{resultTitle}</strong></div>
              <span className={resultStatusClass}>{resultStatus}</span>
            </div>

            <div className="result-tabs" role="tablist" aria-label="Resultados de la reunión">
              {views.map((item) => (
                <button key={item.id} type="button" role="tab" aria-selected={view === item.id} className={view === item.id ? "is-active" : ""} onClick={() => setView(item.id)}>
                  {item.label}{item.id === "tasks" ? ` ${analysis.tasks.length}` : item.id === "risks" ? ` ${analysis.risks.length}` : ""}
                </button>
              ))}
            </div>

            <div className="result-content">
              {transcriptionPhase === "transcribing" ? (
                <div className="processing-state">
                  <div className="processing-orb" />
                  <strong>Transcribiendo el audio</strong>
                  <span>Convirtiendo voz en texto para incorporarlo al workspace…</span>
                </div>
              ) : phase === "analyzing" ? (
                <div className="processing-state">
                  <div className="processing-orb" />
                  <strong>Organizando la reunión</strong>
                  <span>Detectando decisiones, acciones, owners y riesgos…</span>
                </div>
              ) : dirty ? (
                <div className="pending-state">
                  <span>INPUT READY</span>
                  <strong>Tu contenido está listo.</strong>
                  <p>Revisa el transcript y haz clic en “Analizar reunión” para regenerar el resumen, decisiones, tareas y riesgos.</p>
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
                  {transcript.map((line) => <article key={`${line.time}-${line.speaker}-${line.text}`}><span>{line.time}</span><div><strong>{line.speaker}</strong><p>{line.text}</p></div></article>)}
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
