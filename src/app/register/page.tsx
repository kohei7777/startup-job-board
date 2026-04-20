import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'

export const metadata: Metadata = {
  title: '候補者登録 | KEYPLAYERS DIRECT',
  description: '高野秀敏が直接サポート。スタートアップ・ベンチャーの幹部ポジションへの転職を目指す方の登録フォームです。',
}

export default function RegisterPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0f', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.28) 0%, rgba(10, 10, 15, 0) 65%)'
        }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
               style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            審査制・無料登録
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            スカウト登録
          </h1>
          <p className="text-gray-400 leading-relaxed">
            登録後、高野が内容を確認し審査します。<br />
            審査通過後、スタートアップ各社からスカウトを受け取れるようになります。
          </p>

          {/* 3 points */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: '🔒', text: '審査制で質を担保' },
              { icon: '⚡', text: '高野が直接サポート' },
              { icon: '🎯', text: '幹部ポジション特化' },
            ].map(p => (
              <div key={p.text} className="rounded-xl p-4 text-center"
                   style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <div className="text-2xl mb-2">{p.icon}</div>
                <p className="text-gray-400 text-xs leading-tight">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12"
               style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
            <RegisterForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center"
              style={{ borderColor: 'rgba(168, 85, 247, 0.2)', backgroundColor: '#080810' }}>
        <p className="text-gray-600 text-sm">© 2024 KEYPLAYERS DIRECT. All rights reserved.</p>
      </footer>
    </div>
  )
}
