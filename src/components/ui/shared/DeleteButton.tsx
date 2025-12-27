import { DeleteIcon } from '../Icon'

type DeleteButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition cursor-pointer"
    >
      <DeleteIcon width={22.5} height={22.5} />
    </button>
  )
}

export default DeleteButton
