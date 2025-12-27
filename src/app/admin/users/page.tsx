import AddButton from '@/components/ui/shared/AddButton'
import UsersTable from '@/components/features/admin/users/UsersTable'
import { getAllUsers } from './actions'

const Users = async () => {
  const users = await getAllUsers()

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-xl text-white">List Users</h3>
        <AddButton href="/admin/users/create" text="Create User" />
      </div>
      <div className="overflow-x-auto">
        <UsersTable users={users} />
      </div>
    </div>
  )
}

export default Users
