import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { Resend } from 'resend'
import { appendCandidateToSheet } from '@/lib/sheets'

const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFY_EMAIL = 'shimizu@keyplayers.jp'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'
const SITE_URL = 'https://direct.keyplayers.jp'

function formatSalary(val: string | number | null | undefined): string {
  if (!val) return '未入力'
  return `${val}万円`
}

function formatValue(val: string | null | undefined, fallback = '未入力'): string {
  return val || fallback
}

async function sendConfirmationEmail(to: string, name: string, desiredPosition: string) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: '【キープレイヤーズダイレクト】スカウト登録を受け付けました',
    html: `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:'Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3',Meiryo,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#a855f7);padding:32px 40px;text-align:center;">
            <div style="color:#ffffff;font-size:13px;letter-spacing:2px;font-weight:600;">KEY PLAYERS | DIRECT</div>
            <div style="color:#e9d5ff;font-size:12px;margin-top:6px;">スタートアップ幹部転職プラットフォーム</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 24px;font-size:16px;color:#1a1a2e;font-weight:600;">${name} 様</p>
            <p style="margin:0 0 16px;font-size:14px;color:#4b5563;line-height:1.8;">
              このたびは、キープレイヤーズダイレクトへのスカウト登録をいただき、誠にありがとうございます。
            </p>
            <p style="margin:0 0 32px;font-size:14px;color:#4b5563;line-height:1.8;">
              ご登録内容を確認の上、<strong>${desiredPosition}</strong>のポジションへご紹介できる企業がございましたら、担当者より直接ご連絡いたします。
            </p>
            <!-- Info box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border-radius:8px;margin-bottom:32px;">
              <tr><td style="padding:20px 24px;">
                <div style="font-size:12px;font-weight:700;color:#7c3aed;letter-spacing:1px;margin-bottom:12px;">ご登録情報</div>
                <div style="font-size:13px;color:#374151;line-height:2;">
                  ご希望ポジション：<strong>${desiredPosition}</strong>
                </div>
              </td></tr>
            </table>
            <p style="margin:0 0 8px;font-size:13px;color:#6b7280;line-height:1.8;">
              ご不明な点がございましたら、下記よりお問い合わせください。
            </p>
            <p style="margin:0 0 32px;font-size:13px;">
              <a href="${SITE_URL}" style="color:#7c3aed;text-decoration:none;">${SITE_URL}</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f3f4f6;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">© 2024 KEYPLAYERS DIRECT. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  })
}

async function sendNotificationEmail(data: {
  name: string
  email: string
  currentCompany?: string
  currentTitle?: string
  desiredPosition: string
  industry?: string
  experience?: string
  salaryMin?: string
  salaryDesired?: string
  skills?: string
  timing?: string
  message?: string
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject: `【新規スカウト登録】${data.name}（${data.desiredPosition}）`,
    html: `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:'Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3',Meiryo,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#a855f7);padding:28px 40px;">
            <div style="color:#ffffff;font-size:15px;font-weight:700;">新規スカウト登録通知</div>
            <div style="color:#e9d5ff;font-size:12px;margin-top:4px;">KEY PLAYERS DIRECT</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px;font-size:14px;color:#374151;">新規スカウト登録がありました。以下の内容をご確認ください。</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${[
                ['お名前', data.name],
                ['メールアドレス', data.email],
                ['現職会社', formatValue(data.currentCompany)],
                ['現職タイトル', formatValue(data.currentTitle)],
                ['希望ポジション', data.desiredPosition],
                ['希望業界', formatValue(data.industry)],
                ['経験年数', formatValue(data.experience)],
                ['希望年収（最低）', formatSalary(data.salaryMin)],
                ['希望年収', formatSalary(data.salaryDesired)],
                ['スキル・専門領域', formatValue(data.skills)],
                ['転職時期', formatValue(data.timing)],
                ['メッセージ', formatValue(data.message)],
              ].map(([label, value], i) => `
              <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#ffffff'};">
                <td style="padding:10px 14px;font-size:12px;color:#6b7280;font-weight:600;width:140px;white-space:nowrap;">${label}</td>
                <td style="padding:10px 14px;font-size:13px;color:#111827;">${value}</td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f3f4f6;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">KEYPLAYERS DIRECT 管理通知メール</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, currentCompany, currentTitle,
      desiredPosition, industry, experience,
      salaryMin, salaryDesired, skills, timing, message,
    } = body

    if (!name || !email || !desiredPosition) {
      return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 })
    }

    const inserted = await sql`
      INSERT INTO "Candidate" (
        name, email, "currentCompany", "currentTitle",
        "desiredPosition", industry, experience,
        "salaryMin", "salaryDesired", skills, timing, message,
        status, "createdAt"
      ) VALUES (
        ${name}, ${email}, ${currentCompany || null}, ${currentTitle || null},
        ${desiredPosition}, ${industry || null}, ${experience || null},
        ${salaryMin ? parseInt(salaryMin) : null}, ${salaryDesired ? parseInt(salaryDesired) : null},
        ${skills || null}, ${timing || null}, ${message || null},
        'pending', NOW()
      )
      RETURNING id
    `
    const candidateId = inserted[0]?.id as number

    // メール送信 & Sheets同期（失敗しても登録は成功扱い）
    const tasks: Promise<any>[] = []
    if (process.env.RESEND_API_KEY) {
      tasks.push(
        sendConfirmationEmail(email, name, desiredPosition),
        sendNotificationEmail({ name, email, currentCompany, currentTitle, desiredPosition, industry, experience, salaryMin, salaryDesired, skills, timing, message }),
      )
    }
    tasks.push(
      appendCandidateToSheet({
        id: candidateId, name, email, currentCompany, currentTitle,
        desiredPosition, industry, experience,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryDesired: salaryDesired ? parseInt(salaryDesired) : null,
        skills, timing, message,
      }),
    )
    await Promise.allSettled(tasks)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.code === '23505') {
      return NextResponse.json({ error: 'このメールアドレスはすでに登録されています' }, { status: 409 })
    }
    console.error(err)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
