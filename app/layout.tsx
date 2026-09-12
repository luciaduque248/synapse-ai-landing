import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://synapse-ai-landing-nine.vercel.app"),
  title: "SYNAPSE AI — Meeting Intelligence",
  description:
    "Conceptual B2B meeting-intelligence product that turns meeting context into summaries, decisions, tasks, owners, deadlines and risks.",
  applicationName: "SYNAPSE AI",
  authors: [{ name: "Sara Duque" }],
  creator: "Sara Duque",
  keywords: [
    "meeting intelligence",
    "AI meetings",
    "meeting summary",
    "decision tracking",
    "task extraction",
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
    title: "SYNAPSE AI — Meeting Intelligence",
    description:
      "Portfolio concept for turning meetings into summaries, decisions, tasks, owners and next steps.",
    url: "/",
    siteName: "SYNAPSE AI",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNAPSE AI — Meeting Intelligence",
    description:
      "B2B meeting-intelligence portfolio concept focused on meeting-to-execution workflows.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
