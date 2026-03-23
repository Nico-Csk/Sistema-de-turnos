import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Scissors } from 'lucide-react'
import BookingWizard from '@/components/booking/BookingWizard'

export const metadata: Metadata = {
  title: 'Reservar turno — Tu Peluquería',
  description: 'Reservá tu turno online en 4 simples pasos.',
}

export default function ReservarPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#c9a84c] transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#b87333]">
            <Scissors className="w-5 h-5 text-[#0f0f0f]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Reservar turno</h1>
            <p className="text-sm text-[#a0a0a0]">Tu Peluquería</p>
          </div>
        </div>
      </div>

      {/* Wizard */}
      <div className="max-w-2xl mx-auto">
        <BookingWizard />
      </div>
    </main>
  )
}
