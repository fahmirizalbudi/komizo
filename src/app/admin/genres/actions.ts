'use server'

import { Genre } from '@/generated/prisma/client'
import { GenreCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import { GenreEditInput } from '@/types/genre'
import { revalidatePath } from 'next/cache'

export async function getAllGenres(): Promise<Genre[]> {
  const genres = await prisma.genre.findMany()
  return genres
}

export async function createGenre(genre: GenreCreateInput): Promise<void> {
  await prisma.genre.create({
    data: genre,
  })
  revalidatePath('/admin/genres')
}

export async function getGenreById(id: string): Promise<Genre | null> {
  return prisma.genre.findUnique({
    where: { id },
  })
}

export async function updateGenre(genre: GenreEditInput): Promise<void> {
  await prisma.genre.update({
    where: { id: genre.id },
    data: genre,
  })

  revalidatePath('/admin/genres')
}

export async function deleteGenre(id: string): Promise<void> {
  if (!id) return

  await prisma.genre.delete({
    where: { id },
  })

  revalidatePath('/admin/genres')
}
