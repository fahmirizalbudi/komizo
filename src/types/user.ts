import { User } from '@/generated/prisma/client'
import { UserCreateInput } from '@/generated/prisma/models'

export type UserWithFormattedDate = User & {
  formattedCreatedAt: string
}

export type UserEditInput = UserCreateInput & {
  password?: string
}
