import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'


const isOnboardingRoute = createRouteMatcher(['/auth'])
const isPrivateRoute = createRouteMatcher([
  '/teacher(.*)',
  '/admin(.*)',
  '/student(.*)',
  '/employer(.*)',
])

export default clerkMiddleware( async (auth,req:NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next()
  }

  if (!userId && isPrivateRoute(req)) return redirectToSignIn({ returnBackUrl: req.url })

  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  if (userId && isPrivateRoute(req)) return NextResponse.next()

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}