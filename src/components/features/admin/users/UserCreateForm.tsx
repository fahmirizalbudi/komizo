'use client'

import SaveButton from '@/components/ui/shared/SaveButton'
import { UserCreateInput } from '@/generated/prisma/models'
import { EMPTY_STRING } from '@/lib/constants'
import { createUser } from '@/app/admin/users/actions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import FormLabel from '@/components/ui/FormLabel'
import Form from '@/components/ui/Form'

const UserCreateForm = () => {
  const router = useRouter()
  const [user, setUser] = useState<UserCreateInput>({
    name: EMPTY_STRING,
    email: EMPTY_STRING,
    password: EMPTY_STRING,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUser(user)
    router.push('/admin/users')
  }

  return (
    <div className="w-full flex space-y-8">
      <div className="bg-zinc-900/50 p-8 w-full rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">User Information</h3>
        <Form className="space-y-6" onSubmit={handleSave}>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Name" bind="name" />
            <FormInput name="name" value={user.name} onChange={handleChange} placeholder="e.g Ren Ashbel" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <FormLabel text="Email" bind="email" />
              <FormInput name="email" value={user.email} onChange={handleChange} placeholder="renashbel@example.com" />
            </div>
            <div className="flex flex-col gap-2.5">
              <FormLabel text="Password" bind="password" />
              <FormInput
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <SaveButton text="Save User" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UserCreateForm
