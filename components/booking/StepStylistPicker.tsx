'use client'

import { useEffect, useState } from 'react'
import { User, Users, Loader2 } from 'lucide-react'
import { type BookingState } from './BookingWizard'

export interface Stylist {
  id: string
  name: string
  photoUrl?: string | null
}

type StylistOrAny = Stylist | 'any'

interface Props {
  selected: BookingState['stylist']
  onSelect: (s: StylistOrAny) => void
}

export default function StepStylistPicker({ selected, onSelect }: Props) {
  const [stylists, setStylists] = useState<Stylist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stylists')
      .then((r) => r.json())
      .then((data) => { setStylists(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
      </div>
    )
  }

  const isSelected = (id: string | 'any') => {
    if (id === 'any') return selected === 'any'
    return typeof selected !== 'string' && selected !== null && selected.id === id
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Elegí un peluquero</h2>
      <p className="text-[#a0a0a0] text-sm mb-6">O seleccioná &quot;Sin preferencia&quot; para el primer disponible</p>

      <div className="grid gap-3">
        {/* Sin preferencia option */}
        <button
          onClick={() => onSelect('any')}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
            isSelected('any')
              ? 'border-[#c9a84c] bg-[#c9a84c]/10 shadow-lg shadow-[#c9a84c]/10'
              : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#c9a84c]/40 hover:bg-[#1f1f1f]'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected('any') ? 'bg-[#c9a84c]/20' : 'bg-[#2a2a2a]'}`}>
            <Users className={`w-5 h-5 ${isSelected('any') ? 'text-[#c9a84c]' : 'text-[#a0a0a0]'}`} />
          </div>
          <div className="flex-1 text-left">
            <p className={`font-semibold ${isSelected('any') ? 'text-[#c9a84c]' : 'text-white'}`}>
              Sin preferencia
            </p>
            <p className="text-xs text-[#a0a0a0] mt-0.5">Primer peluquero disponible</p>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 transition-all ${isSelected('any') ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#555555]'}`} />
        </button>

        {/* Individual stylists */}
        {stylists.map((sty) => (
          <button
            key={sty.id}
            onClick={() => onSelect(sty)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
              isSelected(sty.id)
                ? 'border-[#c9a84c] bg-[#c9a84c]/10 shadow-lg shadow-[#c9a84c]/10'
                : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#c9a84c]/40 hover:bg-[#1f1f1f]'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${isSelected(sty.id) ? 'bg-[#c9a84c] text-[#0f0f0f]' : 'bg-[#2a2a2a] text-[#c9a84c]'}`}>
              {sty.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-left">
              <p className={`font-semibold ${isSelected(sty.id) ? 'text-[#c9a84c]' : 'text-white'}`}>
                {sty.name}
              </p>
              <p className="text-xs text-[#a0a0a0] mt-0.5">Peluquero</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 transition-all ${isSelected(sty.id) ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#555555]'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
