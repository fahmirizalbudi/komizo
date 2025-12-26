import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import AdminLayoutWrapper from '@/components/layout/admin/AdminLayoutWrapper'
import { Session } from 'next-auth'
import SessionProviderWrapper from '@/components/layout/admin/SessionProviderWrapper'

export const metadata: Metadata = {
  title: 'Komizo - Overview',
  description: 'Manage your application from the admin panel',
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProviderWrapper>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </SessionProviderWrapper>
  )
}
