import type { Metadata } from 'next'
import Link from 'next/link'
import { Scissors, Clock, Star, ChevronRight, Sparkles, MapPin, Phone, Instagram, Search } from 'lucide-react'
import prisma from '@/lib/db'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tu Peluquería — Inicio',
  description: 'Peluquería profesional. Reservá tu turno online en segundos.',
}

export default async function HomePage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { price: 'asc' },
  })
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[70vh] sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(184,115,51,0.06)_0%,_transparent_60%)]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto animate-[fadeIn_0.8s_ease-out]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#c9a84c] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Reservá tu turno en segundos
          </div>

          {/* Scissors icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#b87333] shadow-lg shadow-[#c9a84c]/20">
              <Scissors className="w-10 h-10 text-[#0f0f0f]" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="text-white">Tu</span>{' '}
            <span className="text-gradient-gold">Peluquería</span>
          </h1>

          <p className="text-[#a0a0a0] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Elegí tu servicio, tu peluquero y el horario que más te convenga. Sin llamados, sin esperas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] shadow-lg shadow-[#c9a84c]/30 transition-all duration-300 hover:scale-105 hover:shadow-[#c9a84c]/40"
            >
              <Scissors className="w-5 h-5" />
              Reservar ahora
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/mis-turnos"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-[#a0a0a0] border border-[#2a2a2a] hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              Consultar mi turno
            </Link>
          </div>
        </div>

        {/* Scroll hint — desktop only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[#606060] animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#c9a84c]/30" />
        </div>
      </section>

      {/* Services preview */}
      {services.length > 0 && (
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Nuestros servicios</h2>
          <p className="text-[#a0a0a0]">Precios y tiempos estimados</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 flex items-center justify-between hover:border-[#c9a84c]/40 hover:bg-[#1f1f1f] transition-all duration-200"
            >
              <div>
                <p className="font-semibold text-white group-hover:text-[#c9a84c] transition-colors">
                  {svc.name}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <p className="text-sm text-[#a0a0a0] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {svc.duration} min
                  </p>
                </div>
              </div>
              <span className="text-[#c9a84c] font-bold text-lg">{formatPrice(svc.price)}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reservar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 font-medium transition-all duration-200"
          >
            Reservar turno
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      )}

      {/* Trust signals */}
      <section className="px-4 py-16 border-t border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Clock className="w-6 h-6" />, title: 'Rápido', desc: 'Reservá en menos de 2 minutos' },
            { icon: <Scissors className="w-6 h-6" />, title: 'Profesional', desc: 'Equipo con años de experiencia' },
            { icon: <Star className="w-6 h-6" />, title: 'Flexible', desc: 'Elegí el peluquero que preferís' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c]">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-[#a0a0a0]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#b87333]">
                  <Scissors className="w-4 h-4 text-[#0f0f0f]" />
                </div>
                <span className="font-bold text-white">Tu Peluquería</span>
              </div>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                Peluquería profesional con reserva online. Sin esperas, sin complicaciones.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Contacto</h3>
              <div className="space-y-2 text-sm text-[#a0a0a0]">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a84c]" />
                  Av. Ejemplo 1234, CABA
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c9a84c]" />
                  +54 11 1234-5678
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#c9a84c]" />
                  @tupeluqueria
                </p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Enlaces</h3>
              <div className="space-y-2 text-sm">
                <Link href="/reservar" className="block text-[#a0a0a0] hover:text-[#c9a84c] transition-colors">
                  Reservar turno
                </Link>
                <Link href="/mis-turnos" className="block text-[#a0a0a0] hover:text-[#c9a84c] transition-colors">
                  Consultar mi turno
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-6 text-center text-[#606060] text-sm">
            <p>&copy; {new Date().getFullYear()} Tu Peluquería — Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button — mobile */}
      <Link
        href="/reservar"
        className="fixed bottom-6 right-6 z-40 sm:hidden flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] shadow-xl shadow-[#c9a84c]/30 hover:shadow-[#c9a84c]/50 transition-all active:scale-95"
      >
        <Scissors className="w-5 h-5" />
        Reservar
      </Link>
    </main>
  )
}
