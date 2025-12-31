import HeroSection from '@/components/features/komizo/HeroSection'
import Layout from '@/components/layout/Layout'
import SectionHeader from '@/components/features/komizo/SectionHeader'
import ComicCard from '@/components/features/komizo/ComicCard'
import { getAllComics } from './admin/comics/actions'
import String from '@/lib/string'

const Komizo = async () => {
  const comics = await getAllComics()

  return (
    <Layout>
      <HeroSection
        backgroundUrl="https://4kwallpapers.com/images/wallpapers/naruto-uzumaki-3440x1440-18690.jpg"
        comicRating={4.6}
        comicTitleTop="Naruto"
        comicTitleBottom="Shippuden"
        comicGenres="Action, Adventure"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader />
        <div id="mangaGrid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
          {comics.map((comic, index) => (
            <ComicCard
              key={index}
              title={comic.title}
              img={
                comic.coverUrl ??
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
              }
              ch={`${comic.chapters.at(comic.chapters.length - 1)?.number ?? String.Empty}`}
              href={`comics/${comic.id}/detail`}
            />
          ))}
        </div>
      </main>
    </Layout>
  )
}

export default Komizo
