import { HeroBrain } from "@/components/hero-brain";
import { MeetingDemo } from "@/components/meeting-demo";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  ["01", "Capture", "Pega una transcripción, edita notas o sube un archivo de texto o audio para probar el flujo con tu propio contenido."],
  ["02", "Transcribe", "Cuando subes audio, SYNAPSE lo convierte en texto antes de pasar al análisis de la reunión."],
  ["03", "Understand", "Separa decisiones, compromisos, responsables, fechas y posibles bloqueos."],
  ["04", "Follow up", "Convierte lo hablado en un brief claro con tareas, riesgos y próximos pasos."],
];

const faqs = [
  [
    "¿SYNAPSE AI es un producto real?",
    "No. Es un concepto ficticio de portafolio diseñado para demostrar UX/UI y frontend aplicado a meeting intelligence.",
  ],
  [
    "¿La transcripción de audio sí es real?",
    "Sí. Los clips de audio compatibles se envían desde la API del proyecto a un servicio real de speech-to-text. El transcript vuelve al workspace para que puedas revisarlo antes de analizar la reunión.",
  ],
  [
    "¿Qué archivos puedo subir?",
    "Para texto: TXT, MD, CSV, JSON, SRT y VTT de hasta 1 MB. Para audio: MP3, M4A, WAV, WEBM, OGG o MP4 de hasta 4 MB en esta demo desplegada en Vercel.",
  ],
  [
    "¿La app guarda mi reunión?",
    "No hay base de datos en esta demo. Los transcripts de texto se leen en el navegador. El audio sí sale del navegador para ser transcrito, pero SYNAPSE no lo persiste en una base de datos propia.",
  ],
  [
    "¿Los datos del dashboard son reales?",
    "No. El dashboard está marcado como sample data y existe únicamente para representar cómo sería el producto.",
  ],
];

export default function Home() {
  return (
    <main className="synapse-site">
      <header className="site-header">
        <div className="site-width header-inner">
          <a href="#top" className="brand" aria-label="SYNAPSE AI, inicio">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span><b>SYNAPSE</b><small>MEETING INTELLIGENCE</small></span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#product">Producto</a>
            <a href="#how">Cómo funciona</a>
            <a href="#demo">Demo</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a href="#demo" className="header-cta">Probar reunión <span>→</span></a>
          </div>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />

        <div className="site-width hero-layout">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span>✦</span> AI MEETING INTELLIGENCE · PORTFOLIO CONCEPT</div>
            <h1>Cada reunión termina con <span>decisiones y tareas claras.</span></h1>
            <p>
              SYNAPSE recibe notas, transcripts o audio, convierte la conversación en texto y la organiza en decisiones, responsables, tareas, fechas y riesgos.
            </p>

            <div className="hero-actions">
              <a href="#demo" className="primary-action">Probar una reunión <span>→</span></a>
              <a href="#how" className="secondary-action">Ver el flujo</a>
            </div>

            <div className="hero-proof">
              <span>Audio</span><span>Transcript</span><span>Decisions</span><span>Tasks</span>
            </div>
          </div>

          <HeroBrain />
        </div>
      </section>

      <section id="product" className="value-strip">
        <div className="site-width value-strip-inner">
          <span>BEFORE</span><b>Meeting audio / transcript</b><i>→</i>
          <span>SYNAPSE</span><b>Transcribe + understand</b><i>→</i>
          <span>AFTER</span><b>Summary · Decisions · Tasks · Risks</b>
        </div>
      </section>

      <section id="how" className="features-section">
        <div className="site-width section-heading centered-heading">
          <span>HOW IT WORKS</span>
          <h2>De conversación larga a seguimiento claro.</h2>
          <p>El producto se concentra en una sola tarea: que la reunión termine con claridad operativa.</p>
        </div>
        <div className="site-width feature-grid">
          {features.map(([number, title, copy]) => (
            <article className="feature-card" key={number}>
              <div className="feature-icon" aria-hidden="true">{number}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="site-width section-heading demo-heading">
          <div>
            <span>INTERACTIVE MEETING DEMO</span>
            <h2>Prueba el flujo con una reunión propia.</h2>
          </div>
          <p>
            Usa un ejemplo, pega tus notas, sube un transcript o carga un audio corto. SYNAPSE transcribe el audio, te deja revisar el texto y después genera el brief operativo.
          </p>
        </div>
        <div className="site-width product-demo-frame"><MeetingDemo /></div>
      </section>

      <section className="dashboard-section" aria-label="Vista conceptual del producto">
        <div className="site-width dashboard-shell">
          <aside className="dashboard-sidebar" aria-hidden="true">
            <div className="dashboard-logo">S</div>
            <span className="is-active">Overview</span><span>Meetings</span><span>Decisions</span><span>Tasks</span><span>Timeline</span>
          </aside>
          <div className="dashboard-main">
            <div className="dashboard-topline"><div><span>SAMPLE WORKSPACE</span><h3>This week</h3></div><span className="sample-data-pill">SAMPLE DATA</span></div>
            <div className="metric-grid">
              <article><span>Meetings processed</span><strong>08</strong><small>This week</small></article>
              <article><span>Decisions captured</span><strong>13</strong><small>3 need follow-up</small></article>
              <article><span>Open tasks</span><strong>11</strong><small>4 due soon</small></article>
              <article><span>Risks detected</span><strong>03</strong><small>Owner assigned</small></article>
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-chart">
                <div className="chart-head"><span>Meeting → action completion</span><b>Last 7 days</b></div>
                <div className="chart-bars" aria-hidden="true">{[42,58,49,72,67,86,78].map((h) => <i key={h} style={{height:`${h}%`}} />)}</div>
                <div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
              </div>
              <div className="decision-feed">
                <div className="chart-head"><span>Recent meeting outcomes</span><b>Sample</b></div>
                <article><i>✓</i><div><strong>Release stays Friday</strong><span>Launch sync · 10:42</span></div></article>
                <article><i>✓</i><div><strong>Technical demo approved</strong><span>Sales handoff · 09:18</span></div></article>
                <article><i>!</i><div><strong>Export bug blocks RC</strong><span>Bug triage · Yesterday</span></div></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="site-width faq-layout">
          <div className="section-heading"><span>FAQ</span><h2>Una demo clara, sin funciones ficticias disfrazadas de reales.</h2></div>
          <div className="faq-list">
            {faqs.map(([q,a], i) => <details key={q} open={i===0}><summary><span>0{i+1}</span><strong>{q}</strong><b aria-hidden="true">+</b></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="final-glow" />
        <div className="site-width final-inner">
          <div className="final-brain-mark" aria-hidden="true">S</div>
          <div><span>MEETING → TRANSCRIPT → DECISION → ACTION</span><h2>Que la próxima reunión termine con trabajo claro.</h2><p>Sube audio o texto, revisa el transcript y conviértelo en seguimiento accionable.</p></div>
          <a href="#demo" className="primary-action">Probar reunión <span>→</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-width footer-inner">
          <div className="brand"><span className="brand-mark">S</span><span><b>SYNAPSE</b><small>MEETING INTELLIGENCE</small></span></div>
          <p>B2B SaaS · Meeting intelligence · Portfolio concept</p>
          <p>UX/UI + Frontend by Sara Duque</p>
        </div>
      </footer>
    </main>
  );
}
