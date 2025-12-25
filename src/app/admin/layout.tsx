import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import AdminLayoutWrapper from '@/components/layout/admin/AdminLayoutWrapper'
import { Session } from 'next-auth'

export const metadata: Metadata = {
  title: 'Komizo - Overview',
  description: 'Manage your application from the admin panel',
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return <AdminLayoutWrapper session={session as Session}>{children}</AdminLayoutWrapper>
}
