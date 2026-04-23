import { google } from 'googleapis'

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

function fmt(dt: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`
}

export async function appendCandidateToSheet(data: {
  id: number
  name: string
  email: string
  currentCompany?: string | null
  currentTitle?: string | null
  desiredPosition: string
  industry?: string | null
  experience?: string | null
  salaryMin?: number | null
  salaryDesired?: number | null
  skills?: string | null
  timing?: string | null
  message?: string | null
}) {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) return

  const sheets = google.sheets({ version: 'v4', auth: getAuth() })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'スカウト登録!A:N',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.id,
        fmt(new Date()),
        data.name,
        data.email,
        data.currentCompany || '',
        data.currentTitle || '',
        data.desiredPosition,
        data.industry || '',
        data.experience || '',
        data.salaryMin ?? '',
        data.salaryDesired ?? '',
        data.skills || '',
        data.timing || '',
        data.message || '',
      ]],
    },
  })
}

export async function appendCompanyInquiryToSheet(data: {
  id: number
  company: string
  name: string
  email: string
  phone?: string | null
  position: string
  headcount?: string | null
  message?: string | null
}) {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) return

  const sheets = google.sheets({ version: 'v4', auth: getAuth() })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: '企業問い合わせ!A:I',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.id,
        fmt(new Date()),
        data.company,
        data.name,
        data.email,
        data.phone || '',
        data.position,
        data.headcount || '',
        data.message || '',
      ]],
    },
  })
}
