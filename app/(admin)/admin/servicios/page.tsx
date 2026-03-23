'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'

interface Service {
  id: string
  name: string
  duration: number
  price: number
  active: boolean
}

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchServices = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    if (res.ok) setServices(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const openModal = (svc?: Service) => {
    if (svc) {
      setEditingId(svc.id)
      setName(svc.name)
      setDuration(svc.duration.toString())
      setPrice(svc.price.toString())
    } else {
      setEditingId(null)
      setName('')
      setDuration('')
      setPrice('')
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = { name, duration: Number(duration), price: Number(price) }
    const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      toast.success(editingId ? 'Servicio actualizado' : 'Servicio creado')
      closeModal()
      fetchServices()
    } else {
      toast.error('Error al guardar')
    }
    setSaving(false)
  }

  const toggleActive = async (id: string, currentActive: boolean) => {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !currentActive })
    })
    if (res.ok) fetchServices()
  }

  return (
    <div className="max-w-5xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Servicios</h1>
          <p className="text-[#a0a0a0]">Administrá los servicios de la peluquería</p>
        </div>
        
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] transition-all shadow-lg shadow-[#c9a84c]/20"
        >
          <Plus className="w-4 h-4" />
          Nuevo servicio
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2a2a2a] text-sm text-[#a0a0a0]">
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Duración</th>
                  <th className="px-6 py-4 font-medium">Precio</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {services.map((svc) => (
                  <tr key={svc.id} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#1f1f1f] transition-colors">
                    <td className={`px-6 py-4 font-medium ${!svc.active ? 'text-[#a0a0a0]' : 'text-white'}`}>
                      {svc.name}
                    </td>
                    <td className={`px-6 py-4 ${!svc.active ? 'text-[#3a3a3a]' : 'text-[#a0a0a0]'}`}>
                      {svc.duration} min
                    </td>
                    <td className={`px-6 py-4 ${!svc.active ? 'text-[#3a3a3a]' : 'text-[#c9a84c] font-medium'}`}>
                      {formatPrice(svc.price)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(svc.id, svc.active)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                          svc.active 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {svc.active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openModal(svc)}
                        className="p-2 text-[#a0a0a0] hover:text-[#c9a84c] hover:bg-[#1a1a1a] rounded-lg transition-colors inline-block"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#a0a0a0]">
                      No hay servicios cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-[#a0a0a0] hover:text-white transition-colors rounded-lg hover:bg-[#2a2a2a]"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? 'Editar servicio' : 'Nuevo servicio'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="Ej: Corte Clásico"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Duración (min)</label>
                  <input
                    type="number"
                    required
                    min="5"
                    step="5"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="Ej: 30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Precio ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="Ej: 5000"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
