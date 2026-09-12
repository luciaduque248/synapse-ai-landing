import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://synapse-ai-landing-nine.vercel.app"),
  title: "SYNAPSE AI — Turn conversations into execution",
  description:
    "Conceptual B2B AI productivity landing page that transforms meetings, notes, chats and emails into decisions, tasks, owners, deadlines and next steps.",
  applicationName: "SYNAPSE AI",
  authors: [{ name: "Sara Duque" }],
  creator: "Sara Duque",
  keywords: [
    "AI productivity",
    "meeting intelligence",
    "B2B SaaS",
    "decision tracking",
    "task extraction",
    "UX/UI",
    "frontend",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SYNAPSE AI — Turn conversations into execution",
    description:
      "Concept product for turning team context into decisions, tasks, owners, risks and next steps.",
    url: "/",
    siteName: "SYNAPSE AI",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNAPSE AI — Turn conversations into execution",
    description:
      "B2B AI productivity portfolio concept focused on context, decisions and execution.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
