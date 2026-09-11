import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNAPSE AI — Portfolio Landing Page",
  description: "Product-led SaaS landing page for a fictional AI productivity tool. The case study emphasizes interactive frontend execution, product storytelling, purposeful motion, free-trial conversion, accessibility, SEO and performance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
