import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './global.css'

export const metadata: Metadata = {
  icons: {
    icon: '/komizo.svg'
  }
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased custom-scrollbar custom-scrollbar-html ${poppins.className}`}>{children}</body>
    </html>
  )
}
