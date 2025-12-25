'use client'

import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { usePathname } from 'next/navigation'
import { getAdminMetaByUrl } from '@/lib/navigations'
import { Session } from 'next-auth'

type AdminLayoutWrapperProps = {
  children: React.ReactNode
  session: Session
}

const AdminLayoutWrapper = ({ children, session }: AdminLayoutWrapperProps) => {
  const pathname = usePathname()
  const { title, subtitle } = getAdminMetaByUrl(pathname, session)

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-zinc-300 antialiased font-sans overflow-hidden">
      <AdminSidebar session={session} pathname={pathname} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-black/20 relative rounded-l-[3rem] px-8 md:px-12">
        <AdminHeader title={title} subtitle={subtitle} />
        {children}
      </main>
    </div>
  )
}

export default AdminLayoutWrapper
