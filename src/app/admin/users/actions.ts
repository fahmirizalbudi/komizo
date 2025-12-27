'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { UserCreateInput } from '@/generated/prisma/models'
import { revalidatePath } from 'next/cache'
import { User } from '@/generated/prisma/client'
import { UserEditInput, UserWithFormattedDate } from '@/types/user'
import { formatDate } from '@/utils/date'

export async function getAllUsers(): Promise<UserWithFormattedDate[]> {
  const users = await prisma.user.findMany()
  const formattedUsers = users.map((user) => ({
    ...user,
    formattedCreatedAt: formatDate(user.createdAt),
  }))
  return formattedUsers
}

export async function createUser(user: UserCreateInput): Promise<void> {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  })
  revalidatePath('/admin/users')
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  })
}

export async function updateUser(user: UserEditInput): Promise<void> {
  if (user.password) {
    const password = user.password
    user.password = await bcrypt.hash(password, 10)
  }

  await prisma.user.update({
    where: { id: user.id },
    data: user,
  })

  revalidatePath('/admin/users')
}

export async function deleteUser(id: string): Promise<void> {
  if (!id) return

  await prisma.user.delete({
    where: { id },
  })

  revalidatePath('/admin/users')
}
