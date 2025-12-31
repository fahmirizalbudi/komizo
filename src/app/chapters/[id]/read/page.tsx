import { notFound } from 'next/navigation'
import { getComicById } from '@/app/admin/comics/actions'
import { getChapterById } from '@/app/admin/comics/[id]/chapters/actions'
import Reader from '@/components/features/komizo/Reader'

type ChapterReaderProps = {
  params: { id?: string }
}

const ChapterReader = async ({ params }: ChapterReaderProps) => {
  const { id } = await params
  if (!id) return notFound()

  const chapter = await getChapterById(id)
  if (!chapter) return notFound()

  const comic = await getComicById(chapter.comicId)
  if (!comic) return notFound()

  return <Reader chapter={chapter} comic={comic} />
}

export default ChapterReader
