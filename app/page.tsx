import { SynapseDemo } from "@/components/synapse-demo";

const faqItems = [
  [
    "¿SYNAPSE AI es un producto real?",
    "No. Es un concepto ficticio de portafolio creado para demostrar estrategia de landing, UX/UI, frontend e interacción para un SaaS B2B de productividad con IA.",
  ],
  [
    "¿El demo procesa las notas con inteligencia artificial?",
    "No. La demostración es local y utiliza ejemplos predefinidos. No envía texto a un modelo, no guarda información y no representa una integración comercial activa.",
  ],
  [
    "¿Las integraciones y funciones de seguridad están disponibles?",
    "Se muestran como requisitos conceptuales de producto, no como capacidades verificadas. El caso evita presentar features ficticias como si ya existieran.",
  ],
  [
    "¿Por qué no aparecen logos de clientes o métricas de crecimiento?",
    "Porque el proyecto no tiene clientes reales ni datos de negocio. No se inventan testimonios, logos, benchmarks ni resultados para hacer más convincente el caso.",
  ],
];

const featureCards = [
  {
    index: "01",
    eyebrow: "CAPTURE",
    title: "Una bandeja para el ruido operativo.",
    copy: "Reúne notas, decisiones y contexto en una vista preparada para convertir información dispersa en trabajo accionable.",
    className: "feature-card feature-card--capture",
  },
  {
    index: "02",
    eyebrow: "STRUCTURE",
    title: "Decisiones separadas de las tareas.",
    copy: "La interfaz distingue qué se decidió, quién hace qué y qué sigue pendiente para reducir ambigüedad después de cada conversación.",
    className: "feature-card feature-card--structure",
  },
  {
    index: "03",
    eyebrow: "ASSIGN",
    title: "Ownership visible desde el primer vistazo.",
    copy: "Responsables y tiempos viven junto a la acción, no escondidos en un hilo, una grabación o un documento de seguimiento.",
    className: "feature-card feature-card--assign",
  },
  {
    index: "04",
    eyebrow: "TRACK",
    title: "El contexto permanece conectado al avance.",
    copy: "La propuesta mantiene la relación entre conversación, decisión y ejecución para que el equipo pueda retomar el porqué de cada tarea.",
    className: "feature-card feature-card--track",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-width header-inner">
          <a href="#top" className="brand" aria-label="SYNAPSE AI, inicio">
            <span className="brand-mark" aria-hidden="true">S//</span>
            <span>SYNAPSE AI</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#producto">Producto</a>
            <a href="#workflow">Workflow</a>
            <a href="#casos">Casos</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-actions">
            <a href="#demo" className="header-link">Ver demo</a>
            <a href="#trial" className="button button-primary">Probar gratis</a>
          </div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-width hero-copy">
          <div className="hero-kicker">
            <span className="live-dot" />
            AI WORK OPERATING SYSTEM · CONCEPT
          </div>
          <h1>
            De conversación a ejecución,
            <span> sin perder el hilo.</span>
          </h1>
          <p>
            SYNAPSE convierte notas, decisiones y follow-ups en un espacio de trabajo claro para equipos que necesitan avanzar sin reconstruir el contexto cada mañana.
          </p>
          <div className="hero-actions">
            <a href="#demo" className="button button-primary button-large">Probar el demo <span aria-hidden="true">↗</span></a>
            <a href="#producto" className="button button-ghost button-large">Explorar producto</a>
          </div>
          <div className="hero-meta">
            <span>Demo conceptual</span>
            <span>Sin registro</span>
            <span>No procesa datos reales</span>
          </div>
        </div>

        <div className="site-width product-stage" id="producto">
          <div className="product-window">
            <div className="product-topbar">
              <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
              <div className="workspace-title">Acme workspace / Daily focus</div>
              <div className="product-search">⌘ K</div>
            </div>

            <div className="product-layout">
              <aside className="product-sidebar" aria-hidden="true">
                <div className="sidebar-logo">S</div>
                <div className="sidebar-item is-active"><span>⌁</span><b>Focus</b></div>
                <div className="sidebar-item"><span>⌑</span><b>Inbox</b></div>
                <div className="sidebar-item"><span>◇</span><b>Decisions</b></div>
                <div className="sidebar-item"><span>✓</span><b>Actions</b></div>
                <div className="sidebar-spacer" />
                <div className="sidebar-avatar">SD</div>
              </aside>

              <div className="product-main">
                <div className="product-main-head">
                  <div>
                    <span className="ui-label">TODAY · THURSDAY</span>
                    <h2>What needs momentum?</h2>
                  </div>
                  <button type="button" className="ui-icon-button" aria-label="Más opciones">•••</button>
                </div>

                <div className="focus-grid">
                  <article className="focus-primary">
                    <div className="focus-primary-top">
                      <span className="ui-pill ui-pill--violet">IN PROGRESS</span>
                      <span className="ui-muted">Launch v2</span>
                    </div>
                    <h3>Website release</h3>
                    <p>3 open actions · 1 decision waiting</p>
                    <div className="progress-track"><span /></div>
                    <div className="mini-people"><i>SD</i><i>DR</i><i>QA</i></div>
                  </article>

                  <article className="focus-secondary">
                    <span className="ui-label">NEXT DECISION</span>
                    <h3>Approve mobile navigation before QA.</h3>
                    <div className="decision-people"><i>SD</i><span>Owner · Sara</span></div>
                    <button type="button" className="mini-button">Open context ↗</button>
                  </article>
                </div>

                <div className="activity-block">
                  <div className="activity-head">
                    <span>Recent signals</span>
                    <span>View all</span>
                  </div>
                  <div className="activity-row">
                    <span className="activity-icon">↳</span>
                    <div><strong>Meeting captured</strong><span>Launch sync · 09:42</span></div>
                    <span className="activity-state">3 actions</span>
                  </div>
                  <div className="activity-row">
                    <span className="activity-icon">✓</span>
                    <div><strong>Decision confirmed</strong><span>Pricing review · 08:16</span></div>
                    <span className="activity-state">Resolved</span>
                  </div>
                </div>
              </div>

              <aside className="context-rail">
                <span className="ui-label">CONTEXT</span>
                <h3>Launch v2</h3>
                <p>Everything connected to this workstream.</p>
                <div className="context-stat"><span>Decisions</span><strong>04</strong></div>
                <div className="context-stat"><span>Actions</span><strong>09</strong></div>
                <div className="context-stat"><span>Open</span><strong>03</strong></div>
                <div className="context-note">
                  <span>LAST UPDATE</span>
                  <p>“Analytics must be connected before final QA.”</p>
                </div>
              </aside>
            </div>
          </div>
          <p className="stage-caption">Conceptual product UI · No live workspace or customer data.</p>
        </div>
      </section>

      <section className="signal-strip" aria-label="Flujo conceptual">
        <div className="site-width signal-grid">
          {[
            ["01", "Capture"],
            ["02", "Structure"],
            ["03", "Assign"],
            ["04", "Track"],
          ].map(([number, label]) => (
            <div key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="site-width section-intro section-intro--split">
          <div>
            <p className="section-kicker">INTERACTIVE DEMO</p>
            <h2>Menos recap.<br />Más movimiento.</h2>
          </div>
          <p>
            La pieza central del concepto muestra cómo una conversación podría convertirse en decisiones y acciones sin vender una automatización que todavía no existe.
          </p>
        </div>
        <div className="site-width">
          <SynapseDemo />
        </div>
      </section>

      <section id="workflow" className="workflow-section">
        <div className="site-width">
          <div className="section-intro">
            <p className="section-kicker">WORKFLOW</p>
            <h2>El trabajo no debería empezar buscando dónde quedó la decisión.</h2>
          </div>

          <div className="before-after-grid">
            <article className="before-panel">
              <div className="comparison-label"><span>BEFORE</span><span>Fragmented context</span></div>
              <div className="fragment fragment--chat"><span>Chat</span><p>“¿Quién quedó con analytics?”</p></div>
              <div className="fragment fragment--doc"><span>Notes</span><p>Launch meeting — draft 4</p></div>
              <div className="fragment fragment--mail"><span>Inbox</span><p>Re: next steps after sync</p></div>
              <div className="fragment-lines" aria-hidden="true"><i /><i /><i /></div>
            </article>

            <article className="after-panel">
              <div className="comparison-label"><span>WITH SYNAPSE</span><span>One execution layer</span></div>
              <div className="pipeline-row"><span>01</span><div><strong>Decision</strong><p>Ship Friday after mobile QA.</p></div><b>LOCKED</b></div>
              <div className="pipeline-row"><span>02</span><div><strong>Action</strong><p>Connect analytics · Diego</p></div><b>THU</b></div>
              <div className="pipeline-row"><span>03</span><div><strong>Action</strong><p>Approve navigation · Sara</p></div><b>TODAY</b></div>
            </article>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="site-width section-intro section-intro--split">
          <div>
            <p className="section-kicker">PRODUCT SYSTEM</p>
            <h2>Contexto diseñado para sobrevivir a la reunión.</h2>
          </div>
          <p>
            En lugar de una colección de “AI features”, la propuesta se organiza alrededor de cuatro problemas operativos concretos.
          </p>
        </div>

        <div className="site-width feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.index} className={feature.className}>
              <div className="feature-top"><span>{feature.index}</span><span>{feature.eyebrow}</span></div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <div className="feature-ui" aria-hidden="true">
                <i /><i /><i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="casos" className="use-cases-section">
        <div className="site-width use-cases-grid">
          <div className="use-cases-copy">
            <p className="section-kicker">USE CASES</p>
            <h2>Una capa común para equipos que trabajan distinto.</h2>
            <p>
              El concepto cambia el contexto mostrado, no el principio central: cada conversación debe dejar una decisión clara y un siguiente paso visible.
            </p>
          </div>
          <div className="use-case-list">
            <article><span>01</span><div><h3>Product</h3><p>Decisiones de roadmap, handoffs y follow-ups después de discovery o planning.</p></div><b>→</b></article>
            <article><span>02</span><div><h3>Sales</h3><p>Requisitos, compromisos y próximos pasos después de cada conversación comercial.</p></div><b>→</b></article>
            <article><span>03</span><div><h3>Operations</h3><p>Acuerdos operativos, responsables y bloqueos que suelen quedar repartidos entre canales.</p></div><b>→</b></article>
          </div>
        </div>
      </section>

      <section className="connection-section">
        <div className="site-width connection-card">
          <div className="connection-copy">
            <p className="section-kicker">CONNECTION LAYER</p>
            <h2>Diseñado para vivir entre tus herramientas, no para reemplazarlas todas.</h2>
            <p>
              Las conexiones se presentan como categorías conceptuales. No implican integraciones comerciales activas.
            </p>
          </div>
          <div className="connection-map" aria-label="Categorías de integración conceptual">
            <span>CHAT</span><span>DOCS</span><span>TICKETS</span><span>CALENDAR</span><span>CRM</span><span>EMAIL</span>
            <div className="connection-core">S//</div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="site-width trust-grid">
          <div>
            <p className="section-kicker">TRUST BY DESIGN</p>
            <h2>Requisitos de producto, no promesas de seguridad.</h2>
          </div>
          <div className="trust-list">
            <article><span>REQUIREMENT 01</span><h3>Role-based access</h3><p>La propuesta contempla permisos por rol como requisito futuro; no afirma que exista una implementación productiva.</p></article>
            <article><span>REQUIREMENT 02</span><h3>Audit trail</h3><p>El historial de decisiones aparece como necesidad de diseño, no como certificación ni evidencia de cumplimiento.</p></article>
            <article><span>REQUIREMENT 03</span><h3>Data controls</h3><p>Retención, exportación y administración de datos quedan definidos como temas que una versión real tendría que resolver.</p></article>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="site-width pricing-shell">
          <div>
            <p className="section-kicker">CONCEPT PRICING</p>
            <h2>Un producto ficticio no necesita un precio inventado.</h2>
          </div>
          <div className="pricing-card">
            <span className="pricing-status">PORTFOLIO CONCEPT</span>
            <h3>Team workspace</h3>
            <p>El layout demuestra jerarquía de pricing y CTA sin presentar tarifas, descuentos o condiciones comerciales falsas.</p>
            <div className="pricing-features">
              <span>✓ Shared workspace</span>
              <span>✓ Decision + action views</span>
              <span>✓ Concept integrations</span>
            </div>
            <a href="#trial" className="button button-primary button-large">Explorar trial conceptual</a>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="site-width faq-grid">
          <div className="faq-copy">
            <p className="section-kicker">FAQ</p>
            <h2>Claridad antes del CTA.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><b aria-hidden="true">+</b></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="trial" className="final-cta">
        <div className="final-grid" aria-hidden="true" />
        <div className="site-width final-cta-inner">
          <span className="final-mark">S//</span>
          <p className="section-kicker">START WITH CONTEXT</p>
          <h2>Que la próxima reunión termine con trabajo claro, no con otra búsqueda.</h2>
          <p>CTA demostrativo para el caso de portafolio. No crea una cuenta ni inicia una suscripción real.</p>
          <a href="#demo" className="button button-primary button-large">Probar el demo <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-width footer-grid">
          <div className="brand"><span className="brand-mark" aria-hidden="true">S//</span><span>SYNAPSE AI</span></div>
          <p>B2B SaaS · AI productivity · Portfolio concept</p>
          <p>UX/UI + Frontend by Sara Duque</p>
        </div>
      </footer>
    </main>
  );
}
