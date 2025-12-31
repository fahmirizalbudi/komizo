import Footer from './Footer'
import NavigationBar from './NavigationBar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-dark-900 min-h-screen text-zinc-100 antialiased selection:bg-brand selection:text-white">
      <NavigationBar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
