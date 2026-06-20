import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_PATHS = [
  '/login',
  '/auth',
  '/post-auth',
  '/forgot-password',
  '/reset-password',
  '/privacy-policy',
  '/terms-and-conditions',
]

// Archived pages (see archive/pages/) — old links redirect somewhere sensible
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  for (const [prefix, target] of Object.entries(ARCHIVED_REDIRECTS)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return NextResponse.redirect(new URL(target, request.url))
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  if (!user && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
