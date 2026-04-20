import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    const { error } = await supabase.from('Candidate').insert([{
      name,
      email,
      currentCompany: currentCompany || null,
      currentTitle: currentTitle || null,
      desiredPosition,
      industry: industry || null,
      experience: experience || null,
      salaryMin: salaryMin ? parseInt(salaryMin) : null,
      salaryDesired: salaryDesired ? parseInt(salaryDesired) : null,
      skills: skills || null,
      timing: timing || null,
      message: message || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }])

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'このメールアドレスはすでに登録されています' }, { status: 409 })
      }
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'DB保存に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
