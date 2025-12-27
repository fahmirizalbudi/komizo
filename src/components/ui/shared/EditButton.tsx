import { EditIcon } from '../Icon'

type EditButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2.25 rounded-full bg-white/5 hover:bg-white hover:text-black transition cursor-pointer"
    >
      <EditIcon width={24} height={24} />
    </button>
  )
}

export default EditButton
