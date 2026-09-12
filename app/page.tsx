import { NeuralBrain } from "@/components/neural-brain";
import { SynapseDemo } from "@/components/synapse-demo";

const features = [
  ["Capture", "Reúne contexto de reuniones, notas, chats y correos en un mismo flujo."],
  ["Distill", "Separa decisiones, tareas, responsables, fechas y bloqueos del ruido."],
  ["Assign", "Convierte cada siguiente paso en una acción con owner y timing visibles."],
  ["Track", "Mantiene decisiones y acciones conectadas para que el equipo no pierda contexto."],
];

const faqItems = [
  [
    "¿SYNAPSE AI es un producto real?",
    "No. Es un concepto ficticio de portafolio creado para demostrar UX/UI, frontend e interacción para un SaaS B2B de productividad con IA.",
  ],
  [
    "¿El demo usa inteligencia artificial real?",
    "No. La experiencia es una simulación local con salidas predefinidas. No envía información a un modelo ni almacena datos.",
  ],
  [
    "¿Las métricas del dashboard son reales?",
    "No. Cualquier cifra visible dentro del workspace está marcada como sample data y existe únicamente para representar la interfaz del producto.",
  ],
];

export default function Home() {
  return (
    <main className="synapse-site">
      <header className="site-header">
        <div className="site-width header-inner">
          <a href="#top" className="brand" aria-label="SYNAPSE AI, inicio">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span><b>SYNAPSE</b><small>AI WORKFLOW</small></span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#product">Producto</a>
            <a href="#how">Cómo funciona</a>
            <a href="#demo">Demo</a>
            <a href="#teams">Equipos</a>
          </nav>

          <a href="#demo" className="header-cta">Probar demo <span>→</span></a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />
        <div className="site-width hero-layout">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span>✦</span> AI-POWERED WORKFLOW · PORTFOLIO CONCEPT</div>
            <h1>
              Convierte conversaciones en
              <span> trabajo accionable.</span>
            </h1>
            <p>
              SYNAPSE transforma reuniones, notas, chats y correos en decisiones claras, tareas, responsables, fechas y próximos pasos para que tu equipo avance sin perder contexto.
            </p>

            <div className="hero-actions">
              <a href="#demo" className="primary-action">Probar demo <span>→</span></a>
              <a href="#how" className="secondary-action">Ver cómo funciona</a>
            </div>

            <div className="hero-proof">
              <span>Decisions</span>
              <span>Tasks</span>
              <span>Owners</span>
              <span>Deadlines</span>
            </div>
          </div>

          <NeuralBrain />
        </div>
      </section>

      <section id="product" className="value-strip">
        <div className="site-width value-strip-inner">
          <span>INPUT</span><b>Meetings · Chat · Email · Docs</b>
          <i>→</i>
          <span>SYNAPSE</span><b>Context engine</b>
          <i>→</i>
          <span>OUTPUT</span><b>Decisions · Tasks · Owners · Risks</b>
        </div>
      </section>

      <section id="how" className="features-section">
        <div className="site-width section-heading centered-heading">
          <span>HOW IT WORKS</span>
          <h2>Todo lo necesario para pasar de contexto a ejecución.</h2>
          <p>Cuatro etapas sencillas. Sin vender una IA genérica que “hace de todo”.</p>
        </div>
        <div className="site-width feature-grid">
          {features.map(([title, copy], index) => (
            <article key={title} className="feature-card">
              <div className="feature-icon" aria-hidden="true">0{index + 1}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="feature-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="site-width section-heading demo-heading">
          <div>
            <span>PRODUCT DEMO</span>
            <h2>De una nota de reunión a un workspace ejecutable.</h2>
          </div>
          <p>
            Interactúa con una simulación más cercana a un producto real: selecciona contexto, ejecuta el análisis local y navega por resumen, decisiones, tareas y riesgos.
          </p>
        </div>

        <div className="site-width product-demo-frame">
          <SynapseDemo />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="site-width dashboard-shell">
          <div className="dashboard-sidebar" aria-hidden="true">
            <div className="dashboard-logo">S</div>
            <span className="is-active">Overview</span>
            <span>Decisions</span>
            <span>Actions</span>
            <span>Meetings</span>
            <span>Timeline</span>
            <span>Settings</span>
          </div>

          <div className="dashboard-main">
            <div className="dashboard-topline">
              <div><span>SAMPLE WORKSPACE</span><h3>Execution overview</h3></div>
              <span className="sample-data-pill">SAMPLE DATA</span>
            </div>

            <div className="metric-grid">
              <article><span>Open actions</span><strong>12</strong><small>5 due this week</small></article>
              <article><span>Decisions captured</span><strong>07</strong><small>2 need follow-up</small></article>
              <article><span>Blocked items</span><strong>02</strong><small>Owner assigned</small></article>
              <article><span>Upcoming deadlines</span><strong>05</strong><small>Next 7 days</small></article>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-chart">
                <div className="chart-head"><span>Action completion</span><b>Last 7 days</b></div>
                <div className="chart-bars" aria-hidden="true">
                  <i style={{height:"36%"}}/><i style={{height:"58%"}}/><i style={{height:"44%"}}/><i style={{height:"72%"}}/><i style={{height:"64%"}}/><i style={{height:"86%"}}/><i style={{height:"78%"}}/>
                </div>
                <div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
              </div>

              <div className="decision-feed">
                <div className="chart-head"><span>Recent decisions</span><b>View all →</b></div>
                <article><i>✓</i><div><strong>Release stays Friday</strong><span>Launch sync · 10:42</span></div></article>
                <article><i>✓</i><div><strong>Security review before demo</strong><span>Sales handoff · 09:18</span></div></article>
                <article><i>!</i><div><strong>Export bug blocks RC</strong><span>Bug triage · Yesterday</span></div></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="teams" className="teams-section">
        <div className="site-width teams-layout">
          <div className="section-heading">
            <span>BUILT AROUND REAL TEAM FRICTION</span>
            <h2>Una misma capa de claridad para distintos equipos.</h2>
          </div>
          <div className="team-list">
            <article><span>01</span><div><h3>Product</h3><p>Roadmap, discovery, handoffs y decisiones que necesitan continuidad.</p></div><b>→</b></article>
            <article><span>02</span><div><h3>Sales</h3><p>Requisitos, compromisos y próximos pasos después de cada conversación.</p></div><b>→</b></article>
            <article><span>03</span><div><h3>Operations</h3><p>Bloqueos, acuerdos, owners y seguimiento entre múltiples canales.</p></div><b>→</b></article>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="site-width faq-layout">
          <div className="section-heading">
            <span>FAQ</span>
            <h2>Claridad también en lo que el concepto no afirma.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>0{index + 1}</span><strong>{question}</strong><b aria-hidden="true">+</b></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="final-glow" />
        <div className="site-width final-inner">
          <div className="final-brain-mark" aria-hidden="true">S</div>
          <div>
            <span>CONTEXT → DECISION → ACTION</span>
            <h2>Haz que la próxima conversación termine con trabajo claro.</h2>
            <p>Demo conceptual. No crea una cuenta ni envía información a un servicio externo.</p>
          </div>
          <a href="#demo" className="primary-action">Probar demo <span>→</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-width footer-inner">
          <div className="brand"><span className="brand-mark">S</span><span><b>SYNAPSE</b><small>AI WORKFLOW</small></span></div>
          <p>B2B SaaS · AI productivity · Portfolio concept</p>
          <p>UX/UI + Frontend by Sara Duque</p>
        </div>
      </footer>
    </main>
  );
}
