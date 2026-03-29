'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Save, Loader2, Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        toast.success('Configuración actualizada')
      } else {
        toast.error('Error al guardar')
      }
    } catch (error) {
      toast.error('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-[#c9a84c]" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
          <p className="text-[#a0a0a0]">Gestioná los detalles generales de tu salón</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#0f0f0f] rounded-xl font-bold hover:bg-[#b8973d] transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-5 h-5 text-[#c9a84c]" />
            <h2 className="text-xl font-bold text-white">General</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Nombre del Salón</label>
              <input
                type="text"
                value={settings.salonName}
                onChange={(e) => setSettings({ ...settings, salonName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Buffer entre turnos (minutos)</label>
              <input
                type="number"
                value={settings.bufferMinutes}
                onChange={(e) => setSettings({ ...settings, bufferMinutes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                placeholder="10"
              />
              <p className="mt-2 text-xs text-[#606060]">
                Tiempo de descanso/limpieza que se añade después de cada turno.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Horario Semanal por Defecto</h2>
          <div className="space-y-3">
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
              <div key={day} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a]">
                <span className="text-sm font-medium text-white uppercase w-10">{day}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={settings.defaultSchedule[day]?.start || ''}
                    disabled={!settings.defaultSchedule[day]}
                    onChange={(e) => {
                      const newSched = { ...settings.defaultSchedule }
                      newSched[day].start = e.target.value
                      setSettings({ ...settings, defaultSchedule: newSched })
                    }}
                    className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-white disabled:opacity-30"
                  />
                  <span className="text-[#606060]">-</span>
                  <input
                    type="time"
                    value={settings.defaultSchedule[day]?.end || ''}
                    disabled={!settings.defaultSchedule[day]}
                    onChange={(e) => {
                      const newSched = { ...settings.defaultSchedule }
                      newSched[day].end = e.target.value
                      setSettings({ ...settings, defaultSchedule: newSched })
                    }}
                    className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-white disabled:opacity-30"
                  />
                  <button
                    onClick={() => {
                      const newSched = { ...settings.defaultSchedule }
                      if (newSched[day]) {
                        newSched[day] = null
                      } else {
                        newSched[day] = { start: '09:00', end: '19:00' }
                      }
                      setSettings({ ...settings, defaultSchedule: newSched })
                    }}
                    className={`ml-2 text-[10px] px-2 py-1 rounded-full border ${
                      settings.defaultSchedule[day] 
                        ? 'border-green-500/20 text-green-500 bg-green-500/5' 
                        : 'border-red-500/20 text-red-400 bg-red-500/5'
                    }`}
                  >
                    {settings.defaultSchedule[day] ? 'Abierto' : 'Cerrado'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
