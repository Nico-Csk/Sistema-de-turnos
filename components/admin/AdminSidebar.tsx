'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, CalendarDays, Scissors, Users, LogOut } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Agenda', href: '/admin/agenda', icon: CalendarDays },
  { name: 'Servicios', href: '/admin/servicios', icon: Scissors },
  { name: 'Peluqueros', href: '/admin/peluqueros', icon: Users },
  { name: 'Días Cerrados', href: '/admin/dias-cerrados', icon: CalendarDays },
  { name: 'Configuración', href: '/admin/settings', icon: LayoutDashboard },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-[#2a2a2a] bg-[#0a0a0a] min-h-screen flex flex-col hidden md:flex">
      <div className="p-6 border-b border-[#2a2a2a]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#b87333]">
            <Scissors className="w-4 h-4 text-[#0f0f0f]" />
          </div>
          <span className="font-bold text-white text-lg">Panel Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  )
}
