import { ChapterIcon } from "@/components/ui/Icon"

type ChapterButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ChapterButton = ({ onClick }: ChapterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition cursor-pointer"
    >
      <ChapterIcon width={22.5} height={22.5} />
    </button>
  )
}

export default ChapterButton
