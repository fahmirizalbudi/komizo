import React, { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react'
import { DeleteIcon, UploadIcon } from './Icon'

type MultipleFileUploadProps = {
  subLabel?: string
  accept?: string
  onChange: (files: File[]) => void
  value: File[]
  className?: string
  name: string
}

const MultipleFileUpload = ({
  subLabel = 'Supported: JPG, PNG, WEBP',
  accept = 'image/*',
  onChange,
  value,
  className = '',
  name,
}: MultipleFileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    const newPreviews = value.map((file) => URL.createObjectURL(file))
    setPreviews(newPreviews)

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [value])

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles && newFiles.length > 0) {
      const fileArray = Array.from(newFiles)
      onChange([...value, ...fileArray])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleFiles(e.target.files)
    if (inputRef.current) inputRef.current.value = ''
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
    handleFiles(e.dataTransfer.files)
  }

  const handleRemove = (indexToRemove: number) => {
    const updatedFiles = value.filter((_, index) => index !== indexToRemove)
    onChange(updatedFiles)
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative w-full rounded-xl border-2 border-dashed transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center p-8
          ${
            isDragActive
              ? 'border-brand bg-brand/10 scale-[1.01]'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-brand/50 hover:bg-zinc-900'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          className="hidden"
          accept={accept}
          multiple
          onChange={handleChange}
        />

        <div className="z-10 pointer-events-none">
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
            {isDragActive ? 'Drop pages here' : 'Click or drag to upload pages'}
          </p>
          <p className="text-xs text-zinc-600 mt-2">{subLabel}</p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-[fadeIn_0.3s_ease-out]">
          {value.map((file, index) => (
            <div
              key={index}
              className="group relative aspect-2/3 bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-red-500/30 transition-all duration-300"
            >
              <img
                src={previews[index]}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-50"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 z-10">
                <p className="text-[11px] text-zinc-300 truncate max-w-[80%] mb-3 opacity-80">{file.name}</p>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-full text-xs font-medium transition-all flex items-center gap-2 border border-red-500/30 cursor-pointer scale-90 group-hover:scale-100"
                >
                  <DeleteIcon width={16} height={16} /> Remove
                </button>
              </div>

              <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-regular text-white border border-white/10 z-20 pointer-events-none">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultipleFileUpload
