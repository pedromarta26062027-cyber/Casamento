import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marta & Pedro · 26 de junho de 2027",
  description: "Vamos casar! Celebra connosco na Herdade da Emberiza. Programa, como chegar e confirmação de presença até 30 de abril de 2027.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className="antialiased">{children}</body>
    </html>
  );
}
