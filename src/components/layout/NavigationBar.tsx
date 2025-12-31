import Link from 'next/link'
import { BookmarksIcon, SearchIcon } from '../ui/Icon'

const NavigationBar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="shrink-0 group">
            <svg
              width={130}
              height={40}
              viewBox="0 0 140 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-auto"
            >
              <path d="M10 5L10 35" stroke="#6366f1" strokeWidth={6} strokeLinecap="round" />
              <path d="M30 5L10 20L30 35" stroke="white" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              <text x={45} y={28} fill="white" fontFamily="Poppins" fontWeight={700} fontSize={24} letterSpacing={-1}>
                Komizo
              </text>
              <circle cx={132} cy={28} r={3} fill="#6366f1" className="group-hover:animate-pulse" />
            </svg>
          </Link>
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition-colors text-xl">
              <SearchIcon width={22} height={22} />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors text-xl">
              <BookmarksIcon width={22} height={22} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
