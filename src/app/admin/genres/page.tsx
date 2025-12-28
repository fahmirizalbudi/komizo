import AddButton from '@/components/ui/shared/AddButton'
import { getAllGenres } from './actions'
import GenresTable from '@/components/features/admin/genres/GenresTable'

const Genres = async () => {
  const genres = await getAllGenres()

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-xl text-white">List Genres</h3>
        <AddButton href="/admin/genres/create" text="Create Genre" />
      </div>
      <div className="overflow-x-auto">
        <GenresTable genres={genres} />
      </div>
    </div>
  )
}

export default Genres
