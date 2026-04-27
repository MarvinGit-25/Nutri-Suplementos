import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Providers } from "@/components/Providers";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://nutri-suplementos.vercel.app"),
  title: "Xnutri",
  description: "Encontre as melhores marcas de Whey Protein, Creatina e Pré-treinos com o melhor preço e entrega rápida em todo o Brasil.",
  keywords: ["suplementos", "whey protein", "creatina", "pré-treino", "academia", "nutrição esportiva"],
  authors: [{ name: "Xnutri Team" }],
  openGraph: {
    title: "Xnutri",
    description: "As melhores marcas de suplementos com o melhor preço do Brasil.",
    url: "https://xnutri.com.br",
    siteName: "Xnutri",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xnutri",
    description: "As melhores marcas de suplementos com o melhor preço do Brasil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${montserrat.className} min-h-screen flex flex-col bg-dark-900 text-white`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-500 text-white px-4 py-2 z-50 rounded-lg font-bold outline-none ring-2 ring-white">
          Pular para o conteúdo principal
        </a>
        <Providers>
          <Navbar />
          <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  );
}
