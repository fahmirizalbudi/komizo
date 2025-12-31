import { Chapter } from '@/generated/prisma/client'
import { formatDate } from '@/utils/date'
import Link from 'next/link'

const ChapterTile = ({ chapter }: { chapter: Chapter }) => {
  return (
    <Link
      href={`/chapters/${chapter.id}/read`}
      className="group w-full flex items-center justify-between py-4 px-6 rounded-xl bg-zinc-900/30 border border-white/5 cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-3">
          <h4 className="text-sm font-medium text-zinc-100">Chapter {chapter.number}</h4>
        </div>

        {chapter.title ? (
          <span className="text-[13px] text-zinc-400 font-regular truncate max-w-50 sm:max-w-md">{chapter.title}</span>
        ) : (
          <span className="text-[13px] text-zinc-600 italic">&nbsp;</span>
        )}
      </div>
      <span className="text-[13px] text-zinc-400 font-regular truncate max-w-50 sm:max-w-md">
        {formatDate(chapter.createdAt)}
      </span>
    </Link>
  )
}

const ChapterList = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <div className="mt-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {' '}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-brand rounded-full"></span>
          &nbsp;Chapter List
        </h3>
        <span className="text-lg font-medium text-brand">({chapters.length})</span>
      </div>
      <div className="flex flex-col gap-3">
        {chapters.length > 0 ? (
          chapters.map((chapter) => <ChapterTile key={chapter.id} chapter={chapter} />)
        ) : (
          <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <p className="text-zinc-500 text-sm">No chapters available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChapterList
