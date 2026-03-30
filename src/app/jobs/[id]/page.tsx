import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ApplicationForm from '@/components/ApplicationForm'

const stageColors: Record<string, string> = {
  'シリーズA': 'bg-blue-900/50 text-blue-300 border border-blue-700/50',
  'シリーズB': 'bg-purple-900/50 text-purple-300 border border-purple-700/50',
  'シード': 'bg-green-900/50 text-green-300 border border-green-700/50',
  '上場準備中': 'bg-amber-900/50 text-amber-300 border border-amber-700/50',
}

const tagColors: Record<string, string> = {
  'エンジニア': 'bg-blue-900/40 text-blue-300',
  'ビジネス': 'bg-purple-900/40 text-purple-300',
  'デザイナー': 'bg-pink-900/40 text-pink-300',
  'PM': 'bg-indigo-900/40 text-indigo-300',
  'マーケティング': 'bg-orange-900/40 text-orange-300',
  'SaaS': 'bg-cyan-900/40 text-cyan-300',
  'FinTech': 'bg-green-900/40 text-green-300',
  'HealthTech': 'bg-rose-900/40 text-rose-300',
  'EdTech': 'bg-yellow-900/40 text-yellow-300',
  'EC': 'bg-teal-900/40 text-teal-300',
  'リモート可': 'bg-emerald-900/40 text-emerald-300',
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: job } = await supabase
    .from('Job')
    .select('*')
    .eq('id', parseInt(id))
    .single()

  if (!job) {
    notFound()
  }

  const tags = job.tags.split(',')
  const requirements = job.requirements.split(',')
  const benefits = job.benefits.split(',')
  const initials = job.company.charAt(0)

  return (
    <div style={{ backgroundColor: '#0a0a0f', minHeight: '100vh' }} className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          求人一覧に戻る
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="rounded-xl p-8" style={{ backgroundColor: '#111118', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                     style={{ backgroundColor: '#1e1e2e', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${stageColors[job.stage] || 'bg-gray-900/50 text-gray-300'}`}>
                      {job.stage}
                    </span>
                    {job.featured && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium text-white"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                        注目
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-1">{job.title}</h1>
                  <p className="text-gray-400">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className={`text-sm px-3 py-1 rounded-md ${tagColors[tag.trim()] || 'bg-gray-900/40 text-gray-400'}`}>
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '年収', value: `${job.salaryMin}〜${job.salaryMax}万円`, icon: '💰' },
                { label: '勤務地', value: job.location, icon: '📍' },
                { label: '従業員数', value: job.employees, icon: '👥' },
                { label: '設立', value: job.founded, icon: '🏢' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: '#111118', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="text-white font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-xl p-8" style={{ backgroundColor: '#111118', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
              <h2 className="text-xl font-bold text-white mb-4">仕事内容</h2>
              <p className="text-gray-400 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="rounded-xl p-8" style={{ backgroundColor: '#111118', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
              <h2 className="text-xl font-bold text-white mb-4">応募要件</h2>
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-gray-400">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#a855f7' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {req.trim()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded-xl p-8" style={{ backgroundColor: '#111118', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
              <h2 className="text-xl font-bold text-white mb-4">福利厚生・待遇</h2>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit) => (
                  <span key={benefit} className="text-sm px-3 py-2 rounded-lg text-gray-300"
                        style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                    {benefit.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl p-6" style={{ backgroundColor: '#111118', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
              <h2 className="text-lg font-bold text-white mb-6">応募する</h2>
              <ApplicationForm jobId={job.id} jobTitle={job.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
