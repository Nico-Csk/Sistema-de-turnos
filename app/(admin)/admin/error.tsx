'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-[#c9a84c] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Error en el panel</h2>
        <p className="text-[#a0a0a0] mb-4 text-sm">
          Ocurrió un error inesperado. Por favor intentá de nuevo.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-[#c9a84c] hover:bg-[#b8973d] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    </div>
  )
}
