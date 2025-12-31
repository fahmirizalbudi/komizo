import Link from 'next/link'

export type ComicCardProps = {
  title: string
  img: string
  ch?: string
  isHot?: boolean
  href: string
}

const ComicCard = ({ title, img, ch, isHot = false, href }: ComicCardProps) => {
  return (
    <Link className="group cursor-pointer" href={ch ? href : '#'}>
      <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 shadow-lg shadow-black/50 ring-1 ring-white/5 group-hover:ring-brand/50 transition-all duration-300">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

        {isHot && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shadow-md shadow-red-500/20">
            Hot
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-sm-plus text-zinc-100 truncate group-hover:text-brand transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-1 text-[13.5px] text-zinc-500 font-regular">
          <span className="flex items-center gap-1.75 text-zinc-400 group-hover:text-zinc-300 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-brand relative top-px"></span>
            {ch ? `Chapter ${ch}` : 'Coming Soon'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ComicCard
