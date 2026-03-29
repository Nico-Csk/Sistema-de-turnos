import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-4 pt-16 md:p-8 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
