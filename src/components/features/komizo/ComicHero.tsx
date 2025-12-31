import { ComicWithGenresAndChapters } from '@/types/comic'
import { BookmarksIcon, ChevronIcon, ProfileIcon } from '../../ui/Icon'
import Link from 'next/link'

type ComicHeroProps = {
  comic: ComicWithGenresAndChapters
}

const ComicHero = ({ comic }: ComicHeroProps) => {
  return (
    <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 md:opacity-30 blur-sm scale-105"
          style={{ backgroundImage: `url(${comic.coverUrl})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-900 via-dark-900/90 to-dark-900/40" />
        <div className="absolute inset-0 bg-linear-to-b from-dark-900/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center w-full animate-[fadeIn_0.8s_ease-out]">
          <div className="shrink-0 w-48 md:w-64 aspect-2/3 rounded-2xl overflow-hidden shadow-2xl shadow-black/70 ring-1 ring-white/10 relative group transition-transform hover:scale-[1.02] duration-500">
            <img
              src={
                comic?.coverUrl ??
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
              }
              alt={comic.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                {comic.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm font-medium text-zinc-300">
                <span className="hidden md:inline w-1 h-1 rounded-full bg-zinc-600"></span>
                <span className="flex items-center gap-1.5">
                  <ProfileIcon width={18} height={18} /> {comic.author}
                </span>

                <span className="hidden md:inline w-1 h-1 rounded-full bg-zinc-600"></span>
                <span className="text-zinc-400">Updated 2h ago</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {comic.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="flex items-center text-xs gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10"
                >
                  {genre.genre.name}
                </span>
              ))}
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto md:mx-0 line-clamp-3 md:line-clamp-4">
              {comic.description}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <Link
                href={`/chapters/${comic.chapters.at(0)!.id}/read`}
                className="pl-6 pr-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-xl text-sm font-medium shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-1 flex items-center gap-2 cursor-pointer"
              >
                Read First Chapter <ChevronIcon width={20} height={20} className="rotate-180" />
              </Link>

              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-xl text-sm font-medium border border-white/10 transition-all flex items-center gap-2 cursor-pointer hover:border-white/20">
                <BookmarksIcon width={22} height={22} /> Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComicHero
