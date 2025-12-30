'use client'

import SaveButton from '@/components/ui/shared/SaveButton'
import { ComicCreateInput } from '@/generated/prisma/models'
import { EMPTY_STRING } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import FormLabel from '@/components/ui/FormLabel'
import Form from '@/components/ui/Form'
import FileUpload from '@/components/ui/FileUpload'
import FormMultipleSelect, { SelectOption } from '@/components/ui/FormMultipleSelect'
import { getAllGenres } from '@/app/admin/genres/actions'
import { createComic } from '@/app/admin/comics/actions'

const ComicCreateForm = () => {
  const router = useRouter()
  const [genreOptions, setGenreOptions] = useState<SelectOption[]>([])
  const [comic, setComic] = useState<ComicCreateInput>({
    title: EMPTY_STRING,
    description: EMPTY_STRING,
    author: EMPTY_STRING,
  })
  const [cover, setCover] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [selectedGenreIds, setSelectedGenreIds] = useState<(string | number)[]>([])

  const handleCoverChange = (file: File | null) => {
    setCover(file)

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setCoverPreview(objectUrl)
    } else {
      setCoverPreview(null)
    }
  }

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview)
    }
  }, [coverPreview])

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getAllGenres()
      if (genres.length === 0) return
      setGenreOptions(
        genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        })),
      )
    }
    fetchGenres()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComic({ ...comic, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: ComicCreateInput = {
      ...comic,
      genres: {
        create: selectedGenreIds.map((genreId) => ({
          genre: {
            connect: { id: genreId.toString() },
          },
        })),
      },
    }

    await createComic(payload, cover as File)
    router.push('/admin/comics')
  }

  return (
    <div className="w-full flex space-y-8">
      <div className="bg-zinc-900/50 p-8 w-full rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">Comic Information</h3>
        <Form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <FormLabel text="Title" bind="title" />
              <FormInput name="title" value={comic.title} onChange={handleChange} placeholder="e.g One Piece" />
            </div>
            <div className="flex flex-col gap-2.5">
              <FormLabel text="Author" bind="author" />
              <FormInput name="author" value={comic.author} onChange={handleChange} placeholder="Enter author" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Description" bind="description" />
            <FormInput
              name="description"
              value={comic.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Genres" bind="genres" />
            <FormMultipleSelect
              name="genres"
              placeholder="Add genres (e.g. Action)..."
              value={selectedGenreIds}
              onChange={setSelectedGenreIds}
              options={genreOptions}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel text="Cover" bind="cover" />
            <FileUpload
              name="cover"
              subLabel="Recommended ratio 2:3 (e.g. 600×900px)"
              previewUrl={coverPreview}
              onChange={handleCoverChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-end mt-8">
            <SaveButton text="Save Comic" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ComicCreateForm
