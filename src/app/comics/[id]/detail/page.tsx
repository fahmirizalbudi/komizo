import Layout from '@/components/layout/Layout'
import ComicHero from '@/components/features/komizo/ComicHero'
import ChapterList from '@/components/features/komizo/ChapterList'
import { notFound } from 'next/navigation'
import { getComicById } from '@/app/admin/comics/actions'

type ComicDetailProps = {
  params: { id?: string }
}

const ComicDetail = async ({ params }: ComicDetailProps) => {
  const { id } = await params
  if (!id) return notFound()

  const comic = await getComicById(id)
  if (!comic) return notFound()

  return (
    <Layout>
      <main className="bg-dark-900 min-h-screen pb-20">
        <ComicHero comic={comic} />
        <ChapterList chapters={comic.chapters} />
      </main>
    </Layout>
  )
}

export default ComicDetail
