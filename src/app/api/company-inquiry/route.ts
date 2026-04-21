import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { company, name, email, phone, position, headcount, message } = body

    if (!company || !name || !email || !position) {
      return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 })
    }

    await sql`
      INSERT INTO "CompanyInquiry" (company, name, email, phone, position, headcount, message, "createdAt")
      VALUES (${company}, ${name}, ${email}, ${phone || null}, ${position}, ${headcount || null}, ${message || null}, NOW())
    `

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
