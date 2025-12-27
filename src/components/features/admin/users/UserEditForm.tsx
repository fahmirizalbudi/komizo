'use client'

import { updateUser } from '@/app/admin/users/actions'
import SaveButton from '@/components/ui/shared/SaveButton'
import { EMPTY_STRING } from '@/lib/constants'
import { UserEditInput } from '@/types/user'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type UserEditFormProps = {
  initialUser: UserEditInput
}

const UserEditForm = ({ initialUser }: UserEditFormProps) => {
  const router = useRouter()
  const [user, setUser] = useState<UserEditInput>({
    id: initialUser.id,
    name: initialUser.name,
    email: initialUser.email,
    password: EMPTY_STRING,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    await updateUser(user)
    router.push('/admin/users')
  }

  return (
    <div className="w-full flex space-y-8">
      <div className="bg-zinc-900/50 p-8 w-full rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">User Information</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2.5">Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Ren Ashbel"
              className="w-full text-sm placeholder:font-medium bg-zinc-900 border border-white/5 rounded-xl px-5 py-3.5 text-zinc-200 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all placeholder-zinc-700"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2.5">Email</label>
              <input
                type="email"
                name="email"
                placeholder="renashbel@example.com"
                className="w-full text-sm placeholder:font-medium bg-zinc-900 border border-white/5 rounded-xl px-5 py-3.5 text-zinc-200 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all placeholder-zinc-700"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2.5">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full text-sm placeholder:font-medium bg-zinc-900 border border-white/5 rounded-xl px-5 py-3.5 text-zinc-200 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all placeholder-zinc-700"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <SaveButton text="Save User" onCLick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEditForm
