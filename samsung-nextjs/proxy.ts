import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  console.log('proxy pathname:', request.nextUrl.pathname)
  return NextResponse.next()
}

export const config = {
  matcher: ['/movies/:path*']
}
