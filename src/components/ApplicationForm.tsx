'use client'

import { useState } from 'react'

export default function ApplicationForm({ jobId, jobTitle }: { jobId: number; jobTitle: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`応募を受け付けました！\n\nお名前: ${formData.name}\nメール: ${formData.email}\n求人: ${jobTitle}\n\n担当者より2〜3営業日以内にご連絡いたします。`)
    setFormData({ name: '', email: '', phone: '', position: '', message: '' })
  }

  const inputClass = "w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">お名前 *</label>
        <input
          type="text"
          required
          className={inputClass}
          placeholder="山田 太郎"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">メールアドレス *</label>
        <input
          type="email"
          required
          className={inputClass}
          placeholder="taro@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">電話番号</label>
        <input
          type="tel"
          className={inputClass}
          placeholder="090-1234-5678"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">希望職種</label>
        <select
          className={inputClass}
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        >
          <option value="">選択してください</option>
          <option value="エンジニア">エンジニア</option>
          <option value="ビジネス">ビジネス</option>
          <option value="デザイナー">デザイナー</option>
          <option value="PM">PM</option>
          <option value="マーケティング">マーケティング</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">応募求人</label>
        <input
          type="text"
          className={inputClass}
          value={jobTitle}
          readOnly
          style={{ backgroundColor: '#1a1a2e', cursor: 'not-allowed', opacity: 0.7 }}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">自己PR</label>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="これまでの経験や志望動機をご記入ください"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90 mt-2"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
      >
        応募する
      </button>

      <p className="text-xs text-gray-600 text-center">
        ご応募後、担当者よりご連絡いたします
      </p>
    </form>
  )
}
