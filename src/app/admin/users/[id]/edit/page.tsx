import { getUserById } from '@/app/admin/users/actions'
import UserEditForm from '@/components/features/admin/users/UserEditForm'
import { notFound } from 'next/navigation'

type UserEditProps = {
  params: { id?: string }
}

const UserEdit = async ({ params }: UserEditProps) => {
  const { id } = await params
  if (!id) return notFound()

  const user = await getUserById(id)
  if (!user) return notFound()

  return <UserEditForm initialUser={user} />
}

export default UserEdit
