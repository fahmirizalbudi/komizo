import { getAdminNavigations } from '@/lib/navigations'
import AdminSidebarMenu from './AdminSidebarMenu'
import { KomizoIcon } from '@/components/ui/Icon'

type AdminSidebarProps = {
  segment: string | null
}

const AdminSidebar = ({ segment }: AdminSidebarProps) => {
  const navigations = getAdminNavigations()

  return (
    <aside className="w-74 bg-neutral-950 flex-col hidden md:flex pl-6 pr-5.5 py-8 border-r border-white/5">
      <div className="h-12 flex items-center mb-8 pl-1">
        <KomizoIcon className='w-auto h-10 relative bottom-[0.75]' />
      </div>
      <nav className="flex-1 space-y-3">
        {navigations.map((navigation) => (
          <AdminSidebarMenu key={navigation.url} navigation={navigation} isActive={segment === navigation.segment} />
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
