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
  description: 'Estás cordialmente invitado a celebrar nuestra unión el 18 de Diciembre de 2026. ¡Te esperamos!',
  keywords: ['boda', 'invitación', 'casamiento', 'Seba y Orne'],
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
