import React, { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { DeleteIcon, UploadIcon } from './Icon'

type FileUploadProps = {
  subLabel?: string
  accept?: string
  onChange: (file: File | null) => void
  previewUrl?: string | null
  className?: string
  name: string
}

const FileUpload = ({
  subLabel = 'PNG, JPG up to 5MB',
  accept = 'image/*',
  onChange,
  previewUrl,
  className = '',
  name,
}: FileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div
      className={`relative w-full aspect-4/3 md:aspect-video rounded-xl border-2 border-dashed transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center
          ${
            isDragActive
              ? 'border-brand bg-brand/10 scale-[1.01]'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-brand/50 hover:bg-zinc-900'
          }
        ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input ref={inputRef} type="file" name={name} className="hidden" accept={accept} onChange={handleChange} />

      {previewUrl ? (
        <>
          <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain z-0" />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 p-4">
            <p className="text-white font-medium mb-3 text-sm">Click to change</p>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-full text-xs font-medium transition-all flex items-center gap-2 border border-red-500/30 cursor-pointer"
            >
              <DeleteIcon height={20} width={20} /> Remove
            </button>
          </div>
        </>
      ) : (
        <div className="z-10 p-6 pointer-events-none">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 transition-all mx-auto
              ${
                isDragActive
                  ? 'bg-brand text-white'
                  : 'bg-zinc-800 text-zinc-500 group-hover:bg-brand/20 group-hover:text-brand'
              }
            `}
          >
            <UploadIcon />
          </div>
          <p className="text-sm text-zinc-300 font-medium">
            {isDragActive ? 'Drop file here' : 'Click or drag to upload'}
          </p>
          <p className="text-xs text-zinc-600 mt-2">{subLabel}</p>
        </div>
      )}
    </div>
  )
}

export default FileUpload
