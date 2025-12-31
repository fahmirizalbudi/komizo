'use server'

import { Chapter } from '@/generated/prisma/client'
import { ChapterCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createChapter(chapter: ChapterCreateInput) {
  await prisma.chapter.create({ data: chapter })
  revalidatePath(`/admin/comics/${chapter.comic.connect!.id}/chapters`)
}

export async function getChapterById(id: string): Promise<Chapter | null> {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
  })

  return chapter
}

export async function deleteChapter(id: string, comicId: string): Promise<void> {
  if (!id) return

  await prisma.chapter.delete({
    where: { id },
  })

  revalidatePath(`/admin/comic/${comicId}/chapters`)
}
