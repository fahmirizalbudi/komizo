import { ChevronIcon } from '@/components/ui/Icon'
import { Chapter, Comic } from '@/generated/prisma/client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

type ReaderHeaderProps = {
  chapter: Chapter
  comic: Comic
}

const ReaderHeader = ({ chapter, comic }: ReaderHeaderProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight === 0) {
        setScrollProgress(0)
        return
      }
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-white/5 h-20 transition-transform duration-300">
      <div
        className="absolute top-0 left-0 h-0.75 bg-brand shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-150 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
          <Link href="/" className="shrink-0 group">
            <svg
              width={130}
              height={40}
              viewBox="0 0 140 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-auto"
            >
              <path d="M10 5L10 35" stroke="#6366f1" strokeWidth={6} strokeLinecap="round" />
              <path d="M30 5L10 20L30 35" stroke="white" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              <text x={45} y={28} fill="white" fontFamily="Poppins" fontWeight={700} fontSize={24} letterSpacing={-1}>
                Komizo
              </text>
              <circle cx={132} cy={28} r={3} fill="#6366f1" className="group-hover:animate-pulse" />
            </svg>
          </Link>
        </button>

        <div className="flex items-center gap-2">
          <Link
            href={`/comics/${comic.id}/detail`}
            className="text-[13px] font-medium text-zinc-100 hidden sm:block truncate max-w-50 md:max-w-75 cursor-pointer"
          >
            {comic.title}
          </Link>

          <span className="text-zinc-600 hidden sm:flex items-center">
            <ChevronIcon height={22} width={22} className="rotate-180" />
          </span>

          <span className="text-[13px] font-medium text-brand">Chapter {chapter.number}</span>
        </div>
        <div></div>
      </div>
    </nav>
  )
}

export default ReaderHeader
