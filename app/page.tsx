export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-between rounded-[2rem] border border-black/10 bg-[var(--surface)] p-7 md:p-12">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span>SYNAPSE AI</span>
          <span className="text-[var(--muted)]">Portfolio case study · scaffold</span>
        </div>
        <div className="max-w-4xl py-20">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[var(--accent)]">B2B SaaS / AI productivity</p>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">Convierte conversaciones en trabajo terminado.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">Base técnica lista. La dirección visual final, assets y contenido se construirán como un caso de estudio de conversión independiente.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-black/10 px-4 py-2">Next.js</span>
          <span className="rounded-full border border-black/10 px-4 py-2">TypeScript</span>
          <span className="rounded-full border border-black/10 px-4 py-2">Tailwind CSS</span>
          <span className="rounded-full border border-black/10 px-4 py-2">Motion</span>
          <span className="rounded-full border border-black/10 px-4 py-2">Codex Skills</span>
        </div>
      </section>
    </main>
  );
}
