import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value 

  const protectedRoutes = ['/dashboard', '/profile']
  const authRoutes = ['/login', '/signup']

  const { pathname } = request.nextUrl

 
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }


  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Matcher config
export const config = {
  matcher: ['/',
     '/profile',
      '/dashboard',
       '/login',
        '/signup',
        '/verifyEmail'
      ],
}
