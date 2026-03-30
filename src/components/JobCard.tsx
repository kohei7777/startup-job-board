import Link from 'next/link'
import { Job } from '@/lib/types'

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

export default function JobCard({ job }: { job: Job }) {
  const tags = job.tags.split(',')
  const initials = job.company.charAt(0)

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="relative h-full rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
           style={{
             backgroundColor: '#111118',
             border: '1px solid transparent',
             backgroundClip: 'padding-box',
             boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
           }}>

        {job.featured && (
          <div className="absolute top-4 right-4">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white' }}>
              注目
            </span>
          </div>
        )}

        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
               style={{ backgroundColor: '#1e1e2e', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${stageColors[job.stage] || 'bg-gray-900/50 text-gray-300'}`}>
              {job.stage}
            </span>
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-1 pr-8">{job.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{job.company}</p>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className={`text-xs px-2 py-1 rounded-md ${tagColors[tag.trim()] || 'bg-gray-900/40 text-gray-400'}`}>
              {tag.trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-800">
          <span className="font-semibold" style={{ color: '#a855f7' }}>
            {job.salaryMin}〜{job.salaryMax}万円
          </span>
          <span className="text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
        </div>
      </div>
    </Link>
  )
}
