import { cn } from '@/utils/classname'
import React, { ReactNode } from 'react'

type TableProps = {
  children: React.ReactNode
  className?: string
}
type THeadProps = TableProps
type TBodyProps = TableProps
type TrProps = TableProps
type ThProps = TableProps & {
  align?: 'left' | 'right'
}
type TdProps = ThProps & {
  colSpan?: number
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full text-left text-sm text-zinc-400', className)}>{children}</table>
    </div>
  )
}

export const THead = ({ children, className }: THeadProps) => {
  return <thead className={cn('text-xs uppercase font-bold text-zinc-600', className)}>{children}</thead>
}

export const TBody = ({ children, className }: TBodyProps) => {
  return <tbody className={cn('divide-y divide-white/5', className)}>{children}</tbody>
}

export const Tr = ({ children, className }: TrProps) => {
  return <tr className={cn('group', className)}>{children}</tr>
}

export const Th = ({ children, align = 'left', className }: ThProps) => {
  return <th className={cn('px-4 py-4', align === 'right' && 'text-right', className)}>{children}</th>
}

export const Td = ({ children, align = 'left', className, colSpan }: TdProps) => {
  return (
    <td className={cn('px-4 py-4', align === 'right' && 'text-right', className)} colSpan={colSpan}>
      {children}
    </td>
  )
}
