import { ProfileIcon, SearchIcon } from '@/components/ui/Icon'

type AdminHeaderProps = {
  title: string
  subtitle: string
}

const AdminHeader = ({ title, subtitle }: AdminHeaderProps) => {
  return (
    <header className="h-30 flex items-center justify-between z-20 mb-2">
      <div className="flex flex-col gap-y-1.25">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-zinc-500 text-sm">{subtitle}</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-3.25 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors hover:bg-zinc-800 shadow-lg cursor-pointer">
          <ProfileIcon width={24} height={24} />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
