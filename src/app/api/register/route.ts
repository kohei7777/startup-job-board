import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

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

    await sql`
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
    `

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.code === '23505') {
      return NextResponse.json({ error: 'このメールアドレスはすでに登録されています' }, { status: 409 })
    }
    console.error(err)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
