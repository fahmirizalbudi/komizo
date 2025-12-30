'use server'

import { ComicCreateInput, ComicGenreCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import { ComicEditInput, ComicWithGenresAndChapters } from '@/types/comic'
import { writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import path from 'path'

export async function getAllComics(): Promise<ComicWithGenresAndChapters[]> {
  const comics = await prisma.comic.findMany({
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      chapters: true,
    },
  })

  return comics
}

export async function createComic(comic: ComicCreateInput, cover: File): Promise<void> {
  const bytes = await cover.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const coverName = `${Date.now()}-${cover.name}`
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  const coverPath = path.join(uploadDir, coverName)

  await writeFile(coverPath, buffer)
  const coverUrl = `/uploads/${coverName}`

  comic.coverUrl = coverUrl

  await prisma.comic.create({
    data: comic,
  })

  revalidatePath('/admin/comics')
}

export async function getComicById(id: string): Promise<ComicWithGenresAndChapters | null> {
  const comic = await prisma.comic.findUnique({
    where: { id },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      chapters: true,
    },
  })

  return comic
}

export async function updateComic(comic: ComicEditInput, cover?: File): Promise<void> {
  await prisma.comicGenre.deleteMany({
    where: { comicId: comic.id },
  })

  if (cover) {
    const bytes = await cover.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const coverName = `${Date.now()}-${cover.name}`
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const coverPath = path.join(uploadDir, coverName)

    await writeFile(coverPath, buffer)
    const coverUrl = `/uploads/${coverName}`

    comic.coverUrl = coverUrl
  }

  await prisma.comic.update({
    where: { id: comic.id },
    data: comic,
  })

  revalidatePath('/admin/comics')
}

export async function deleteComic(id: string): Promise<void> {
  if (!id) return

  await prisma.comic.delete({
    where: { id },
  })

  revalidatePath('/admin/comics')
}
