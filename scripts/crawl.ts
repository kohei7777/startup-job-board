/**
 * startupclass.co.jp 求人クローラー
 * 
 * 使い方:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/crawl.ts
 *
 * 環境変数 (.env):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@xxx.iam.gserviceaccount.com
 *   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
 *   GOOGLE_SHEET_ID=スプレッドシートのID
 *   MAX_PAGES=クロールするページ数（省略時: 3）
 */

import * as dotenv from 'dotenv'
dotenv.config()

import * as cheerio from 'cheerio'
import { google } from 'googleapis'

const BASE_URL = 'https://startupclass.co.jp'
const JOBS_URL = `${BASE_URL}/online/jobs/`
const MAX_PAGES = parseInt(process.env.MAX_PAGES || '3')
const DELAY_MS = 1500 // サーバー負荷軽減のための待機時間

// ──────────────────────────────────────────
// ユーティリティ
// ──────────────────────────────────────────

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; StartupJobBoardBot/1.0)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'ja,en;q=0.9',
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
  return res.text()
}

// ──────────────────────────────────────────
// 求人一覧ページから求人URLを収集
// ──────────────────────────────────────────

async function getJobUrls(page: number): Promise<string[]> {
  const url = page === 1 ? JOBS_URL : `${JOBS_URL}?page=${page}`
  const html = await fetchHtml(url)
  const $ = cheerio.load(html)
  const urls: string[] = []

  $('a[href*="/online/companies/"][href*="/job_offers/"]').each((_, el) => {
    const href = $(el).attr('href') || ''
    if (href && !urls.includes(href)) {
      const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`
      urls.push(fullUrl)
    }
  })

  return [...new Set(urls)]
}

// ──────────────────────────────────────────
// 求人詳細ページからデータを抽出
// ──────────────────────────────────────────

interface JobData {
  url: string
  title: string
  subtitle: string
  company: string
  industry: string
  stage: string
  roles: string
  employmentType: string
  salaryMin: string
  salaryMax: string
  location: string
  remote: string
  description: string
  requirements: string
  benefits: string
  datePosted: string
  crawledAt: string
}

async function scrapeJobDetail(url: string): Promise<JobData | null> {
  try {
    const html = await fetchHtml(url)
    const $ = cheerio.load(html)

    // JSON-LD から構造化データを取得
    let jsonLd: any = {}
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const parsed = JSON.parse($(el).html() || '{}')
        if (parsed['@type'] === 'JobPosting') jsonLd = parsed
      } catch {}
    })

    // タイトル（「〜の求人｜」を除去）
    const h1Text = $('h1').first().text().trim()
    const h1Clean = h1Text.includes('の求人｜') ? h1Text.split('の求人｜')[1] : h1Text
    const titleParts = h1Clean.split('|')
    const subtitle = titleParts.length > 1 ? titleParts[1].trim() : h1Clean

    // サブタイトル（キャッチコピー）
    const catchcopy = $('h1').first().next().text().trim() || subtitle

    // 会社名
    const company = jsonLd?.hiringOrganization?.name || 
                    $('[class*="company"]').first().text().trim() || ''

    // 業界カテゴリ
    const industryLinks: string[] = []
    $('a[href*="/companies/categories/"]').each((_, el) => {
      const text = $(el).text().trim()
      if (text && !industryLinks.includes(text)) industryLinks.push(text)
    })
    const industry = industryLinks.join(' / ')

    // ステージ
    let stage = ''
    $('*').each((_, el) => {
      const text = $(el).text()
      if (text.includes('シード') || text.includes('アーリー') || text.includes('創業')) {
        stage = 'シード/アーリー'
        return false
      }
      if (text.includes('シリーズA')) { stage = 'シリーズA'; return false }
      if (text.includes('シリーズB')) { stage = 'シリーズB'; return false }
      if (text.includes('シリーズC')) { stage = 'シリーズC'; return false }
      if (text.includes('上場')) { stage = '上場・上場準備中'; return false }
    })

    // 職種/ロール
    const roleLinks: string[] = []
    $('a[href*="/online/jobs/categories/"]').each((_, el) => {
      const text = $(el).text().trim()
      if (text && !roleLinks.includes(text)) roleLinks.push(text)
    })
    const roles = roleLinks.join(', ')

    // テーブルデータを抽出
    const tableData: Record<string, string> = {}
    $('table tr, table [role="row"]').each((_, row) => {
      const cells = $(row).find('td, th, [role="gridcell"], [role="columnheader"]')
      if (cells.length >= 2) {
        const key = $(cells[0]).text().trim().replace(/\s+/g, '')
        const val = $(cells[1]).text().trim().replace(/\s+/g, ' ')
        if (key) tableData[key] = val
      }
    })

    // 就業形態
    const employmentType = tableData['就業形態'] || 
      (jsonLd?.employmentType ? [].concat(jsonLd.employmentType).join(', ') : '') || ''

    // 年収
    const salaryText = tableData['年収(フルタイム時)'] || 
                       tableData['年収'] || 
                       tableData['給与'] || ''
    let salaryMin = '', salaryMax = ''
    const salaryMatch = salaryText.match(/(\d+(?:,\d+)?)万円\s*[〜~]\s*(\d+(?:,\d+)?)万円/)
    if (salaryMatch) {
      salaryMin = salaryMatch[1].replace(',', '') + '万円'
      salaryMax = salaryMatch[2].replace(',', '') + '万円'
    } else if (salaryText) {
      salaryMin = salaryText
    }

    // 勤務地
    const locationText = tableData['勤務地'] || ''
    const addressRegion = jsonLd?.jobLocation?.address?.addressRegion || ''
    const location = locationText || addressRegion || ''

    // リモート
    const isRemote = jsonLd?.jobLocationType === 'TELECOMMUTE'
    const remote = isRemote ? 'フルリモート可' : 
                  (location.includes('リモート') ? 'リモート可' : '要相談')

    // 仕事内容
    let description = ''
    $('h2, h3, h4').each((_, heading) => {
      const text = $(heading).text().trim()
      if (text.includes('業務詳細') || text.includes('仕事内容') || text.includes('ポジション概要')) {
        const content = $(heading).parent().text().replace(text, '').trim()
        description = content.substring(0, 500)
        return false
      }
    })
    if (!description && jsonLd?.description) {
      description = jsonLd.description.replace(/<[^>]+>/g, '').substring(0, 500)
    }

    // 応募要件
    let requirements = ''
    $('h2, h3, h4').each((_, heading) => {
      const text = $(heading).text().trim()
      if (text.includes('応募条件') || text.includes('必須') || text.includes('求める人物')) {
        const content = $(heading).parent().text().replace(text, '').trim()
        requirements = content.substring(0, 300)
        return false
      }
    })

    // 福利厚生
    const benefits = tableData['待遇・福利厚生'] || tableData['待遇'] || tableData['福利厚生'] || ''

    return {
      url,
      title: subtitle || catchcopy,
      subtitle: catchcopy,
      company,
      industry,
      stage,
      roles,
      employmentType,
      salaryMin,
      salaryMax,
      location: location.substring(0, 100),
      remote,
      description: description.substring(0, 500),
      requirements: requirements.substring(0, 300),
      benefits: benefits.substring(0, 200),
      datePosted: jsonLd?.datePosted || '',
      crawledAt: new Date().toISOString(),
    }
  } catch (err) {
    console.error(`  ✗ エラー: ${url}`, err)
    return null
  }
}

// ──────────────────────────────────────────
// Google Sheets に書き込み
// ──────────────────────────────────────────

async function getOrCreateSheet() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!

  // ヘッダー行を確認・作成
  const headers = [
    '公開フラグ', 'タイトル', '会社名', '業界', 'ステージ', '職種/ロール',
    '就業形態', '年収Min', '年収Max', '勤務地', 'リモート',
    '説明（抜粋）', '応募要件（抜粋）', '福利厚生', '掲載日', 'クロール日時', '求人URL'
  ]

  const headerRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: '求人リスト!A1:Q1',
  }).catch(() => null)

  if (!headerRes?.data?.values?.length) {
    // シートを作成してヘッダーを書き込む
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: '求人リスト' }
          }
        }]
      }
    }).catch(() => {}) // すでに存在する場合はスキップ

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: '求人リスト!A1:Q1',
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    })
  }

  return sheets
}

async function appendJobsToSheet(jobs: JobData[]) {
  const sheets = await getOrCreateSheet()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!

  // 既存URLを取得して重複チェック
  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: '求人リスト!Q:Q',
  })
  const existingUrls = new Set((existingRes.data.values || []).flat())

  const newJobs = jobs.filter(j => !existingUrls.has(j.url))
  if (newJobs.length === 0) {
    console.log('  → 新しい求人はありません（すべて既存）')
    return 0
  }

  const rows = newJobs.map(j => [
    '',           // 公開フラグ（空欄 = 未確認）
    j.title,
    j.company,
    j.industry,
    j.stage,
    j.roles,
    j.employmentType,
    j.salaryMin,
    j.salaryMax,
    j.location,
    j.remote,
    j.description,
    j.requirements,
    j.benefits,
    j.datePosted,
    j.crawledAt,
    j.url,
  ])

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: '求人リスト!A:Q',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: rows },
  })

  return newJobs.length
}

// ──────────────────────────────────────────
// メイン処理
// ──────────────────────────────────────────

async function main() {
  console.log('🚀 求人クローリング開始')
  console.log(`   対象: ${JOBS_URL}`)
  console.log(`   ページ数: ${MAX_PAGES}`)
  console.log('')

  // Google Sheets 設定チェック
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error('❌ Google Sheets の環境変数が設定されていません。')
    console.error('   .env に以下を追加してください:')
    console.error('   GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@xxx.iam.gserviceaccount.com')
    console.error('   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n..."')
    console.error('   GOOGLE_SHEET_ID=スプレッドシートのID')
    process.exit(1)
  }

  let totalAdded = 0

  for (let page = 1; page <= MAX_PAGES; page++) {
    console.log(`📄 ページ ${page}/${MAX_PAGES} を処理中...`)

    let jobUrls: string[]
    try {
      jobUrls = await getJobUrls(page)
      console.log(`   ${jobUrls.length}件の求人URLを取得`)
    } catch (err) {
      console.error(`   ページ ${page} の取得に失敗:`, err)
      continue
    }

    const pageJobs: JobData[] = []

    for (let i = 0; i < jobUrls.length; i++) {
      const url = jobUrls[i]
      process.stdout.write(`   [${i + 1}/${jobUrls.length}] ${url.split('/').slice(-3, -1).join('/')} ... `)
      await sleep(DELAY_MS)

      const job = await scrapeJobDetail(url)
      if (job) {
        pageJobs.push(job)
        console.log(`✓ ${job.company} / ${job.title.substring(0, 30)}`)
      } else {
        console.log('✗ スキップ')
      }
    }

    // Sheets に一括追記
    if (pageJobs.length > 0) {
      const added = await appendJobsToSheet(pageJobs)
      totalAdded += added
      console.log(`   → ${added}件をシートに追記（重複除外済み）`)
    }

    if (page < MAX_PAGES) {
      console.log(`   次のページまで ${DELAY_MS}ms 待機...\n`)
      await sleep(DELAY_MS)
    }
  }

  console.log('')
  console.log(`✅ クロール完了！ 合計 ${totalAdded}件を Google Sheets に追記しました`)
  console.log(`   シート: https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/`)
}

main().catch(err => {
  console.error('❌ 予期しないエラー:', err)
  process.exit(1)
})
