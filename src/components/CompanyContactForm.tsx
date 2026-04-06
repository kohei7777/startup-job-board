'use client'

import { useState } from 'react'

export default function CompanyContactForm() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    headcount: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/company-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">お問い合わせを受け付けました</h3>
        <p className="text-gray-400">担当者より2営業日以内にご連絡いたします。</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            会社名 <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="株式会社〇〇"
            className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ご担当者名 <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            メールアドレス <span className="text-purple-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="example@company.co.jp"
            className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            電話番号
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03-0000-0000"
            className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            採用したいポジション <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            name="position"
            required
            value={formData.position}
            onChange={handleChange}
            placeholder="CFO、VP of Sales など"
            className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            採用予定人数
          </label>
          <select
            name="headcount"
            value={formData.headcount}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
            style={{ backgroundColor: '#16162a', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          >
            <option value="">選択してください</option>
            <option value="1">1名</option>
            <option value="2-3">2〜3名</option>
            <option value="4-5">4〜5名</option>
            <option value="6+">6名以上</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          採用背景・メッセージ
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="採用の背景や、求める人物像などをご記入ください。"
          className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-12 py-4 rounded-lg font-semibold text-white text-base transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          {status === 'loading' ? '送信中...' : '無料相談を申し込む'}
        </button>
        <p className="text-gray-600 text-xs mt-3">送信後、2営業日以内にご連絡いたします</p>
      </div>
    </form>
  )
}
