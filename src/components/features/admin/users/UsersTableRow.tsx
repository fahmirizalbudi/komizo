'use client'

import { deleteUser } from '@/app/admin/users/actions'
import DeleteButton from '@/components/ui/shared/DeleteButton'
import DeleteModal from '@/components/ui/shared/DeleteModal'
import EditButton from '@/components/ui/shared/EditButton'
import { Td, Tr } from '@/components/ui/Table'
import { UserWithFormattedDate } from '@/types/user'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type UsersTableRowProps = {
  user: UserWithFormattedDate
}

const UsersTableRow = ({ user }: UsersTableRowProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/admin/users/${user.id}/edit`)
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user.id === session?.user.id) return
    await deleteUser(user.id)
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete User"
          itemName={user.name}
        />
      )}

      <Tr key={user.id}>
        <Td className="font-medium text-white">{user.name}</Td>
        <Td>{user.email}</Td>
        <Td>{user.formattedCreatedAt}</Td>
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

export default UsersTableRow
