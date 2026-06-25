import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get('next') ?? '/post-auth'

  // Appwrite handles OAuth redirect automatically via its session cookie.
  // For email verification, the token is validated by the Appwrite SDK on the client.
  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  if (userId && secret) {
    // Email verification confirmation — handled client-side after redirect
    return NextResponse.redirect(`${origin}/verify-email?userId=${userId}&secret=${secret}&next=${next}`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
