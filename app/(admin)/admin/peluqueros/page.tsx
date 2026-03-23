'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Loader2, X, User } from 'lucide-react'
import { toast } from 'sonner'

interface Stylist {
  id: string
  name: string
  photoUrl: string | null
  active: boolean
}

export default function PeluquerosPage() {
  const [stylists, setStylists] = useState<Stylist[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchStylists = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/stylists')
    if (res.ok) setStylists(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    fetchStylists()
  }, [])

  const openModal = (sty?: Stylist) => {
    if (sty) {
      setEditingId(sty.id)
      setName(sty.name)
      setPhotoUrl(sty.photoUrl || '')
    } else {
      setEditingId(null)
      setName('')
      setPhotoUrl('')
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = { name, photoUrl }
    const url = editingId ? `/api/admin/stylists/${editingId}` : '/api/admin/stylists'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      toast.success(editingId ? 'Peluquero actualizado' : 'Peluquero creado')
      closeModal()
      fetchStylists()
    } else {
      toast.error('Error al guardar')
    }
    setSaving(false)
  }

  const toggleActive = async (id: string, currentActive: boolean) => {
    const res = await fetch(`/api/admin/stylists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !currentActive })
    })
    if (res.ok) fetchStylists()
  }

  return (
    <div className="max-w-5xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Peluqueros</h1>
          <p className="text-[#a0a0a0]">Administrá tu equipo de profesionales</p>
        </div>
        
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] transition-all shadow-lg shadow-[#c9a84c]/20"
        >
          <Plus className="w-4 h-4" />
          Nuevo peluquero
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
                  <th className="px-6 py-4 font-medium w-16">Foto</th>
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stylists.map((sty) => (
                  <tr key={sty.id} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#1f1f1f] transition-colors">
                    <td className="px-6 py-4">
                      {sty.photoUrl ? (
                        <img src={sty.photoUrl} alt={sty.name} className="w-10 h-10 rounded-xl object-cover border border-[#2a2a2a]" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#a0a0a0]">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className={`px-6 py-4 font-medium ${!sty.active ? 'text-[#a0a0a0]' : 'text-white'}`}>
                      {sty.name}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(sty.id, sty.active)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                          sty.active 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {sty.active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openModal(sty)}
                        className="p-2 text-[#a0a0a0] hover:text-[#c9a84c] hover:bg-[#1a1a1a] rounded-lg transition-colors inline-block"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {stylists.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-[#a0a0a0]">
                      No hay peluqueros cargados.
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
              {editingId ? 'Editar peluquero' : 'Nuevo peluquero'}
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
                  placeholder="Ej: Marcos Silva"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">Foto URL (opcional)</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="Ej: https://ejemplo.com/foto.jpg"
                />
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
