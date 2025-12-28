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
      className={`flex flex-col items-center justify-center py-12 px-4 text-center animate-[fadeIn_0.5s_ease-out] ${className}`}
    >
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative w-20 h-20 bg-zinc-900/80 border border-white/5 rounded-4xl flex items-center justify-center shadow-lg group-hover:border-brand/30 transition-colors duration-300">
          <div className="text-zinc-600 group-hover:text-brand transition-colors duration-300">
            <BoxIcon className='text-white' width={32.5} height={32.5} />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-8 leading-relaxed">{description}</p>
    </div>
  )
}

export default EmptyState
