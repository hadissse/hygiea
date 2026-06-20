import { NextResponse, type NextRequest } from 'next/server'

const ARCHIVED_REDIRECTS: Record<string, string> = {
  '/self/wheel': '/self',
  '/self/positions': '/self',
  '/self/planetary-speed': '/self',
  '/quiz': '/today',
  '/evening': '/today',
  '/library': '/today',
  '/traits': '/self',
  '/journey-1': '/today',
  '/journey-lunar': '/today',
  '/explore/calendar': '/explore',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  for (const [prefix, target] of Object.entries(ARCHIVED_REDIRECTS)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return NextResponse.redirect(new URL(target, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
