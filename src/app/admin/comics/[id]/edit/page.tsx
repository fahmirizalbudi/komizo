import { notFound } from 'next/navigation'
import { getComicById } from '../../actions'
import ComicEditForm from '@/components/features/admin/comics/ComicEditForm'

type ComicEditProps = {
  params: { id?: string }
}

const GenreEdit = async ({ params }: ComicEditProps) => {
  const { id } = await params
  if (!id) return notFound()

  const comic = await getComicById(id)
  if (!comic) return notFound()

  return <ComicEditForm initialComic={comic} />
}

export default GenreEdit
