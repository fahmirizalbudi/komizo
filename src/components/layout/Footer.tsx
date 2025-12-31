const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 mt-12 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <svg width={100} height={30} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5L10 35" stroke="#6366f1" strokeWidth={6} strokeLinecap="round" />
            <path d="M30 5L10 20L30 35" stroke="white" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <text x={45} y={28} fill="white" fontFamily="Poppins" fontWeight={700} fontSize={24}>
              Komizo
            </text>
          </svg>
        </div>
        <p className="text-zinc-500 text-sm">© 2026 Komizo. Made by @fahmirizalbudi.</p>
      </div>
    </footer>
  )
}

export default Footer
