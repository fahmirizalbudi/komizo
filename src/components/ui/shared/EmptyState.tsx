import { BoxIcon } from '../Icon'

type EmptyStateProps = {
  title?: string
  description?: string
  className?: string
}

const EmptyState = ({
  title = 'No data found',
  description = 'There are no records to display at the moment.',
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center pb-12 pt-16 px-4 text-center animate-[fadeIn_0.5s_ease-out] ${className}`}
    >
      <div className="relative mb-6 group">
        <div className="relative w-20 h-20 bg-zinc-900/80 border border-white/5 rounded-4xl flex items-center justify-center shadow-lg">
          <div className="text-zinc-600">
            <BoxIcon className="text-white" width={28} height={28} />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-8 leading-relaxed">{description}</p>
    </div>
  )
}

export default EmptyState
