import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KEYPLAYERS DIRECT - 幹部採用なら、キープレイヤーズダイレクト',
  description: '優秀な人材とスタートアップを繋ぐ求人プラットフォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className} style={{ backgroundColor: '#0a0a0f' }}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
