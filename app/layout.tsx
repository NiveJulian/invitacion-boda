import type { Metadata } from 'next'
import { Cormorant_Garamond, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: 'Nuestra Boda | Seba & Orne',
  description: 'Acompañanos a celebrar nuestro amor y el comienzo de una nueva etapa juntos. ¡Te esperamos el 18 de Diciembre de 2026!',
  keywords: ['boda', 'invitación', 'casamiento', 'Seba y Orne'],
  openGraph: {
    title: 'Seba & Orne | Nuestra Boda',
    description: 'Acompañanos a celebrar nuestro amor. ¡Te esperamos!',
    url: 'https://invitacion-boda-seba-orne.vercel.app', // Debería ser la URL real
    siteName: 'Boda Seba & Orne',
    images: [
      {
        url: 'https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/3-%20syo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Seba & Orne - Nuestra Boda',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seba & Orne | Nuestra Boda',
    description: 'Acompañanos a celebrar nuestro amor.',
    images: ['https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/3-%20syo.jpeg'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { Toaster } from "sonner"
import { Preloader } from "@/components/preloader"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${cormorant.variable} ${playfair.variable} font-serif antialiased`}>
        <Preloader />
        {children}
        <Toaster position="bottom-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
