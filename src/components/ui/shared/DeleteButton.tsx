import { DeleteIcon } from '../Icon'

type DeleteButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2.25 rounded-full bg-white/5 hover:bg-white hover:text-black transition cursor-pointer"
    >
      <DeleteIcon width={24} height={24} />
    </button>
  )
}

export default DeleteButton
