import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'

export type SelectOption = {
  value: string | number
  label: string
}

type FormMultipleSelectProps = {
  name: string
  placeholder?: string
  value: (string | number)[]
  onChange: (val: (string | number)[]) => void
  options?: SelectOption[]
  allowCustom?: boolean
}

const FormMultipleSelect = ({
  name,
  placeholder = 'Select...',
  value,
  onChange,
  options = [],
  allowCustom = true,
}: FormMultipleSelectProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter(
    (opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(opt.value),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getLabel = (val: string | number) => {
    const found = options.find((opt) => opt.value === val)
    return found ? found.label : String(val)
  }

  const addItem = (val: string | number) => {
    if (!value.includes(val)) {
      onChange([...value, val])
      setInputValue('')
    }
  }

  const removeItem = (valToRemove: string | number) => {
    onChange(value.filter((item) => item !== valToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const match = filteredOptions.find((opt) => opt.label.toLowerCase() === inputValue.trim().toLowerCase())

      if (match) {
        addItem(match.value)
      } else if (allowCustom && inputValue.trim()) {
        addItem(inputValue.trim())
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeItem(value[value.length - 1])
    }
  }

  return (
    <div className="w-full relative" ref={containerRef}>
      <div
        className="w-full min-h-12.5 bg-zinc-900 border border-white/5 rounded-xl px-5 py-2.5 text-zinc-200 transition-all cursor-text flex flex-wrap items-center gap-2
        focus-within:outline-none focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/50"
        onClick={() => {
          inputRef.current?.focus()
          setIsOpen(true)
        }}
      >
        {value.map((item, index) => (
          <span
            key={index}
            className="bg-brand/20 text-brand px-2.5 py-[0.1] rounded-lg text-xs font-medium flex items-center gap-1 animate-[fadeIn_0.2s_ease-out]"
          >
            <span>{getLabel(item)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeItem(item)
              }}
              className="hover:text-white transition-colors text-lg font-normal relative top-[0.5px] flex items-center justify-center cursor-pointer"
            >
              &times;
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          name={name}
          autoComplete="off"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="bg-transparent border-none outline-none text-sm placeholder:font-medium text-zinc-200 placeholder-zinc-700 flex-1 min-w-25 py-1"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
          <ul className="py-0">
            {filteredOptions.map((option, idx) => (
              <li
                key={idx}
                onMouseDown={(e) => {
                  e.preventDefault()
                  addItem(option.value)
                }}
                className="px-5 py-2.5 text-sm text-zinc-300 hover:bg-brand hover:text-white cursor-pointer transition-colors flex items-center justify-between group"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FormMultipleSelect
