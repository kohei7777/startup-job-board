import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { company, name, email, phone, position, headcount, message } = body

    if (!company || !name || !email || !position) {
      return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 })
    }

    const { error } = await supabase.from('CompanyInquiry').insert([
      {
        company,
        name,
        email,
        phone: phone || null,
        position,
        headcount: headcount || null,
        message: message || null,
        createdAt: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'DB保存に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
