import { Header } from '@/components/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Catgram',
  description: 'Instagram for cats'
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full w-full flex-col-reverse sm:flex-row">
          <Header />
          <main className="flex h-full min-h-screen w-full flex-col">
            {children}
          </main>
        </div>
        {modal}
      </body>
    </html>
  )
}
