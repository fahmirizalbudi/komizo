import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table'
import { UserWithFormattedDate } from '@/types/user'
import UsersTableRow from './UsersTableRow'
import EmptyState from '@/components/ui/shared/EmptyState'

type UsersTableProps = {
  users: UserWithFormattedDate[]
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Date Created</Th>
          <Th align="right">Actions</Th>
        </Tr>
      </THead>
      <TBody>
        {users.length === 0 ? (
          <Td colSpan={3}>
            <EmptyState />
          </Td>
        ) : (
          users.map((user, i) => <UsersTableRow key={user.id} user={user} index={i} />)
        )}
      </TBody>
    </Table>
  )
}

export default UsersTable
