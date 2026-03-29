'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, CalendarDays, Scissors, Users, LogOut, Menu, X, Settings, CalendarOff } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Agenda', href: '/admin/agenda', icon: CalendarDays },
  { name: 'Servicios', href: '/admin/servicios', icon: Scissors },
  { name: 'Peluqueros', href: '/admin/peluqueros', icon: Users },
  { name: 'Días Cerrados', href: '/admin/dias-cerrados', icon: CalendarOff },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#b87333]">
            <Scissors className="w-4 h-4 text-[#0f0f0f]" />
          </div>
          <span className="font-bold text-white text-lg">Panel Admin</span>
        </Link>
        <button onClick={() => setOpen(false)} className="md:hidden text-[#a0a0a0] hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#c9a84c]/10 text-[#c9a84c]'
                  : 'text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-[#c9a84c]' : 'text-[#a0a0a0]'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#2a2a2a]">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a] px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#b87333]">
            <Scissors className="w-3.5 h-3.5 text-[#0f0f0f]" />
          </div>
          <span className="font-bold text-white text-sm">Admin</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="text-[#a0a0a0] hover:text-white p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-50 w-72 bg-[#0a0a0a] min-h-screen flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r border-[#2a2a2a] bg-[#0a0a0a] min-h-screen flex-col">
        <NavContent />
      </aside>
    </>
  )
}
