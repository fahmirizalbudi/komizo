'use client'

import React, { useMemo } from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { usePathname } from 'next/navigation'
import { getAdminNavigations } from '@/lib/navigations'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

type AdminLayoutWrapperProps = {
  children: React.ReactNode
}

const AdminLayoutWrapper = ({ children }: AdminLayoutWrapperProps) => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const navigations = getAdminNavigations()
  const name = session?.user?.name ?? '~'

  const { title, subtitle } = useMemo(() => {
    const nav = navigations.find((n) => {
      const pattern = '^' + n.url.replace(/\*/g, '[^/]+') + '$'
      const regex = new RegExp(pattern)
      return regex.test(pathname)
    })

    return {
      title: nav?.label ?? '',
      subtitle: nav?.url === '/admin' ? `Hello ${name}, welcome to the overview section.` : nav?.description ?? '',
    }
  }, [pathname, name])

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-zinc-300 antialiased font-sans overflow-hidden">
      <AdminSidebar pathname={pathname} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-black/20 relative rounded-l-[3rem] px-8 md:px-12">
        <AdminHeader title={title} subtitle={subtitle} />
        {children}
      </main>
    </div>
  )
}

export default AdminLayoutWrapper
