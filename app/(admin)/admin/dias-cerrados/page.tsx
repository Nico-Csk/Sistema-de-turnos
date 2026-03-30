'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Calendar, Trash2, Plus, Loader2, CalendarX } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ClosedDaysPage() {
  const [loading, setLoading] = useState(true)
  const [closedDays, setClosedDays] = useState<any[]>([])
  const [newDate, setNewDate] = useState('')
  const [newReason, setNewReason] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchClosedDays()
  }, [])

  const fetchClosedDays = () => {
    fetch('/api/admin/closed-days')
      .then(res => res.json())
      .then(data => {
        setClosedDays(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Error al cargar días cerrados')
        setLoading(false)
      })
  }

  const handleAdd = async () => {
    if (!newDate) return
    setAdding(true)
    try {
      const res = await fetch('/api/admin/closed-days', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: newDate, reason: newReason })
      })
      if (res.ok) {
        toast.success('Día bloqueado exitosamente')
        setNewDate('')
        setNewReason('')
        fetchClosedDays()
      } else {
        toast.error('Error al guardar')
      }
    } catch (error) {
      toast.error('Error de conexión')
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/closed-days?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Día desbloqueado')
        fetchClosedDays()
      }
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-[#c9a84c]" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Días Cerrados</h1>
        <p className="text-[#a0a0a0]">Bloqueá fechas específicas para cerrar el salón (feriados, capacitaciones, etc.)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-6 sticky top-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#c9a84c]" />
              Bloquear Día
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Fecha</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Motivo (opcional)</label>
                <input
                  type="text"
                  placeholder="Ej: Feriado Nacional"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>
              <button
                onClick={handleAdd}
                disabled={adding || !newDate}
                className="w-full py-3 bg-[#c9a84c] text-[#0f0f0f] rounded-xl font-bold hover:bg-[#b8973d] transition-all disabled:opacity-50"
              >
                {adding ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Confirmar Bloqueo'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Próximos Días Cerrados</h2>
          {closedDays.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-12 text-center">
              <CalendarX className="w-12 h-12 text-[#3a3a3a] mx-auto mb-4" />
              <p className="text-[#a0a0a0]">No hay días bloqueados próximamente.</p>
            </div>
          ) : (
            closedDays.map((day) => (
              <div key={day.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 flex items-center justify-between group hover:border-[#c9a84c]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white uppercase tracking-wider">
                      {format(new Date(day.date), "EEEE d 'de' MMMM", { locale: es })}
                    </h3>
                    {day.reason && <p className="text-sm text-[#a0a0a0]">{day.reason}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(day.id)}
                  className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Eliminar bloqueo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
