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
        <Providers>
          <Navbar />
          <main className="flex-grow">
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
