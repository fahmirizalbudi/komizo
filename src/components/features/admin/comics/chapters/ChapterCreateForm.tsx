'use client'

import SaveButton from '@/components/ui/shared/SaveButton'
import { ChapterCreateInput, ComicCreateInput } from '@/generated/prisma/models'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import FormLabel from '@/components/ui/FormLabel'
import Form from '@/components/ui/Form'
import MultipleFileUpload from '@/components/ui/MultipleFileUpload'
import { createChapter } from '@/app/admin/comics/[id]/chapters/actions'
import String from '@/lib/string'

const ChapterCreateForm = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [chapter, setChapter] = useState<ChapterCreateInput>({
    title: String.Empty,
    number: 1,
    pages: [],
    comic: {
      connect: {
        id: id,
      },
    },
  })
  const [pages, setPages] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapter({ ...chapter, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    pages.forEach((file) => formData.append('pages', file))
    formData.append('comicId', id)
    formData.append('chapterNumber', chapter.number.toString())

    const res = await fetch('/api/upload/chapters', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Upload failed')

    const { pageUrls } = await res.json()

    await createChapter({
      ...chapter,
      pages: pageUrls,
    })
    router.push(`/admin/comics/${id}/chapters`)
  }

  return (
    <div className="w-full flex space-y-8">
      <div className="bg-zinc-900/50 p-8 w-full rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">Chapter Information</h3>
        <Form className="space-y-6" onSubmit={handleSave}>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Title" bind="title" />
            <FormInput
              name="title"
              value={chapter.title}
              onChange={handleChange}
              placeholder="e.g. The Akatsuki Moves"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Chapter Number" bind="number" />
            <FormInput
              name="number"
              value={chapter.number}
              onChange={(e) => setChapter({ ...chapter, number: Number(e.target.value) })}
              placeholder="Enter ch. number"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Pages" bind="pages" />
            <MultipleFileUpload
              name="pages"
              subLabel="Supported: JPG, PNG. Max 5MB per page."
              value={pages}
              onChange={setPages}
            />
          </div>
          <div className="flex justify-end mt-8">
            <SaveButton text="Save Chapter" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ChapterCreateForm
