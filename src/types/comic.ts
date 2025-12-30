import { Prisma } from '@/generated/prisma/client'
import { ComicCreateInput } from '@/generated/prisma/models'

export type ComicWithGenresAndChapters = Prisma.ComicGetPayload<{
  include: {
    genres: {
      include: {
        genre: true
      }
    }
    chapters: true
  }
}>

export type ComicEditInput = ComicCreateInput
