'use client'

import DeleteButton from '@/components/ui/shared/DeleteButton'
import DeleteModal from '@/components/ui/shared/DeleteModal'
import { Td, Tr } from '@/components/ui/Table'
import { Chapter } from '@/generated/prisma/client'
import { formatDate } from '@/utils/date'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type ChaptersTableRowProps = {
  chapter: Chapter
  index: number
}

const ChaptersTableRow = ({ chapter, index }: ChaptersTableRowProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`${chapter.id}/edit`)
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Chapter"
          itemName={chapter.title}
        />
      )}

      <Tr key={chapter.id}>
        <Td>{index + 1}</Td>
        <Td className="font-medium text-white">{chapter.title}</Td>
        <Td>{Array.isArray(chapter.pages) ? chapter.pages.length : 0} pages</Td>
        <Td>{formatDate(chapter.createdAt)}</Td>
        <Td align="right">
          <div className="flex justify-end gap-3">
            <DeleteButton onClick={() => setIsModalOpen(true)} />
          </div>
        </Td>
      </Tr>
    </>
  )
}

export default ChaptersTableRow
