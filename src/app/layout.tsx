import type { Metadata } from "next";
import { Geist_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";

const fontDisplay = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const fontBody = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reta Publicidade | Estratégia. Criatividade. Resultados.",
  description:
    "Agência de publicidade e performance digital. Nascemos para colocar sua marca na reta do crescimento — estratégia, criatividade, tecnologia e IA.",
  keywords: [
    "Reta Publicidade",
    "marketing digital",
    "publicidade",
    "tráfego pago",
    "SEO",
    "tecnologia e IA",
    "agência digital",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Reta Publicidade | Estratégia. Criatividade. Resultados.",
    description:
      "Tecnologia que guia. Resultados reais através de dados.",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512, alt: "Reta Publicidade" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontBody.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-[#f5f5f7] text-[#1d1d1f] antialiased">
        {children}
      </body>
    </html>
  );
}
