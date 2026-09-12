import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://synapse-ai-landing-nine.vercel.app"),
  title: "SYNAPSE AI — AI Productivity SaaS Concept",
  description:
    "Landing page conceptual para un SaaS B2B de productividad con IA, enfocada en UX/UI, frontend responsive, product storytelling y conversión a trial.",
  applicationName: "SYNAPSE AI",
  authors: [{ name: "Sara Duque" }],
  creator: "Sara Duque",
  keywords: [
    "SaaS landing page",
    "AI productivity",
    "B2B SaaS",
    "UX/UI",
    "frontend",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SYNAPSE AI — AI Productivity SaaS Concept",
    description:
      "Concepto product-led para convertir conversaciones, decisiones y follow-ups en trabajo accionable.",
    url: "/",
    siteName: "SYNAPSE AI",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNAPSE AI — AI Productivity SaaS Concept",
    description:
      "Caso de portafolio B2B SaaS enfocado en UX/UI, frontend e interacción product-led.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
