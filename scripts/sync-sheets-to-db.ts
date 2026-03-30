/**
 * Google Sheets → Supabase DB 同期スクリプト
 * 
 * 使い方:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/sync-sheets-to-db.ts
 *
 * 動作:
 *   Google Sheets の「公開フラグ」列が「✅」または「true」の行のみ DB に同期します
 *   既に同期済みの求人はスキップ（URLで重複チェック）します
 */

import * as dotenv from 'dotenv'
dotenv.config()

import { google } from 'googleapis'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// ──────────────────────────────────────────
// Prisma クライアント
// ──────────────────────────────────────────

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

// ──────────────────────────────────────────
// Google Sheets から承認済み求人を取得
// ──────────────────────────────────────────

interface SheetRow {
  publishFlag: string
  title: string
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
  url: string
}

async function getApprovedJobs(): Promise<SheetRow[]> {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: '求人リスト!A2:Q',
  })

  const rows = res.data.values || []
  const approved: SheetRow[] = []

  for (const row of rows) {
    const flag = (row[0] || '').toString().trim()
    // ✅ TRUE true ○ ◎ などを公開フラグとして認識
    if (flag === '✅' || flag.toLowerCase() === 'true' || flag === '○' || flag === '◎' || flag === '1') {
      approved.push({
        publishFlag: flag,
        title: row[1] || '',
        company: row[2] || '',
        industry: row[3] || '',
        stage: row[4] || '',
        roles: row[5] || '',
        employmentType: row[6] || '',
        salaryMin: row[7] || '',
        salaryMax: row[8] || '',
        location: row[9] || '',
        remote: row[10] || '',
        description: row[11] || '',
        requirements: row[12] || '',
        benefits: row[13] || '',
        datePosted: row[14] || '',
        crawledAt: row[15] || '',
        url: row[16] || '',
      })
    }
  }

  return approved
}

// ──────────────────────────────────────────
// 年収文字列をパース (例: "450万円" → 450)
// ──────────────────────────────────────────

function parseSalary(text: string): number {
  const match = text.match(/(\d+(?:,\d+)?)/)
  if (!match) return 0
  return parseInt(match[1].replace(',', ''))
}

// ──────────────────────────────────────────
// ステージをDBの形式に変換
// ──────────────────────────────────────────

function normalizeStage(stage: string): string {
  if (stage.includes('シード') || stage.includes('アーリー')) return 'シード'
  if (stage.includes('シリーズA')) return 'シリーズA'
  if (stage.includes('シリーズB')) return 'シリーズB'
  if (stage.includes('シリーズC')) return 'シリーズC'
  if (stage.includes('上場')) return '上場準備中'
  return stage || 'シード'
}

// ──────────────────────────────────────────
// 職種をDBの形式に変換
// ──────────────────────────────────────────

function normalizeJobType(roles: string): string {
  if (roles.includes('エンジニア') || roles.includes('開発') || roles.includes('技術')) return 'エンジニア'
  if (roles.includes('デザイン') || roles.includes('UX') || roles.includes('UI')) return 'デザイナー'
  if (roles.includes('PM') || roles.includes('プロダクトマネ')) return 'PM'
  if (roles.includes('マーケティング') || roles.includes('マーケ')) return 'マーケティング'
  if (roles.includes('営業') || roles.includes('CS') || roles.includes('カスタマー') || roles.includes('ビジネス')) return 'ビジネス'
  return 'ビジネス'
}

// ──────────────────────────────────────────
// メイン処理
// ──────────────────────────────────────────

async function main() {
  console.log('🔄 Google Sheets → DB 同期開始')
  console.log('')

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SHEET_ID) {
    console.error('❌ Google Sheets の環境変数が設定されていません')
    process.exit(1)
  }

  // 公開フラグ付きの求人を取得
  console.log('📊 Google Sheets から承認済み求人を取得中...')
  const approved = await getApprovedJobs()
  console.log(`   ${approved.length}件の承認済み求人が見つかりました\n`)

  if (approved.length === 0) {
    console.log('   シートの「公開フラグ」列に ✅ を入力してから再実行してください')
    return
  }

  let added = 0, skipped = 0, errors = 0

  for (const row of approved) {
    try {
      // URL でタイトルをチェック（重複防止）
      const exists = await prisma.job.findFirst({
        where: { title: row.title, company: row.company }
      })

      if (exists) {
        skipped++
        continue
      }

      // タグを生成
      const tags: string[] = []
      const jobType = normalizeJobType(row.roles)
      tags.push(jobType)
      if (row.industry) tags.push(row.industry.split('/')[0].trim())
      if (row.remote.includes('リモート')) tags.push('リモート可')

      await prisma.job.create({
        data: {
          title: row.title || '（タイトルなし）',
          company: row.company || '（会社名なし）',
          stage: normalizeStage(row.stage),
          featured: false,
          description: row.description || '',
          tags: tags.join(','),
          salaryMin: parseSalary(row.salaryMin),
          salaryMax: parseSalary(row.salaryMax) || parseSalary(row.salaryMin),
          location: row.location || '東京都',
          employees: '-',
          founded: '-',
          requirements: row.requirements || '',
          benefits: row.benefits || '',
          industry: row.industry.split('/')[0].trim() || 'その他',
          jobType,
        }
      })

      added++
      console.log(`   ✅ 追加: ${row.company} / ${row.title.substring(0, 40)}`)
    } catch (err) {
      errors++
      console.error(`   ✗ エラー: ${row.title}`, err)
    }
  }

  console.log('')
  console.log(`✅ 同期完了！`)
  console.log(`   追加: ${added}件 / スキップ（重複）: ${skipped}件 / エラー: ${errors}件`)

  await prisma.$disconnect()
}

main().catch(err => {
  console.error('❌ 予期しないエラー:', err)
  prisma.$disconnect()
  process.exit(1)
})
