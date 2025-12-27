import Link from 'next/link'
import { AddIcon } from '../Icon'

type AddButtonProps = {
  href: string
  text: string
}

const AddButton = ({ href, text }: AddButtonProps) => {
  return (
    <Link
      href={href}
      className="pl-6 pr-3.5 py-3 bg-brand hover:bg-brand-hover text-white rounded-2xl text-sm font-medium shadow-lg shadow-brand/25 transition-all flex items-center gap-2 cursor-pointer"
    >
      {text} <AddIcon width={24} height={24} />
    </Link>
  )
}

export default AddButton
