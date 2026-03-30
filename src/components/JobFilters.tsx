'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/?${params.toString()}`)
  }, [router, searchParams])

  const selectClass = "w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <select
        className={selectClass}
        value={searchParams.get('jobType') || ''}
        onChange={(e) => updateFilter('jobType', e.target.value)}
      >
        <option value="">職種：すべて</option>
        <option value="エンジニア">エンジニア</option>
        <option value="ビジネス">ビジネス</option>
        <option value="デザイナー">デザイナー</option>
        <option value="PM">PM</option>
        <option value="マーケティング">マーケティング</option>
      </select>

      <select
        className={selectClass}
        value={searchParams.get('industry') || ''}
        onChange={(e) => updateFilter('industry', e.target.value)}
      >
        <option value="">業界：すべて</option>
        <option value="SaaS">SaaS</option>
        <option value="FinTech">FinTech</option>
        <option value="HealthTech">HealthTech</option>
        <option value="EdTech">EdTech</option>
        <option value="EC">EC</option>
      </select>

      <select
        className={selectClass}
        value={searchParams.get('salary') || ''}
        onChange={(e) => updateFilter('salary', e.target.value)}
      >
        <option value="">年収帯：すべて</option>
        <option value="500">500万円以上</option>
        <option value="700">700万円以上</option>
        <option value="1000">1000万円以上</option>
        <option value="1200">1200万円以上</option>
      </select>

      <select
        className={selectClass}
        value={searchParams.get('stage') || ''}
        onChange={(e) => updateFilter('stage', e.target.value)}
      >
        <option value="">ステージ：すべて</option>
        <option value="シード">シード</option>
        <option value="シリーズA">シリーズA</option>
        <option value="シリーズB">シリーズB</option>
        <option value="上場準備中">上場準備中</option>
      </select>
    </div>
  )
}
