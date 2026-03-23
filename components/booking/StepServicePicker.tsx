'use client'

import { useEffect, useState } from 'react'
import { Clock, DollarSign, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export interface Service {
  id: string
  name: string
  duration: number
  price: number
}

interface Props {
  selected: Service | null
  onSelect: (s: Service) => void
}

export default function StepServicePicker({ selected, onSelect }: Props) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => { setServices(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Elegí un servicio</h2>
      <p className="text-[#a0a0a0] text-sm mb-6">Seleccioná el servicio que querés reservar</p>

      <div className="grid gap-3">
        {services.map((svc) => {
          const isSelected = selected?.id === svc.id
          return (
            <button
              key={svc.id}
              onClick={() => onSelect(svc)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left group ${
                isSelected
                  ? 'border-[#c9a84c] bg-[#c9a84c]/10 shadow-lg shadow-[#c9a84c]/10'
                  : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#c9a84c]/40 hover:bg-[#1f1f1f]'
              }`}
            >
              <div>
                <p className={`font-semibold text-base ${isSelected ? 'text-[#c9a84c]' : 'text-white group-hover:text-[#c9a84c]'} transition-colors`}>
                  {svc.name}
                </p>
                <p className="flex items-center gap-1.5 mt-1 text-sm text-[#a0a0a0]">
                  <Clock className="w-3.5 h-3.5" />
                  {svc.duration} min
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-lg font-bold ${isSelected ? 'text-[#c9a84c]' : 'text-[#c9a84c]'}`}>
                  {formatPrice(svc.price)}
                </span>
                <div className={`w-4 h-4 rounded-full border-2 transition-all ${isSelected ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#3a3a3a]'}`} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
