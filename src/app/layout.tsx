import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Айболит — детская медицинская служба в Томске",
  description: "Детские врачи, педиатр на дом и забота о здоровье детей в Томске.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
