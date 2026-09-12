"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  AudioLines,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Cpu,
  FileAudio2,
  FileText,
  Gauge,
  LayoutDashboard,
  ListChecks,
  LoaderCircle,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { transcribeAudioLocally, type LocalTranscriptionProgress } from "@/lib/local-whisper";

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
type TranscriptionPhase = "idle" | "ready" | "preparing" | "transcribing" | "done" | "error";
type ViewItem = { id: View; label: string; icon: LucideIcon };

const ACCEPTED_TEXT_EXTENSIONS = ["txt", "md", "csv", "json", "srt", "vtt"];
const ACCEPTED_AUDIO_EXTENSIONS = ["mp3", "m4a", "wav", "webm", "ogg", "mp4"];
const MAX_TEXT_BYTES = 1024 * 1024;
const MAX_AUDIO_BYTES = 12 * 1024 * 1024;

const samples: MeetingSample[] = [
  {
    id: "launch",
    label: "Launch sync",
    meta: "10:30 AM · 4 people",
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
    meta: "2:15 PM · 5 people",
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
    meta: "9:05 AM · 4 people",
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
    return { summary: sample.summary, decisions: sample.decisions, tasks: sample.tasks, risks: sample.risks, checkpoint: sample.checkpoint };
  }
  const sentences = clean.split(/[.\n]+/).map((sentence) => sentence.trim()).filter(Boolean);
  const summarySource = sentences.slice(0, 2).join(". ");
  const decisions = sentences.filter((sentence) => /decid|queda|mant|release|lanzamiento|prioridad|siguiente paso|aprob|acord/i.test(sentence)).slice(0, 3);
  const risks = sentences.filter((sentence) => /si |bloque|pendiente|falta|riesg|depend|condicion|problema|impide/i.test(sentence)).slice(0, 3);
  const ownerNames = ["Sara", "Diego", "Design", "Diseño", "QA", "Paula", "Marco", "Andrés", "Frontend", "Producto", "Seguridad", "Marketing", "Ventas", "Operaciones"];
  const taskSentences = sentences.filter((sentence) => /cierra|conecta|revis|prepara|coordina|valida|reproduce|asigna|debe|hacer|completa|entrega|envía|envia|actualiza|corrige|confirma/i.test(sentence));
  const tasks = taskSentences.slice(0, 6).map((sentence, index) => {
    const owner = ownerNames.find((name) => new RegExp(`\\b${name}\\b`, "i").test(sentence)) ?? "Por asignar";
    const timingMatch = sentence.match(/hoy|mañana|jueves|viernes|lunes|martes|miércoles|miercoles|esta semana|antes de [^,.]+|ahora|próxima semana|proxima semana/i);
    return { id: `custom-${index}`, title: sentence.length > 82 ? `${sentence.slice(0, 79)}…` : sentence, owner, timing: timingMatch?.[0] ?? "Por definir" };
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
  return source.slice(0, 18).map((text, index) => ({ speaker: "Imported", time: String(index + 1).padStart(2, "0"), text }));
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const views: ViewItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "decisions", label: "Decisions", icon: ClipboardCheck },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "risks", label: "Risks", icon: AlertTriangle },
];

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
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionDetail, setTranscriptionDetail] = useState("Whisper runs locally in your browser.");
  const [transcriptionBackend, setTranscriptionBackend] = useState<"WebGPU" | "WASM" | "">("");
  const [fileError, setFileError] = useState("");
  const [dirty, setDirty] = useState(false);

  const sample = useMemo(() => samples.find((item) => item.id === sampleId) ?? samples[0], [sampleId]);
  const sourceTitle = customSourceName || audioFile?.name || sample.label;
  const isBusy = phase === "analyzing" || transcriptionPhase === "preparing" || transcriptionPhase === "transcribing";
  const transcript = useMemo(() => customSourceName || note !== sample.note ? buildImportedTranscript(note) : sample.transcript, [customSourceName, note, sample]);

  const resetWorkspaceToSample = (next: MeetingSample) => {
    setSampleId(next.id);
    setNote(next.note);
    setAnalysis(analyzeEditedNote(next.note, next));
    setCustomSourceName("");
    setCustomSourceOriginal("");
    setTextFileName("");
    setAudioFile(null);
    setTranscriptionPhase("idle");
    setTranscriptionProgress(0);
    setTranscriptionBackend("");
    setTranscriptionDetail("Whisper runs locally in your browser.");
    setFileError("");
    setDirty(false);
    setCompletedTasks([]);
    setView("overview");
    setCopied(false);
  };

  const loadTextFile = async (file: File) => {
    setFileError("");
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_TEXT_EXTENSIONS.includes(extension)) return setFileError("Formato de texto no compatible. Usa TXT, MD, CSV, JSON, SRT o VTT.");
    if (file.size > MAX_TEXT_BYTES) return setFileError("El transcript supera 1 MB. Usa un archivo más pequeño para esta demo.");
    try {
      const text = (await file.text()).trim();
      if (!text) return setFileError("El archivo está vacío o no contiene texto legible.");
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
      setFileError("El audio supera 12 MB. Para esta demo local usa un clip más corto.");
      setAudioFile(null);
      setTranscriptionPhase("error");
      return;
    }
    setAudioFile(file);
    setTextFileName("");
    setTranscriptionPhase("ready");
    setTranscriptionProgress(0);
    setTranscriptionBackend("");
    setTranscriptionDetail("Ready for private, on-device transcription.");
    setCopied(false);
  };

  const onLocalProgress = (progress: LocalTranscriptionProgress) => {
    if (progress.phase === "decoding" || progress.phase === "loading") setTranscriptionPhase("preparing");
    if (progress.phase === "transcribing") setTranscriptionPhase("transcribing");
    if (typeof progress.progress === "number") setTranscriptionProgress(progress.progress);
    if (progress.backend) setTranscriptionBackend(progress.backend);
    if (progress.detail) setTranscriptionDetail(progress.detail);
  };

  const transcribeAudio = async () => {
    if (!audioFile) return;
    setTranscriptionPhase("preparing");
    setTranscriptionProgress(0);
    setFileError("");
    setCopied(false);
    try {
      const result = await transcribeAudioLocally(audioFile, onLocalProgress);
      setCustomSourceName(audioFile.name);
      setCustomSourceOriginal(result.text);
      setNote(result.text);
      setDirty(true);
      setCompletedTasks([]);
      setView("transcript");
      setTranscriptionBackend(result.backend);
      setTranscriptionProgress(100);
      setTranscriptionDetail("Transcript ready. Review it before analysis.");
      setTranscriptionPhase("done");
    } catch (error) {
      setTranscriptionPhase("error");
      setFileError(error instanceof Error ? error.message : "No se pudo transcribir el audio localmente.");
    }
  };

  const runAnalysis = () => {
    if (!note.trim()) return setFileError("Añade notas, sube un transcript o transcribe un audio antes de analizar.");
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
    setTranscriptionProgress(0);
    setTranscriptionBackend("");
    setNote(sample.note);
    setAnalysis(analyzeEditedNote(sample.note, sample));
    setDirty(false);
    setFileError("");
    setCompletedTasks([]);
    setView("overview");
  };

  const clearAudioSelection = () => {
    if (customSourceName === audioFile?.name) return clearCustomSource();
    setAudioFile(null);
    setTranscriptionPhase("idle");
    setTranscriptionProgress(0);
    setTranscriptionBackend("");
    setFileError("");
  };

  const toggleTask = (taskId: string) => setCompletedTasks((current) => current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]);

  const copyBrief = async () => {
    if (dirty || isBusy) return;
    const brief = [`SYNAPSE — ${sourceTitle}`, `Summary: ${analysis.summary}`, "Decisions:", ...analysis.decisions.map((item) => `- ${item}`), "Tasks:", ...analysis.tasks.map((item) => `- ${item.title} — ${item.owner} — ${item.timing}`), "Risks:", ...analysis.risks.map((item) => `- ${item}`), `Next checkpoint: ${analysis.checkpoint}`].join("\n");
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

  const resultTitle = transcriptionPhase === "preparing" ? "Preparing local Whisper…" : transcriptionPhase === "transcribing" ? "Transcribing locally…" : phase === "analyzing" ? "Structuring meeting…" : dirty ? "Ready to analyze" : "Meeting brief ready";
  const resultStatus = transcriptionPhase === "preparing" ? "PREPARING" : transcriptionPhase === "transcribing" ? "TRANSCRIBING" : phase === "analyzing" ? "WORKING" : dirty ? "PENDING" : "READY";
  const resultStatusClass = transcriptionPhase === "preparing" || transcriptionPhase === "transcribing" || phase === "analyzing" ? "ready-pill is-processing" : dirty ? "ready-pill is-pending" : "ready-pill";

  return (
    <div className="demo-app workspace-v2">
      <aside className="demo-sidebar" aria-label="Vistas del workspace">
        <div className="demo-sidebar-brand"><Sparkles size={19} strokeWidth={2.2} /></div>
        <nav className="demo-sidebar-nav">
          {views.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} type="button" className={view === item.id ? "is-active" : ""} onClick={() => setView(item.id)} aria-label={item.label} aria-pressed={view === item.id} title={item.label}><Icon size={18} /></button>;
          })}
        </nav>
        <div className="demo-sidebar-spacer" />
        <div className="demo-avatar" aria-label="Sara Duque">SD</div>
      </aside>

      <div className="demo-workspace">
        <div className="demo-topbar">
          <div className="workspace-title"><span className="demo-breadcrumb">SYNAPSE / {sourceTitle}</span><strong>Meeting Intelligence</strong></div>
          <div className="demo-topbar-actions">
            <span className="sample-data-pill"><Gauge size={13} /> LIVE DEMO</span>
            <button type="button" className="copy-button" onClick={copyBrief} disabled={dirty || isBusy}><Copy size={14} />{dirty ? "Analyze first" : copied ? "Copied" : "Copy brief"}</button>
          </div>
        </div>

        <div className="demo-body">
          <section className="source-column">
            <div className="panel-heading"><div><span>INPUT</span><h3>Choose meeting source</h3></div><p>Start with a sample or bring your own meeting.</p></div>

            <div className="source-switcher" aria-label="Reuniones de ejemplo">
              {samples.map((item) => <button key={item.id} type="button" className={!customSourceName && !audioFile && sampleId === item.id ? "source-chip is-active" : "source-chip"} onClick={() => resetWorkspaceToSample(item)} aria-pressed={!customSourceName && !audioFile && sampleId === item.id}>
                <span className="source-chip-icon"><Users size={15} /></span><span className="source-chip-copy"><strong>{item.label}</strong><small>{item.meta}</small></span><CheckCircle2 className="source-chip-check" size={17} />
              </button>)}
            </div>

            <div className="input-methods">
              <label className="input-method-card">
                <input type="file" accept=".txt,.md,.csv,.json,.srt,.vtt,text/plain,text/csv,application/json" onChange={handleTextFileChange} />
                <span className="input-method-icon"><Upload size={19} /></span><span><strong>Upload transcript</strong><small>TXT, MD, CSV, JSON, SRT or VTT · 1 MB</small></span><ArrowRight size={16} className="input-method-arrow" />
              </label>
              <label className="input-method-card is-audio">
                <input type="file" accept=".mp3,.m4a,.wav,.webm,.ogg,.mp4,audio/mpeg,audio/mp4,audio/wav,audio/webm,audio/ogg" onChange={handleAudioFileChange} />
                <span className="input-method-icon"><AudioLines size={20} /></span><span><strong>Upload meeting audio</strong><small>Local Whisper · up to 12 MB</small></span><ArrowRight size={16} className="input-method-arrow" />
              </label>
            </div>

            {textFileName && <div className="source-file-pill"><FileText size={15} /><span>{textFileName}</span><button type="button" onClick={clearCustomSource} aria-label="Quitar transcript"><X size={14} /></button></div>}
            {audioFile && <div className="audio-file-card">
              <div className="audio-file-main"><span className="audio-file-icon"><FileAudio2 size={18} /></span><div><span className="audio-file-kicker">{transcriptionPhase === "done" ? "TRANSCRIPT READY" : "PRIVATE AUDIO"}</span><strong title={audioFile.name}>{audioFile.name}</strong><small>{formatBytes(audioFile.size)}{transcriptionBackend ? ` · ${transcriptionBackend}` : ""}</small></div></div>
              <div className="audio-file-actions"><button type="button" className="icon-button" onClick={clearAudioSelection} disabled={isBusy} aria-label="Quitar audio"><X size={15} /></button><button type="button" className="transcribe-button" onClick={transcribeAudio} disabled={isBusy}>{isBusy && phase !== "analyzing" ? <LoaderCircle size={15} className="spin" /> : <AudioLines size={15} />}{transcriptionPhase === "preparing" ? "Preparing model…" : transcriptionPhase === "transcribing" ? "Transcribing…" : transcriptionPhase === "done" ? "Transcribe again" : "Transcribe locally"}</button></div>
            </div>}

            {audioFile && (transcriptionPhase === "preparing" || transcriptionPhase === "transcribing") && <div className="local-model-progress" aria-live="polite">
              <div className="local-model-progress-head"><span>{transcriptionDetail}</span><strong>{transcriptionProgress ? `${transcriptionProgress}%` : transcriptionBackend || "LOCAL"}</strong></div>
              <div className="local-model-progress-track"><i style={{ width: `${Math.max(6, transcriptionProgress)}%` }} /></div>
            </div>}

            {fileError && <p className="upload-error" role="alert"><AlertTriangle size={14} />{fileError}</p>}

            <label className="note-editor editor-v2">
              <span className="editor-label"><span>Transcript / notes</span><small>{note.length.toLocaleString()} chars</small></span>
              <textarea value={note} onChange={(event) => { setNote(event.target.value); setDirty(true); setCopied(false); }} rows={9} />
            </label>

            {transcriptionPhase === "done" && <p className="transcription-success"><CheckCircle2 size={14} />Audio transcribed locally. Review the text before analysis.</p>}
            {dirty && <p className="pending-note">Changes detected. Analyze to refresh the meeting brief.</p>}

            <div className="source-actions source-actions-v2">
              <button type="button" className="reset-button" onClick={resetNote} disabled={isBusy}><RotateCcw size={15} />Reset</button>
              <button type="button" className="analyze-button" onClick={runAnalysis} disabled={isBusy}>{phase === "analyzing" ? <LoaderCircle size={16} className="spin" /> : <Sparkles size={16} />}{phase === "analyzing" ? "Analyzing…" : "Analyze meeting"}<ArrowRight size={16} /></button>
            </div>
            <p className="local-privacy-note"><LockKeyhole size={13} />Your audio stays on this device. The first run downloads the open-source Whisper model and caches it in the browser.</p>
          </section>

          <section className="insight-column" aria-live="polite" aria-busy={isBusy}>
            <div className="insight-summary-bar"><div><span>MEETING OUTPUT</span><strong>{resultTitle}</strong></div><span className={resultStatusClass}>{resultStatus === "READY" && <Check size={12} />}{resultStatus}</span></div>

            <div className="result-tabs" role="tablist" aria-label="Resultados de la reunión">
              {views.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" role="tab" aria-selected={view === item.id} className={view === item.id ? "is-active" : ""} onClick={() => setView(item.id)}><Icon size={14} />{item.label}{item.id === "tasks" ? <em>{analysis.tasks.length}</em> : item.id === "risks" ? <em>{analysis.risks.length}</em> : null}</button>; })}
            </div>

            <div className="result-content result-content-v2">
              {transcriptionPhase === "preparing" ? <div className="processing-state"><Cpu size={30} /><strong>Preparing local Whisper</strong><span>{transcriptionDetail}</span></div>
              : transcriptionPhase === "transcribing" ? <div className="processing-state"><LoaderCircle size={30} className="spin" /><strong>Transcribing on this device</strong><span>Audio never leaves your browser.</span></div>
              : phase === "analyzing" ? <div className="processing-state"><Sparkles size={30} /><strong>Structuring the meeting</strong><span>Detecting decisions, owners, tasks and risks…</span></div>
              : dirty ? <div className="pending-state"><Sparkles size={26} /><span>INPUT READY</span><strong>Your meeting is ready to analyze.</strong><p>Review the transcript, then run analysis to refresh decisions, tasks and risks.</p></div>
              : view === "overview" ? <div className="overview-tab overview-v2">
                  <article className="summary-card summary-card-v2"><div className="result-card-icon"><FileText size={18} /></div><div><span>MEETING SUMMARY</span><p>{analysis.summary}</p></div></article>
                  <article className="decision-highlight decision-highlight-v2"><div className="result-card-icon success"><ClipboardCheck size={18} /></div><div><span>KEY DECISION</span><strong>{analysis.decisions[0]}</strong></div><CheckCircle2 size={20} /></article>
                  <div className="overview-stats overview-stats-v2"><article><span className="metric-icon"><ClipboardCheck size={16} /></span><div><small>Decisions</small><strong>{String(analysis.decisions.length).padStart(2,"0")}</strong></div></article><article><span className="metric-icon"><ListChecks size={16} /></span><div><small>Tasks</small><strong>{String(analysis.tasks.length).padStart(2,"0")}</strong></div></article><article><span className="metric-icon danger"><AlertTriangle size={16} /></span><div><small>Risks</small><strong>{String(analysis.risks.length).padStart(2,"0")}</strong></div></article></div>
                  <div className="next-checkpoint next-checkpoint-v2"><span className="metric-icon"><CheckCircle2 size={16} /></span><div><small>NEXT CHECKPOINT</small><strong>{analysis.checkpoint}</strong></div></div>
                </div>
              : view === "transcript" ? <div className="transcript-list">{transcript.map((line) => <article key={`${line.time}-${line.speaker}-${line.text}`}><span>{line.time}</span><div><strong>{line.speaker}</strong><p>{line.text}</p></div></article>)}</div>
              : view === "decisions" ? <div className="decision-list">{analysis.decisions.map((item, index) => <article key={`${index}-${item}`}><span><ClipboardCheck size={16} /></span><div><b>Decision {index+1}</b><p>{item}</p></div><CheckCircle2 size={18} /></article>)}</div>
              : view === "tasks" ? <div className="task-list">{analysis.tasks.map((task) => { const done = completedTasks.includes(task.id); return <article key={task.id} className={done ? "is-complete" : ""}><button type="button" className="task-check" onClick={() => toggleTask(task.id)} aria-pressed={done} aria-label={`${done ? "Reabrir" : "Completar"} ${task.title}`}>{done && <Check size={14} />}</button><div><strong>{task.title}</strong><span>{task.owner}</span></div><em>{task.timing}</em></article>; })}</div>
              : <div className="risk-list">{analysis.risks.map((risk, index) => <article key={`${index}-${risk}`}><span><AlertTriangle size={16} /></span><div><b>Risk {index+1}</b><p>{risk}</p></div></article>)}</div>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
