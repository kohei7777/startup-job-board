import * as dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis'

async function main() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!

  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const existing = (meta.data.sheets || []).map(s => s.properties?.title)
  console.log('既存タブ:', existing)

  const requests: any[] = []
  if (!existing.includes('スカウト登録')) requests.push({ addSheet: { properties: { title: 'スカウト登録' } } })
  if (!existing.includes('企業問い合わせ')) requests.push({ addSheet: { properties: { title: '企業問い合わせ' } } })

  if (requests.length > 0) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } })
    console.log('タブ追加完了')
  }

  // ヘッダー行をセット
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'スカウト登録!A1:N1',
    valueInputOption: 'RAW',
    requestBody: { values: [[
      'ID','登録日時','名前','メールアドレス','現職会社','現職タイトル','希望ポジション','業界','経験年数','希望年収(最低)','希望年収','スキル','転職時期','メッセージ'
    ]] },
  })
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: '企業問い合わせ!A1:I1',
    valueInputOption: 'RAW',
    requestBody: { values: [[
      'ID','登録日時','会社名','担当者名','メールアドレス','電話','募集ポジション','従業員数','メッセージ'
    ]] },
  })
  console.log('ヘッダー行セット完了')
}

main().catch(e => { console.error(e); process.exit(1) })
