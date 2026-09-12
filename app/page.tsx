import { SynapseDemo } from "@/components/synapse-demo";

const faqItems = [
  [
    "¿SYNAPSE AI es un producto real?",
    "No. Es un concepto ficticio de portafolio creado para demostrar UX/UI, frontend y estrategia de conversión para un SaaS B2B de productividad con IA.",
  ],
  [
    "¿El demo procesa las notas con IA?",
    "No. La demostración es local y utiliza ejemplos predefinidos. No envía texto a un modelo ni almacena información.",
  ],
  [
    "¿Las integraciones ya existen?",
    "No. Se muestran como una arquitectura conceptual de producto, no como integraciones comerciales activas.",
  ],
];

const workflow = [
  {
    number: "01",
    title: "Captura el contexto",
    copy: "Una reunión, una nota o un hilo entran al mismo espacio de trabajo.",
  },
  {
    number: "02",
    title: "Separa lo importante",
    copy: "Decisiones y próximos pasos quedan diferenciados del resto de la conversación.",
  },
  {
    number: "03",
    title: "Deja el trabajo visible",
    copy: "Cada acción conserva owner, timing y relación con la decisión que la originó.",
  },
];

const useCases = [
  ["Product", "Roadmap, discovery, decisiones y handoffs."],
  ["Sales", "Compromisos, requisitos y próximos pasos."],
  ["Operations", "Bloqueos, acuerdos y seguimiento operativo."],
];

export default function Home() {
  return (
    <main className="synapse-site">
      <header className="site-header">
        <div className="site-width header-inner">
          <a href="#top" className="brand" aria-label="SYNAPSE AI, inicio">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>SYNAPSE AI</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#system">Sistema</a>
            <a href="#teams">Equipos</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a href="#demo" className="header-cta">Probar demo</a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="site-width hero-layout">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              AI WORKSPACE · PORTFOLIO CONCEPT
            </div>

            <h1>Del contexto al siguiente paso, sin perder el hilo.</h1>

            <p>
              SYNAPSE organiza notas, decisiones y follow-ups en un espacio de trabajo compacto para equipos que necesitan avanzar con claridad.
            </p>

            <div className="hero-actions">
              <a href="#demo" className="primary-action">Probar la experiencia</a>
              <a href="#system" className="secondary-action">Ver cómo funciona</a>
            </div>

            <div className="hero-proof">
              <span>Demo local</span>
              <span>Sin registro</span>
              <span>Sin datos reales</span>
            </div>
          </div>

          <div id="demo" className="command-center-wrap">
            <div className="command-center-head">
              <div>
                <span className="window-dot" aria-hidden="true" />
                <span className="window-dot" aria-hidden="true" />
                <span className="window-dot" aria-hidden="true" />
              </div>
              <span>Workspace / Meeting intelligence</span>
              <span className="command-shortcut">⌘ K</span>
            </div>
            <SynapseDemo />
          </div>
        </div>
      </section>

      <section id="system" className="system-section">
        <div className="site-width system-layout">
          <div className="section-heading">
            <span>01 · SYSTEM</span>
            <h2>Un flujo simple para convertir conversación en trabajo.</h2>
            <p>
              Menos decoración y más producto: cada parte de la interfaz responde a una etapa concreta del flujo.
            </p>
          </div>

          <div className="workflow-list">
            {workflow.map((item) => (
              <article key={item.number} className="workflow-item">
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="context-section">
        <div className="site-width context-panel">
          <div className="context-copy">
            <span>02 · CONTEXT</span>
            <h2>La decisión y la acción viven juntas.</h2>
            <p>
              El concepto evita una colección de dashboards. La prioridad es que el equipo entienda qué se decidió, quién sigue y por qué.
            </p>
          </div>

          <div className="context-example" aria-label="Ejemplo conceptual de decisión y acciones">
            <div className="context-decision">
              <span>DECISION</span>
              <strong>Release stays Friday</strong>
              <p>Condicionado a analytics y QA móvil.</p>
            </div>
            <div className="context-actions">
              <div><span>01</span><strong>Hero copy</strong><em>Sara · Today</em></div>
              <div><span>02</span><strong>Analytics</strong><em>Diego · Thu</em></div>
              <div><span>03</span><strong>Mobile QA</strong><em>QA · Next</em></div>
            </div>
          </div>
        </div>
      </section>

      <section id="teams" className="teams-section">
        <div className="site-width">
          <div className="section-heading section-heading--compact">
            <span>03 · USE CASES</span>
            <h2>Mismo problema. Distintos equipos.</h2>
          </div>

          <div className="team-grid">
            {useCases.map(([title, copy], index) => (
              <article key={title} className="team-item">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <b aria-hidden="true">↗</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="site-width trust-bar">
          <span>Conceptual requirements</span>
          <div>Role-based access</div>
          <div>Audit trail</div>
          <div>Data controls</div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="site-width faq-layout">
          <div className="section-heading section-heading--compact">
            <span>04 · FAQ</span>
            <h2>Transparencia antes del CTA.</h2>
          </div>

          <div className="faq-list">
            {faqItems.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  <span>0{index + 1}</span>
                  <strong>{question}</strong>
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="site-width final-inner">
          <div>
            <span>05 · TRY IT</span>
            <h2>Prueba el flujo sin crear una cuenta.</h2>
            <p>La experiencia es demostrativa y no envía información a ningún servicio externo.</p>
          </div>
          <a href="#demo" className="primary-action">Abrir demo</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-width footer-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>SYNAPSE AI</span>
          </div>
          <p>B2B SaaS · AI productivity · Portfolio concept</p>
          <p>UX/UI + Frontend by Sara Duque</p>
        </div>
      </footer>
    </main>
  );
}
