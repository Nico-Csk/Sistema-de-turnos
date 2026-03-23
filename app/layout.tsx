import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Tu Peluquería — Reservá tu turno online',
  description: 'Reservá tu turno en línea de forma rápida y sencilla. Elegí tu servicio, peluquero y horario favorito.',
  keywords: ['peluquería', 'turno', 'reserva', 'corte de cabello', 'barba'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
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
