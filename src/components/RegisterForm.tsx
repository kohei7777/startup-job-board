'use client'

import { useState } from 'react'

const inputClass = "w-full rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
const inputStyle = { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168, 85, 247, 0.3)' }
const labelClass = "block text-sm font-medium text-gray-300 mb-2"
const required = <span className="text-purple-400 ml-1">*</span>

const selectStyle = { backgroundColor: '#0f0f1a', border: '1px solid rgba(168, 85, 247, 0.3)' }

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '', email: '', currentCompany: '', currentTitle: '',
    desiredPosition: '', industry: '', experience: '',
    salaryMin: '', salaryDesired: '', skills: '', timing: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.status === 409) { setStatus('duplicate'); return }
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">登録を受け付けました</h3>
        <p className="text-gray-400 leading-relaxed">
          内容を確認のうえ、高野よりご連絡いたします。<br />
          審査通過後、スカウトの受け取りが可能になります。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* 基本情報 */}
      <div>
        <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>1</span>
          基本情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>氏名{required}</label>
            <input type="text" name="name" required value={form.name} onChange={set}
              placeholder="山田 太郎" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>メールアドレス{required}</label>
            <input type="email" name="email" required value={form.email} onChange={set}
              placeholder="taro@example.com" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>現在の会社名</label>
            <input type="text" name="currentCompany" value={form.currentCompany} onChange={set}
              placeholder="株式会社〇〇" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>現在の役職・職種</label>
            <input type="text" name="currentTitle" value={form.currentTitle} onChange={set}
              placeholder="事業部長 / プロダクトマネージャー" className={inputClass} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* 希望条件 */}
      <div>
        <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>2</span>
          希望条件
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>希望するポジション{required}</label>
            <input type="text" name="desiredPosition" required value={form.desiredPosition} onChange={set}
              placeholder="CFO / VP of Sales / 事業開発責任者 など"
              className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>希望業界</label>
            <select name="industry" value={form.industry} onChange={set}
              className={`${inputClass} `} style={selectStyle}>
              <option value="">選択してください</option>
              {['SaaS / クラウド', 'フィンテック', 'HR テック', 'EC / D2C',
                'ヘルスケア / メドテック', 'エドテック', 'ディープテック', 'その他'].map(v =>
                <option key={v} value={v}>{v}</option>
              )}
            </select>
          </div>
          <div>
            <label className={labelClass}>経験年数</label>
            <select name="experience" value={form.experience} onChange={set}
              className={inputClass} style={selectStyle}>
              <option value="">選択してください</option>
              {['3〜5年', '5〜10年', '10〜15年', '15年以上'].map(v =>
                <option key={v} value={v}>{v}</option>
              )}
            </select>
          </div>
          <div>
            <label className={labelClass}>現在の年収（万円）</label>
            <input type="number" name="salaryMin" value={form.salaryMin} onChange={set}
              placeholder="800" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>希望年収（万円）</label>
            <input type="number" name="salaryDesired" value={form.salaryDesired} onChange={set}
              placeholder="1200" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>転職希望時期</label>
            <select name="timing" value={form.timing} onChange={set}
              className={inputClass} style={selectStyle}>
              <option value="">選択してください</option>
              {['すぐにでも', '3ヶ月以内', '6ヶ月以内', '1年以内', '良い案件があれば'].map(v =>
                <option key={v} value={v}>{v}</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* スキル・自己PR */}
      <div>
        <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>3</span>
          スキル・自己PR
        </h3>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>得意分野・スキル</label>
            <input type="text" name="skills" value={form.skills} onChange={set}
              placeholder="例：事業戦略、M&A、組織設計、プロダクト開発、資金調達"
              className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass}>自己PR・メッセージ</label>
            <textarea name="message" value={form.message} onChange={set} rows={5}
              placeholder="これまでの経歴・実績や、どんなスタートアップで活躍したいかをご記入ください。"
              className={`${inputClass} resize-none`} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* 注意書き */}
      <div className="rounded-xl p-4 text-sm text-gray-500 leading-relaxed"
           style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
        ご登録後、高野が内容を確認し審査を行います。審査通過後にスカウトの受け取りが可能になります。
        情報は採用支援の目的以外には使用しません。
      </div>

      {status === 'duplicate' && (
        <p className="text-yellow-400 text-sm text-center">このメールアドレスはすでに登録されています。</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}

      <div className="text-center">
        <button type="submit" disabled={status === 'loading'}
          className="px-14 py-4 rounded-lg font-semibold text-white text-base transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          {status === 'loading' ? '送信中...' : '登録を申し込む（無料）'}
        </button>
        <p className="text-gray-600 text-xs mt-3">審査通過後にご連絡いたします</p>
      </div>
    </form>
  )
}
