import { notFound } from 'next/navigation'
import { getGenreById } from '../../actions'
import GenreEditForm from '@/components/features/admin/genres/GenreEditForm'

type GenreEditProps = {
  params: { id?: string }
}

const GenreEdit = async ({ params }: GenreEditProps) => {
  const { id } = await params
  if (!id) return notFound()

  const genre = await getGenreById(id)
  if (!genre) return notFound()

  return <GenreEditForm initialGenre={genre} />
}

export default GenreEdit
