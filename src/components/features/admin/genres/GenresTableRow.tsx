'use client'

import { deleteGenre } from '@/app/admin/genres/actions'
import DeleteButton from '@/components/ui/shared/DeleteButton'
import DeleteModal from '@/components/ui/shared/DeleteModal'
import EditButton from '@/components/ui/shared/EditButton'
import { Td, Tr } from '@/components/ui/Table'
import { Genre } from '@/generated/prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type GenresTableRowProps = {
  genre: Genre
  index: number
}

const GenresTableRow = ({ genre, index }: GenresTableRowProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/admin/genres/${genre.id}/edit`)
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await deleteGenre(genre.id)
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Genre"
          itemName={genre.name}
        />
      )}

      <Tr key={genre.id}>
        <Td>{index + 1}</Td>
        <Td className="font-medium text-white">{genre.name}</Td>
        <Td align="right">
          <div className="flex justify-end gap-3">
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={() => setIsModalOpen(true)} />
          </div>
        </Td>
      </Tr>
    </>
  )
}

export default GenresTableRow
