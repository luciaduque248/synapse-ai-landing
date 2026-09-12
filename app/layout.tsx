import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import "./demo-enhancements.css";
import "./product-enhancements.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://synapse-ai-landing-nine.vercel.app"),
  title: "SYNAPSE AI — Meeting Intelligence",
  description:
    "Conceptual B2B meeting-intelligence product that turns meeting audio and transcripts into summaries, decisions, tasks, owners, deadlines and risks.",
  applicationName: "SYNAPSE AI",
  authors: [{ name: "Sara Duque" }],
  creator: "Sara Duque",
  keywords: [
    "meeting intelligence",
    "AI meetings",
    "audio transcription",
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
      "Portfolio concept for turning meeting audio and transcripts into summaries, decisions, tasks, owners and next steps.",
    url: "/",
    siteName: "SYNAPSE AI",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNAPSE AI — Meeting Intelligence",
    description:
      "B2B meeting-intelligence portfolio concept with audio transcription and meeting-to-execution workflows.",
  },
};

const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('synapse-theme');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
