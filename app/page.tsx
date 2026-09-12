import { MeetingDemo } from "@/components/meeting-demo";

const features = [
  ["01", "Capture", "Recibe una transcripción, notas de reunión o un resumen pegado por el usuario."],
  ["02", "Understand", "Separa decisiones, compromisos, responsables, fechas y posibles bloqueos."],
  ["03", "Organize", "Convierte lo hablado en un brief claro con tareas y próximos pasos."],
  ["04", "Follow up", "Mantiene decisiones y acciones conectadas para que nada se pierda después de la reunión."],
];

const faqs = [
  [
    "¿SYNAPSE AI es un producto real?",
    "No. Es un concepto ficticio de portafolio diseñado para demostrar UX/UI y frontend aplicado a meeting intelligence.",
  ],
  [
    "¿La demo usa una IA real?",
    "No. La demo funciona de forma local con lógica determinística y ejemplos de muestra. No envía ni almacena información.",
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

          <a href="#demo" className="header-cta">Probar reunión <span>→</span></a>
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
              SYNAPSE convierte una reunión en un resumen accionable: qué se decidió, quién hace qué, para cuándo y qué puede bloquear el siguiente paso.
            </p>

            <div className="hero-actions">
              <a href="#demo" className="primary-action">Probar una reunión <span>→</span></a>
              <a href="#how" className="secondary-action">Ver el flujo</a>
            </div>

            <div className="hero-proof">
              <span>Transcript</span><span>Summary</span><span>Decisions</span><span>Tasks</span>
            </div>
          </div>

          <div className="brain-visual" aria-label="SYNAPSE transforma conversación en decisiones y tareas">
            <div className="brain-orbit brain-orbit-a" />
            <div className="brain-orbit brain-orbit-b" />
            <svg className="brain-svg" viewBox="0 0 430 320" role="img" aria-label="Red neuronal conceptual">
              <defs>
                <linearGradient id="brainStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#19d6ff" />
                  <stop offset="55%" stopColor="#6d72ff" />
                  <stop offset="100%" stopColor="#ef4cff" />
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <path className="brain-outline" d="M82 118C72 78 103 45 143 47c17-25 58-29 80-6 25-19 67-4 72 25 39-1 69 34 57 72 28 17 35 57 12 83-12 14-28 22-45 23-8 35-42 55-75 43-20 24-59 28-83 8-28 12-61-3-70-33-35-3-58-38-42-69-18-29-4-65 33-75Z" />
              {[
                [88,72,132,50],[132,50,180,62],[180,62,220,44],[220,44,260,72],[260,72,300,58],[300,58,344,86],
                [88,72,116,108],[132,50,160,122],[180,62,205,102],[220,44,252,120],[260,72,296,106],[300,58,356,126],
                [70,118,116,108],[116,108,160,122],[160,122,205,102],[205,102,252,120],[252,120,296,106],[296,106,356,126],
                [70,118,82,168],[116,108,128,158],[160,122,176,174],[205,102,224,154],[252,120,270,170],[296,106,318,158],[356,126,350,194],
                [82,168,128,158],[128,158,176,174],[176,174,224,154],[224,154,270,170],[270,170,318,158],[318,158,350,194],
                [82,168,112,216],[128,158,158,204],[176,174,204,220],[224,154,250,206],[270,170,294,220],[318,158,324,250],
                [112,216,158,204],[158,204,204,220],[204,220,250,206],[250,206,294,220],[294,220,324,250],
              ].map((l, i) => <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} className="brain-link" />)}
              {[[88,72],[132,50],[180,62],[220,44],[260,72],[300,58],[344,86],[70,118],[116,108],[160,122],[205,102],[252,120],[296,106],[356,126],[82,168],[128,158],[176,174],[224,154],[270,170],[318,158],[350,194],[112,216],[158,204],[204,220],[250,206],[294,220],[324,250]].map(([cx,cy], i) => (
                <g key={i} filter={i % 5 === 0 ? "url(#glow)" : undefined}><circle cx={cx} cy={cy} r={i % 5 === 0 ? 5 : 3.1} className="brain-node" /></g>
              ))}
            </svg>
            <div className="brain-tag brain-tag--meetings"><span>INPUT</span><strong>Meeting audio</strong></div>
            <div className="brain-tag brain-tag--notes"><span>INPUT</span><strong>Transcript + notes</strong></div>
            <div className="brain-tag brain-tag--decision"><span>OUTPUT</span><strong>Decisions</strong></div>
            <div className="brain-tag brain-tag--actions"><span>OUTPUT</span><strong>Tasks + owners</strong></div>
            <div className="brain-core-label"><span>SYNAPSE CORE</span><strong>Meeting → execution</strong></div>
          </div>
        </div>
      </section>

      <section id="product" className="value-strip">
        <div className="site-width value-strip-inner">
          <span>BEFORE</span><b>45 min meeting</b><i>→</i>
          <span>SYNAPSE</span><b>Meeting intelligence</b><i>→</i>
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
            <h2>Prueba el flujo completo de una reunión.</h2>
          </div>
          <p>
            Cambia de reunión, edita el contexto, ejecuta el análisis local, navega por transcript, decisiones, tareas y riesgos, marca tareas como completadas y copia el brief.
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
          <div><span>MEETING → DECISION → ACTION</span><h2>Que la próxima reunión termine con trabajo claro.</h2><p>Demo conceptual y local. Sin cuenta, sin almacenamiento y sin llamadas a IA externa.</p></div>
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
