import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '資料ダウンロード | KEYPLAYERS DIRECT',
  description: 'KEYPLAYERS DIRECTのプロジェクト計画書をダウンロードいただけます。',
}

const files = [
  {
    title: 'プロジェクト計画書（PowerPoint）',
    desc: '12スライド構成のプレゼンテーション資料。ロードマップ・獲得戦略・数値目標を網羅。',
    icon: '📊',
    href: '/keyplayers-direct-plan.pptx',
    filename: 'keyplayers-direct-plan.pptx',
    label: '.pptx  /  304KB',
  },
  {
    title: 'プロジェクト計画書（Word）',
    desc: '全セクションをA4文書にまとめたドキュメント。共有・印刷・編集に対応。',
    icon: '📄',
    href: '/keyplayers-direct-plan.docx',
    filename: 'keyplayers-direct-plan.docx',
    label: '.docx  /  14KB',
  },
]

export default function DownloadsPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0f', minHeight: '100vh' }}>
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.25) 0%, rgba(10, 10, 15, 0) 65%)'
        }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
                 style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              資料ダウンロード
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              プロジェクト計画書
            </h1>
            <p className="text-gray-400">
              KEYPLAYERS DIRECT の事業開発ロードマップ資料をダウンロードいただけます。
            </p>
          </div>

          <div className="space-y-5">
            {files.map((file) => (
              <div key={file.filename}
                   className="rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                   style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
                <div className="text-5xl shrink-0">{file.icon}</div>
                <div className="flex-1">
                  <h2 className="text-white font-bold text-lg mb-1">{file.title}</h2>
                  <p className="text-gray-400 text-sm mb-2 leading-relaxed">{file.desc}</p>
                  <span className="text-xs font-mono"
                        style={{ color: '#a855f7' }}>{file.label}</span>
                </div>
                <a href={file.href}
                   download={file.filename}
                   className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
                   style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  ダウンロード
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: 'rgba(168, 85, 247, 0.2)', backgroundColor: '#080810' }}>
        <p className="text-gray-600 text-sm">© 2024 KEYPLAYERS DIRECT. All rights reserved.</p>
      </footer>
    </div>
  )
}
