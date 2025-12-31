import { ChevronIcon } from '../../ui/Icon'

type HeroSectionProps = {
  backgroundUrl: string
  comicTitleTop: string
  comicTitleBottom: string
  comicGenres: string
  comicRating: number
  comicChapter: number
}

const HeroSection = ({
  backgroundUrl,
  comicTitleTop,
  comicTitleBottom,
  comicGenres,
  comicRating,
  comicChapter
}: HeroSectionProps) => {
  return (
    <div className="relative h-[65vh] w-full overflow-hidden">
      <div className={`absolute inset-0 bg-cover bg-center`} style={{ backgroundImage: `url(${backgroundUrl})` }} />
      <div className="absolute inset-0 bg-linear-to-t from-dark-900 via-dark-900/70 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
        <div className="max-w-3xl animate-[fadeIn_1s_ease-out]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-2xl">
            {comicTitleTop} <br />
            <span className="text-white">{comicTitleBottom}</span>
          </h1>
          <div className="flex items-center gap-6 text-sm text-zinc-300 mb-10 font-medium">
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              ⭐ {comicRating}
            </span>
            <span className="flex items-center gap-1">{comicGenres}</span>
          </div>
          <div className="flex gap-4">
            <button className="pl-6 pr-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-xl text-sm font-medium shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-1 flex items-center gap-2 cursor-pointer">
              Read Chapter {comicChapter} <ChevronIcon width={22} height={22} className='rotate-180' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
