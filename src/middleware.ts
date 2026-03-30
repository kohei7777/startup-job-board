import { NextRequest, NextResponse } from 'next/server'

const BASIC_AUTH_USER = 'admin'
const BASIC_AUTH_PASS = 'keyplayers2026'

export function middleware(req: NextRequest) {
  // Basic認証チェック
  const authHeader = req.headers.get('authorization')

  if (authHeader) {
    const encoded = authHeader.replace('Basic ', '')
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
    const [user, pass] = decoded.split(':')

    if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
      return NextResponse.next()
    }
  }

  // 認証失敗 → ダイアログを表示
  return new NextResponse('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="KEYPLAYERS DIRECT"',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
