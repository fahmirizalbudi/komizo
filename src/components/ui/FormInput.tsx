import React from 'react'

type FormInputProps = {
  name: string
  placeholder?: string
  value?: string | number
  type?: 'text' | 'number' | 'date' | 'tel' | 'password' | 'email'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ name, placeholder, value, type = 'text', onChange }: FormInputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full text-sm placeholder:font-medium bg-zinc-900 border border-white/5 rounded-xl px-5 py-3.5 text-zinc-200 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all placeholder-zinc-700"
      value={value}
      onChange={onChange}
    />
  )
}

export default FormInput
