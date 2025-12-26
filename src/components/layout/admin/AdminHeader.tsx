import { ProfileIcon, SearchIcon } from '@/components/ui/Icon'

type AdminHeaderProps = {
  title: string
  subtitle: string
}

const AdminHeader = ({ title, subtitle }: AdminHeaderProps) => {
  return (
    <header className="h-30 flex items-center justify-between z-20">
      <div className="flex flex-col gap-y-1.25">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-zinc-500 text-sm-plus">{subtitle}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hidden sm:block group">
          <SearchIcon
            width={20}
            height={20}
            className="absolute left-4 top-[49%] -translate-y-1/2 text-zinc-500 group-focus-within:text-brand transition-colors"
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-zinc-900 border border-transparent focus:border-brand/30 text-sm rounded-2xl pl-11 pr-6 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-brand/20 text-zinc-200 placeholder-zinc-600 transition-all shadow-lg"
          />
        </div>
        <button className="relative p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors hover:bg-zinc-800 shadow-lg cursor-pointer">
          <ProfileIcon width={23} height={23} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-brand rounded-full ring-2 ring-zinc-900" />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
