import { Table, TBody, Th, THead, Tr } from '@/components/ui/Table'
import { UserWithFormattedDate } from '@/types/user'
import UsersTableRow from './UsersTableRow'

type UsersTableProps = {
  users: UserWithFormattedDate[]
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Date Created</Th>
          <Th align="right">Actions</Th>
        </Tr>
      </THead>
      <TBody>
        {users.map((user) => (
          <UsersTableRow key={user.id} user={user} />
        ))}
      </TBody>
    </Table>
  )
}

export default UsersTable
