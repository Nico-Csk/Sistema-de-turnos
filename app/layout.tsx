import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#c9a84c',
}

export const metadata: Metadata = {
  title: 'Tu Peluquería — Reservá tu turno online',
  description: 'Reservá tu turno en línea de forma rápida y sencilla. Elegí tu servicio, peluquero y horario favorito.',
  keywords: ['peluquería', 'turno', 'reserva', 'corte de cabello', 'barba'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tu Peluquería',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn("font-sans", inter.variable)}>
      <body>
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              color: '#f5f5f5',
            },
          }}
        />
      </body>
    </html>
  )
}
