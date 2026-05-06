import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Josefin_Sans,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ornellaysebastian.byfesta.com.ar"),
  title: "Invitación | Ornella y Sebastian",
  description:
    "Te invitamos a ser parte de este momento tan especial. ¡Nos casamos el 18 de Diciembre de 2026! Entrá para ver los detalles.",
  keywords: ["boda", "invitación", "casamiento", "Ornella y Sebastian"],
  openGraph: {
    title: "Ornella y Sebastian | Nuestra Boda",
    description:
      "Acompañanos a celebrar nuestro amor y el comienzo de una nueva etapa juntos.",
    url: "https://ornellaysebastian.byfesta.com.ar",
    siteName: "Boda Ornella y Sebastian",
    images: [
      {
        url: "/icon.jpeg",
        width: 1200,
        height: 630,
        alt: "Ornella y Sebastian - Nuestra Boda",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ornella y Sebastian | Nuestra Boda",
    description: "Acompañanos a celebrar nuestro amor.",
    images: ["/icon.jpeg"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

import { Toaster } from "sonner";
import { Preloader } from "@/components/preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+DE+SAS:wght@100..400&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .font-script {
            font-family: 'Playwrite DE SAS', cursive !important;
            font-weight: 400 !important;
            font-optical-sizing: auto;
          }
        `,
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${playfair.variable} ${josefin.variable} antialiased`}
      >
        <Preloader />
        {children}
        <Toaster position="bottom-right" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
