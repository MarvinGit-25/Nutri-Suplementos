import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Providers } from "@/components/Providers";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriSup | Os Melhores Suplementos",
  description: "Encontre as melhores marcas de Whey Protein, Creatina e Pré-treinos com o melhor preço e entrega rápida em todo o Brasil.",
  keywords: ["suplementos", "whey protein", "creatina", "pré-treino", "academia", "nutrição esportiva"],
  authors: [{ name: "NutriSup Team" }],
  openGraph: {
    title: "NutriSup | Os Melhores Suplementos",
    description: "As melhores marcas de suplementos com o melhor preço do Brasil.",
    url: "https://nutrisup.com.br",
    siteName: "NutriSup",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriSup | Os Melhores Suplementos",
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
      <body className={`${inter.className} min-h-screen flex flex-col bg-dark-900 text-white`}>
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
