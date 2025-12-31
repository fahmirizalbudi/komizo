const SectionHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div></div>
      <div className="flex gap-6 text-sm font-medium border-b border-zinc-800 pb-1">
        <button className="text-white border-b-2 border-brand pb-2">Hot Updates</button>
        <button className="text-zinc-500 hover:text-white transition-colors pb-2">New Series</button>
      </div>
    </div>
  )
}

export default SectionHeader
