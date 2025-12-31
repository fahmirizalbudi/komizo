'use client'

import React, { useEffect, useState } from 'react'
import ReaderHeader from './ReaderHeader'
import ReaderNavigation from './ReaderNavigation'
import { ChevronIcon } from '@/components/ui/Icon'
import { Chapter, Comic } from '@/generated/prisma/client'
import { useRouter } from 'next/navigation' // Untuk navigasi Next.js

type ReaderProps = {
  chapter: Chapter
  comic: Comic & { chapters: Chapter[] }
}

const Reader = ({ chapter, comic }: ReaderProps) => {
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0)

  const pages = Array.isArray(chapter.pages) ? chapter.pages.filter((p): p is string => typeof p === 'string') : []

  const sortedChapters = [...comic.chapters].sort((a, b) => a.number - b.number)

  const currentIndex = sortedChapters.findIndex((c) => c.id === chapter.id)

  const prevChapterData = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null

  const nextChapterData = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null

  const handleNavigate = (targetChapterId: string | number) => {
    router.push(`/chapters/${targetChapterId}/read`)
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#121212] min-h-screen text-white pb-20">
      {' '}
      <ReaderHeader chapter={chapter} comic={comic} />
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center pt-16">
        {' '}
        {pages.map((src, index) => (
          <div key={index} className="w-full relative bg-zinc-900 min-h-125">
            <img src={src} alt={`Page ${index + 1}`} className="w-full h-auto block" loading="lazy" />
          </div>
        ))}
      </main>
      <div className="border-t border-white/5 bg-dark-900 mt-10">
        <ReaderNavigation
          prevChapter={prevChapterData?.number}
          nextChapter={nextChapterData?.number}
          onNavigate={(navType) => {
            if (navType === 'prev' && prevChapterData) {
              handleNavigate(prevChapterData.id)
            } else if (navType === 'next' && nextChapterData) {
              handleNavigate(nextChapterData.id)
            }
          }}
        />
      </div>
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-zinc-800/80 backdrop-blur-md border border-white/10 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all animate-[fadeIn_0.3s_ease-out] z-40 cursor-pointer"
        >
          <ChevronIcon width={18} height={18} className="rotate-90" />
        </button>
      )}
      <style>{`
        header div[class*="bg-brand"] { width: ${scrollProgress}% !important; transition: width 0.1s; }
      `}</style>
    </div>
  )
}

export default Reader
