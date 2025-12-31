import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('pages') as File[]
    const comicId = formData.get('comicId') as string
    const chapterNumber = formData.get('chapterNumber') as string

    if (!files.length) {
      return NextResponse.json({ error: 'No files' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads/chapters', `${comicId}-${chapterNumber}`)

    await mkdir(uploadDir, { recursive: true })

    const pageUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const buffer = Buffer.from(await files[i].arrayBuffer())
      const filename = `page-${i + 1}${path.extname(files[i].name)}`
      await writeFile(path.join(uploadDir, filename), buffer)

      pageUrls.push(`/uploads/chapters/${comicId}-${chapterNumber}/${filename}`)
    }

    return NextResponse.json({ pageUrls })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
