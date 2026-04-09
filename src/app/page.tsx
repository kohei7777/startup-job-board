import { supabase } from '@/lib/supabase'
import JobCard from '@/components/JobCard'
import JobFilters from '@/components/JobFilters'
import { Suspense } from 'react'
import Link from 'next/link'

interface SearchParams {
  keyword?: string
  jobType?: string
  industry?: string
  salary?: string
  stage?: string
}

async function getJobs(searchParams: SearchParams) {
  let query = supabase
    .from('Job')
    .select('*')
    .order('featured', { ascending: false })
    .order('createdAt', { ascending: false })

  if (searchParams.keyword) {
    query = query.or(
      `title.ilike.%${searchParams.keyword}%,company.ilike.%${searchParams.keyword}%,description.ilike.%${searchParams.keyword}%`
    )
  }
  if (searchParams.jobType) {
    query = query.eq('jobType', searchParams.jobType)
  }
  if (searchParams.industry) {
    query = query.eq('industry', searchParams.industry)
  }
  if (searchParams.salary) {
    query = query.gte('salaryMin', parseInt(searchParams.salary))
  }
  if (searchParams.stage) {
    query = query.eq('stage', searchParams.stage)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const jobs = await getJobs(params)

  return (
    <div style={{ backgroundColor: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.3) 0%, rgba(10, 10, 15, 0) 70%)'
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
               style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            スタートアップ・ベンチャー特化型 転職支援プラットフォーム
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            次のキャリアを、<br />
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              高野秀敏と一緒に。
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            11,000件以上のキャリア面談実績を持つ高野秀敏が、あなたの転職を直接サポート。<br />
            スタートアップ・ベンチャーの幹部ポジションに特化した求人をご紹介します。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#jobs" className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:opacity-90"
               style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              求人を見る
            </a>
            <a href="https://keyplayers.jp" target="_blank" rel="noopener noreferrer"
               className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:bg-white/10"
               style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
              無料キャリア相談
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '11,000+', label: 'キャリア面談実績' },
              { number: '80+', label: '投資先企業' },
              { number: '178+', label: '上場支援実績' },
              { number: '10社', label: '投資先から上場' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2"
                     style={{ background: 'linear-gradient(135deg, #7c3aed, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">求人一覧</h2>
            <p className="text-gray-400">スタートアップ・ベンチャーの厳選された求人をご紹介します</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <form className="flex gap-3">
              <input
                type="text"
                name="keyword"
                defaultValue={params.keyword || ''}
                placeholder="キーワードで検索（例：エンジニア、マネージャー）"
                className="flex-1 bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
              />
              <button type="submit" className="px-6 py-3 rounded-lg font-medium text-white text-sm"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                検索
              </button>
            </form>

            <Suspense fallback={<div className="h-12 bg-gray-900 rounded-lg animate-pulse" />}>
              <JobFilters />
            </Suspense>
          </div>

          {/* Job Count */}
          <p className="text-gray-500 text-sm mb-6">{jobs.length}件の求人が見つかりました</p>

          {/* Job Grid */}
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">条件に合う求人が見つかりませんでした</p>
              <Link href="/" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
                検索条件をリセット
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-12" style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <h2 className="text-3xl font-bold text-white mb-4">気になる求人はありましたか？</h2>
            <p className="text-gray-400 mb-8">まずは高野秀敏との無料キャリア相談から。あなたに合った求人をご提案します。</p>
            <a href="https://keyplayers.jp" target="_blank" rel="noopener noreferrer"
               className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all hover:opacity-90"
               style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              無料キャリア相談を申し込む
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4" style={{ borderColor: 'rgba(168, 85, 247, 0.2)', backgroundColor: '#080810' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-xl font-bold mb-4">
                <span style={{ color: '#a855f7' }}>KEY</span>
                <span className="text-white">PLAYERS</span>
                <span className="text-gray-400 mx-1">|</span>
                <span className="text-white">DIRECT</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                11,000件以上のキャリア面談実績を持つ高野秀敏が運営する、スタートアップ・ベンチャー特化型の転職支援プラットフォームです。
              </p>
              <div className="flex gap-4 mt-4">
                {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                  <a key={social} href="#" className="text-gray-600 hover:text-purple-400 transition-colors text-sm">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">サイトマップ</h4>
              <ul className="space-y-2">
                {['求人一覧', '高野秀敏について', '無料登録', 'ログイン'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">関連リンク</h4>
              <ul className="space-y-2">
                {['プライバシーポリシー', '利用規約', '企業向け採用支援', 'お問い合わせ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center" style={{ borderColor: 'rgba(168, 85, 247, 0.1)' }}>
            <p className="text-gray-600 text-sm">© 2024 KEYPLAYERS DIRECT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
