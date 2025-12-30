'use client'

import SaveButton from '@/components/ui/shared/SaveButton'
import { GenreCreateInput, UserCreateInput } from '@/generated/prisma/models'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import FormLabel from '@/components/ui/FormLabel'
import Form from '@/components/ui/Form'
import { createGenre } from '@/app/admin/genres/actions'

const GenreCreateForm = () => {
  const router = useRouter()
  const [genre, setGenre] = useState<GenreCreateInput>({
    name: String.Empty,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenre({ ...genre, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createGenre(genre)
    router.push('/admin/genres')
  }

  return (
    <div className="w-full flex space-y-8">
      <div className="bg-zinc-900/50 p-8 w-full rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">Genre Information</h3>
        <Form className="space-y-6" onSubmit={handleSave}>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Name" bind="name" />
            <FormInput name="name" value={genre.name} onChange={handleChange} placeholder="e.g Sci-fi" />
          </div>
          <div className="flex justify-end mt-8">
            <SaveButton text="Save Genre" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default GenreCreateForm
