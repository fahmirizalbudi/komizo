import React from 'react'

type FormProps = {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

const Form = ({ children, onSubmit, className }: FormProps) => {
  return (
    <form autoComplete="off" onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}

export default Form
