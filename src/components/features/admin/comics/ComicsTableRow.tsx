'use client'

import { deleteComic } from '@/app/admin/comics/actions'
import { ProfileIcon } from '@/components/ui/Icon'
import DeleteButton from '@/components/ui/shared/DeleteButton'
import DeleteModal from '@/components/ui/shared/DeleteModal'
import EditButton from '@/components/ui/shared/EditButton'
import { Td, Tr } from '@/components/ui/Table'
import { ComicWithGenresAndChapters } from '@/types/comic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ChapterButton from './ChapterButton'

type ComicsTableRowProps = {
  comic: ComicWithGenresAndChapters
  index: number
}

const ComicsTableRow = ({ comic, index }: ComicsTableRowProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/admin/comics/${comic.id}/edit`)
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await deleteComic(comic.id)
  }

  const redirectToChapters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/admin/comics/${comic.id}/chapters`)
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Comic"
          itemName={comic.title}
        />
      )}

      <Tr key={comic.id}>
        <Td>{index + 1}</Td>
        <Td>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={
                  comic.coverUrl ??
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                }
                className="w-full h-full object-cover"
                alt={comic.title}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="font-medium text-zinc-200">{comic.title}</h4>
              <p className="text-xs text-zinc-500 flex items-center gap-0.5 antialiased">
                <ProfileIcon width={18} height={18} /> {comic.author}
              </p>
            </div>
          </div>
        </Td>
        <Td className="max-w-md">{comic.description}</Td>
        <Td>
          {comic.genres.length > 3
            ? comic.genres
                ?.map((g) => g.genre.name)
                .slice(0, 3)
                .join(', ') + ', ...'
            : comic.genres?.map((g) => g.genre.name).join(', ')}
        </Td>
        <Td>{comic.chapters.length}</Td>
        <Td align="right">
          <div className="flex justify-end gap-3">
            <ChapterButton onClick={redirectToChapters} />
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={() => setIsModalOpen(true)} />
          </div>
        </Td>
      </Tr>
    </>
  )
}

export default ComicsTableRow
