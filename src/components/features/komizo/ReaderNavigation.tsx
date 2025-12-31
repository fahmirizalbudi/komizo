import { ChevronIcon } from '../../ui/Icon'

type ReaderNavigationProps = {
  prevChapter?: number | string
  nextChapter?: number | string
  onNavigate: (type: 'prev' | 'next') => void
}

const ReaderNavigation = ({ prevChapter, nextChapter, onNavigate }: ReaderNavigationProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 flex items-center justify-between gap-4">
      <button
        disabled={!prevChapter}
        onClick={() => onNavigate('prev')}
        className={`group flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full border transition-all duration-300
          ${
            !prevChapter
              ? 'border-white/5 bg-zinc-900/20 opacity-40 cursor-not-allowed'
              : 'border-white/10 bg-zinc-900/80 hover:bg-zinc-800 hover:border-white/20 text-zinc-400 hover:text-white cursor-pointer'
          }
        `}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${!prevChapter ? 'bg-white/5' : 'bg-white/5 group-hover:bg-white/10 group-hover:text-white'}
        `}
        >
          <ChevronIcon width={18} height={18} />
        </div>

        <div className="flex flex-col items-start text-left leading-none">
          <span className="text-xs font-medium opacity-60 uppercase tracking-wide mb-0.5">Prev</span>
          <span className="text-sm font-semibold">{prevChapter ? `Ch. ${prevChapter}` : '-'}</span>
        </div>
      </button>

      <button
        disabled={!nextChapter}
        onClick={() => onNavigate('next')}
        className={`group flex items-center gap-3 pr-1.5 pl-5 py-1.5 rounded-full transition-all duration-300 shadow-lg
          ${
            !nextChapter
              ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed shadow-none border border-white/5'
              : 'bg-brand hover:bg-brand-hover text-white shadow-brand/20 hover:shadow-brand/40 transform hover:-translate-y-0.5 cursor-pointer'
          }
        `}
      >
        <div className="flex flex-col items-end text-right leading-none">
          <span className="text-xs font-semibold opacity-80 uppercase tracking-wide mb-0.5">Next</span>
          <span className="text-sm font-semibold">{nextChapter ? `Ch. ${nextChapter}` : '-'}</span>
        </div>

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
             ${!nextChapter ? 'bg-black/10' : 'bg-white/20 group-hover:bg-white/30'}
        `}
        >
          <ChevronIcon width={18} height={18} className="rotate-180" />
        </div>
      </button>
    </div>
  )
}

export default ReaderNavigation
