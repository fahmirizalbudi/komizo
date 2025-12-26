import { Navigation } from '@/types/navigation'
import Link from 'next/link'

type AdminSidebarMenuProps = {
  navigation: Navigation
  isActive: boolean
}

const AdminSidebarMenu = ({ navigation, isActive }: AdminSidebarMenuProps) => {
  const Icon = navigation.icon

  return (
    <Link
      href={navigation.url}
      className={`flex items-center gap-3 px-5 py-3.5 ${
        isActive
          ? 'bg-brand text-white rounded-2xl shadow-glow transition-transform hover:scale-[1.02]'
          : 'text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all'
      }`}
    >
      {Icon && <Icon />}
      <span className="font-medium text-sm">{navigation.label}</span>
    </Link>
  )
}

export default AdminSidebarMenu
