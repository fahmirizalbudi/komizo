import { notFound } from 'next/navigation'
import { getComicById } from '../../actions'
import AddButton from '@/components/ui/shared/AddButton'
import ChaptersTable from '@/components/features/admin/comics/chapters/ChaptersTable'
import { Chapter } from '@/generated/prisma/client'

type ChaptersProps = {
  params: { id?: string }
}

const Chapters = async ({ params }: ChaptersProps) => {
  const { id } = await params
  if (!id) return notFound()

  const comic = await getComicById(id)
  if (!comic) return notFound()

  const chapters: Chapter[] = comic.chapters

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-xl text-white">
          Recent <span className="text-brand">{comic.title}</span> Chapters
        </h3>
        <AddButton href={`/admin/comics/${id}/chapters/create`} text="Create Chapters" />
      </div>
      <div className="overflow-x-auto">
        <ChaptersTable chapters={chapters} />
      </div>
    </div>
  )
}

export default Chapters
