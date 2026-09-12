import { SynapseDemo } from "@/components/synapse-demo";

const workflow = [
  { n: "01", label: "CAPTURE", title: "Reunión, nota o hilo", copy: "El contexto entra como señal, no como una pila de pantallas por revisar." },
  { n: "02", label: "DISTILL", title: "Decisión explícita", copy: "SYNAPSE separa lo que se habló de lo que realmente quedó decidido." },
  { n: "03", label: "ROUTE", title: "Owner + siguiente paso", copy: "Cada acción conserva responsable, timing y vínculo con su contexto original." },
  { n: "04", label: "MOVE", title: "Trabajo visible", copy: "El equipo retoma el avance sin reconstruir la reunión desde cero." },
];

const useCases = [
  ["PRODUCT", "Roadmap, discovery y handoffs", "Decisiones de producto que siguen conectadas a sus responsables y próximos pasos."],
  ["SALES", "Handoffs y compromisos", "Requisitos, promesas y follow-ups después de cada conversación comercial."],
  ["OPS", "Bloqueos y acuerdos", "Un registro operativo más claro para equipos que trabajan entre múltiples canales."],
];

const faqItems = [
  ["¿SYNAPSE AI es un producto real?", "No. Es un concepto ficticio de portafolio creado para demostrar UX/UI, frontend y estrategia de conversión para un SaaS B2B de productividad con IA."],
  ["¿El demo procesa las notas con IA?", "No. La demostración es local y utiliza ejemplos predefinidos. No envía texto a un modelo ni almacena información."],
  ["¿Las integraciones y requisitos de seguridad ya existen?", "No. Se presentan como arquitectura conceptual de producto, no como capacidades verificadas o certificaciones reales."],
  ["¿Por qué no aparecen clientes, métricas o testimonios?", "Porque el proyecto no tiene clientes reales ni datos de negocio. El caso evita inventar prueba social, benchmarks o resultados."],
];

export default function Home() {
  return (
    <main className="synapse-site">
      <header className="topbar">
        <a href="#top" className="wordmark" aria-label="SYNAPSE AI, inicio">
          <span className="wordmark-glyph">S/</span>
          <span>SYNAPSE</span>
        </a>
        <nav className="topbar-nav" aria-label="Navegación principal">
          <a href="#system">Sistema</a>
          <a href="#demo">Demo</a>
          <a href="#use-cases">Casos</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="topbar-cta" href="#demo">RUN DEMO ↗</a>
      </header>

      <section id="top" className="hero-redesign">
        <div className="hero-ticker" aria-hidden="true">
          <span>CONTEXT → DECISION → ACTION → CONTEXT → DECISION → ACTION →</span>
        </div>

        <div className="hero-frame">
          <div className="hero-overline">AI WORKFLOW SYSTEM / PORTFOLIO CONCEPT / 2026</div>
          <h1>
            Convierte el ruido de una reunión
            <span>en un sistema de ejecución.</span>
          </h1>
          <div className="hero-bottom-row">
            <p>
              SYNAPSE organiza contexto, decisiones y próximos pasos en una capa de trabajo pensada para equipos que necesitan avanzar sin perseguir información.
            </p>
            <div className="hero-actions-redesign">
              <a href="#demo" className="solid-action">PROBAR DEMO <span>↗</span></a>
              <a href="#system" className="text-action">VER SISTEMA ↓</a>
            </div>
          </div>
        </div>

        <div className="signal-board" aria-label="Vista conceptual del flujo SYNAPSE">
          <div className="signal-board-head">
            <span>LIVE ROUTE / SAMPLE WORKFLOW</span>
            <span>NO DATA SENT</span>
          </div>
          <div className="signal-route">
            <article className="signal-node signal-node--blue">
              <span className="node-index">01 / INPUT</span>
              <strong>Meeting notes</strong>
              <p>“Ship Friday. Analytics before QA. Sara owns hero copy.”</p>
            </article>
            <div className="route-arrow" aria-hidden="true">→</div>
            <article className="signal-node signal-node--acid">
              <span className="node-index">02 / DECISION</span>
              <strong>Release stays Friday</strong>
              <p>Conditioned on analytics + mobile QA.</p>
            </article>
            <div className="route-arrow" aria-hidden="true">→</div>
            <article className="signal-node signal-node--paper">
              <span className="node-index">03 / ACTIONS</span>
              <div className="mini-task"><b>Sara</b><span>Hero copy</span><em>TODAY</em></div>
              <div className="mini-task"><b>Diego</b><span>Analytics</span><em>THU</em></div>
              <div className="mini-task"><b>QA</b><span>Mobile nav</span><em>NEXT</em></div>
            </article>
          </div>
        </div>
      </section>

      <section id="system" className="system-section">
        <div className="section-label">02 / SYSTEM</div>
        <div className="system-heading">
          <h2>No más cajas bonitas.<br />Un flujo que se entiende.</h2>
          <p>La interfaz se organiza como una ruta operativa: cada bloque explica qué entra, qué cambia y qué debe ocurrir después.</p>
        </div>
        <div className="workflow-rail">
          {workflow.map((item) => (
            <article key={item.n} className="workflow-row">
              <span className="workflow-number">{item.n}</span>
              <span className="workflow-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <span className="workflow-arrow" aria-hidden="true">↘</span>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="lab-section">
        <div className="lab-banner">
          <span>03 / INTERACTIVE LAB</span>
          <strong>NOTES IN. ACTIONS OUT.</strong>
          <span>LOCAL SIMULATION</span>
        </div>
        <div className="lab-intro">
          <h2>Prueba el concepto.</h2>
          <p>Cambia entre ejemplos, edita el texto y observa cómo una conversación se convierte en una estructura operativa predefinida. Sin IA real, sin almacenamiento.</p>
        </div>
        <SynapseDemo />
      </section>

      <section className="manifesto-section">
        <div className="manifesto-stamp">SYNAPSE / PRINCIPLE 01</div>
        <p className="manifesto-copy">El producto no intenta reemplazar cada herramienta. Intenta que una decisión no desaparezca entre todas ellas.</p>
      </section>

      <section id="use-cases" className="use-cases-redesign">
        <div className="use-case-title">
          <span>04 / WHERE IT FITS</span>
          <h2>Tres equipos.<br />Una misma fricción.</h2>
        </div>
        <div className="use-case-table">
          {useCases.map(([label, title, copy], index) => (
            <article key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-section">
        <div className="architecture-head">
          <span>05 / CONNECTION MODEL</span>
          <h2>Una capa de contexto entre herramientas.</h2>
        </div>
        <div className="architecture-map" aria-label="Mapa conceptual de conexiones">
          <div className="architecture-source architecture-source--a">CHAT</div>
          <div className="architecture-source architecture-source--b">DOCS</div>
          <div className="architecture-source architecture-source--c">EMAIL</div>
          <div className="architecture-core">S/</div>
          <div className="architecture-output architecture-output--a">DECISIONS</div>
          <div className="architecture-output architecture-output--b">ACTIONS</div>
          <div className="architecture-output architecture-output--c">OWNERS</div>
          <div className="architecture-line architecture-line--1" />
          <div className="architecture-line architecture-line--2" />
          <div className="architecture-line architecture-line--3" />
        </div>
        <p className="architecture-note">Categorías conceptuales. No representan integraciones comerciales activas.</p>
      </section>

      <section className="trust-section-redesign">
        <div className="trust-head">
          <span>06 / TRUST</span>
          <h2>Diseñar credibilidad sin inventarla.</h2>
        </div>
        <div className="trust-grid-redesign">
          <article><span>REQUIREMENT / 01</span><h3>Role-based access</h3><p>Definido como requisito futuro, no como feature productiva verificada.</p></article>
          <article><span>REQUIREMENT / 02</span><h3>Audit trail</h3><p>Planteado como necesidad de diseño, no como evidencia de cumplimiento.</p></article>
          <article><span>REQUIREMENT / 03</span><h3>Data controls</h3><p>Retención, exportación y administración aparecen como preguntas que una versión real tendría que resolver.</p></article>
        </div>
      </section>

      <section id="faq" className="faq-redesign">
        <div className="faq-side">
          <span>07 / FAQ</span>
          <h2>Lo que este concepto sí es. Y lo que no.</h2>
        </div>
        <div className="faq-list-redesign">
          {faqItems.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><b aria-hidden="true">+</b></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-index">08 / NEXT MOVE</div>
        <h2>La próxima reunión debería terminar con claridad, no con otra búsqueda.</h2>
        <a href="#demo" className="closing-cta">RUN SYNAPSE DEMO <span>↗</span></a>
        <p>CTA demostrativo. No crea una cuenta ni inicia una suscripción real.</p>
      </section>

      <footer className="footer-redesign">
        <div className="wordmark"><span className="wordmark-glyph">S/</span><span>SYNAPSE</span></div>
        <p>B2B SaaS · AI productivity · Portfolio concept</p>
        <p>UX/UI + Frontend by Sara Duque</p>
      </footer>
    </main>
  );
}
