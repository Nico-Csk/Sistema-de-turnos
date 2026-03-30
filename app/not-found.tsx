import Link from 'next/link'
import { Scissors, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#1a1a1a] border border-[#2a2a2a]">
            <Scissors className="w-10 h-10 text-[#c9a84c]" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-[#c9a84c] mb-2">404</h1>
        <h2 className="text-xl font-bold text-white mb-2">Página no encontrada</h2>
        <p className="text-[#a0a0a0] mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] transition-all shadow-lg shadow-[#c9a84c]/20"
        >
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
