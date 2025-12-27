import { SaveIcon } from '../Icon'
import React from 'react'

type SaveButtonProps = {
  onCLick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  text: string
}

const SaveButton = ({ onCLick, text = 'Save' }: SaveButtonProps) => {
  return (
    <button
      onClick={onCLick}
      className="pl-6 pr-3.5 py-3 bg-brand hover:bg-brand-hover text-white rounded-2xl text-sm font-medium shadow-lg shadow-brand/25 transition-all flex items-center gap-2 cursor-pointer"
    >
      {text} <SaveIcon width={24} height={24} />
    </button>
  )
}

export default SaveButton
