'use server'

import { ChapterCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import { mkdir, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import path from 'path'

export async function createChapterWithPages(chapter: ChapterCreateInput, pages: File[]) {
  const uploadDir = path.join(
    process.cwd(),
    'public/uploads/chapters',
    `${chapter.comic.connect!.id}-${chapter.number}`,
  )

  await mkdir(uploadDir, { recursive: true })

  const pageUrls: string[] = []

  for (let i = 0; i < pages.length; i++) {
    const file = pages[i]
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `page-${i + 1}${path.extname(file.name)}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)

    pageUrls.push(`/uploads/chapters/${chapter.comic.connect!.id}-${chapter.number}/${filename}`)
  }

  chapter.pages = pageUrls

  await prisma.chapter.create({
    data: chapter,
  })

  revalidatePath(`/admin/comics/${chapter.comic.connect!.id}/chapters`)
}
