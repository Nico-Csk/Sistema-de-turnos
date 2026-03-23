import prisma from '@/lib/db'
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns'
import { es } from 'date-fns/locale'
import { formatPrice } from '@/lib/utils'
import { Calendar, DollarSign, Users, Scissors } from 'lucide-react'

export default async function AdminDashboardPage() {
  const now = new Date()
  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)
  const weekStart = startOfWeek(now, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 })

  // Data fetching in parallel
  const [
    todayAppointments,
    weekAppointmentsCount,
    servicesCount,
    nextAppointment,
  ] = await Promise.all([
    prisma.appointment.findMany({
      where: { date: { gte: todayStart, lte: todayEnd }, status: { in: ['confirmed', 'completed'] } },
      include: { service: true, stylist: true },
      orderBy: { date: 'asc' },
    }),
    prisma.appointment.count({
      where: { date: { gte: weekStart, lte: weekEnd }, status: { in: ['confirmed', 'completed'] } },
    }),
    prisma.service.count({ where: { active: true } }),
    prisma.appointment.findFirst({
      where: { date: { gte: now }, status: 'confirmed' },
      include: { service: true, stylist: true },
      orderBy: { date: 'asc' },
    }),
  ])

  const todayIncome = todayAppointments.reduce(
    (sum, appt) => sum + (appt.service?.price || 0),
    0
  )
  const todayCount = todayAppointments.length

  return (
    <div className="max-w-6xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#a0a0a0] capitalize">{format(now, "EEEE d 'de' MMMM", { locale: es })}</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Ingresos de hoy', value: formatPrice(todayIncome), icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Turnos hoy', value: todayCount.toString(), icon: Calendar, color: 'text-[#c9a84c]', bg: 'bg-[#c9a84c]/10' },
          { label: 'Turnos esta semana', value: weekAppointmentsCount.toString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Servicios activos', value: servicesCount.toString(), icon: Scissors, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#a0a0a0]">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next up */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-white mb-4">Próximo turno</h2>
          {nextAppointment ? (
            <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#b87333]/10 border border-[#c9a84c]/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calendar className="w-24 h-24 text-[#c9a84c]" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-[#c9a84c] text-[#0f0f0f] text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                  En breve
                </span>
                <p className="text-3xl font-bold text-white mb-1">{format(nextAppointment.date, 'HH:mm')}</p>
                <p className="text-lg font-semibold text-[#c9a84c] mb-4">{nextAppointment.clientName}</p>
                
                <div className="space-y-2 text-sm text-[#a0a0a0]">
                  <p className="flex justify-between">
                    <span>Servicio:</span>
                    <span className="text-white font-medium">{nextAppointment.service?.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Peluquero:</span>
                    <span className="text-white font-medium">{nextAppointment.stylist?.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Tel:</span>
                    <span className="text-white font-medium">{nextAppointment.clientPhone}</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 text-center text-[#a0a0a0]">
              No hay turnos próximos agendados.
            </div>
          )}
        </div>

        {/* Today's Timeline */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4">Agenda de hoy</h2>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
            {todayAppointments.length === 0 ? (
              <p className="text-center text-[#a0a0a0] py-8">No hay turnos para hoy.</p>
            ) : (
              <div className="space-y-4">
                {todayAppointments.map((appt) => (
                  <div key={appt.id} className="flex gap-4 p-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] items-center">
                    <div className="flex flex-col items-center justify-center w-16 text-[#c9a84c] border-r border-[#2a2a2a] pr-4">
                      <span className="text-lg font-bold">{format(appt.date, 'HH:mm')}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{appt.clientName}</p>
                      <p className="text-sm text-[#a0a0a0]">{appt.service?.name} • con {appt.stylist?.name}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appt.status === 'completed' ? 'bg-green-400/10 text-green-400' : 'bg-[#c9a84c]/10 text-[#c9a84c]'
                      }`}>
                        {appt.status === 'completed' ? 'Completado' : 'Confirmado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
