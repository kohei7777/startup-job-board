'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-purple-900/30" style={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">
              <span style={{ color: '#a855f7' }}>KEY</span>
              <span className="text-white">PLAYERS</span>
              <span className="text-gray-400 mx-1">|</span>
              <span className="text-white">DIRECT</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
              求人一覧
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">
              高野秀敏について
            </Link>
            <Link href="#login" className="text-gray-300 hover:text-white transition-colors text-sm">
              ログイン
            </Link>
            <button className="px-4 py-2 rounded-md text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(135deg, #e91e63, #f06292)' }}>
              無料登録
            </button>
          </nav>

          <button className="md:hidden text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
