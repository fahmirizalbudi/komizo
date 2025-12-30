import ComicsTable from '@/components/features/admin/comics/ComicsTable'
import AddButton from '@/components/ui/shared/AddButton'
import { getAllComics } from './actions'

const Comics = async () => {
  const comics = await getAllComics()

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-xl text-white">List Comics</h3>
        <AddButton href="/admin/comics/create" text="Create Comic" />
      </div>
      <div className="overflow-x-auto">
        <ComicsTable comics={comics} />
      </div>
    </div>
  )
}

export default Comics
