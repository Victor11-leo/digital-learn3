'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, User } from "lucide-react"
import { SignedIn,SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <Link href='/'>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">Digital Learn</span>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/courses" className="text-sm font-medium hover:text-primary">
                  Courses
                </Link>
                <Link href="/jobs" className="text-sm font-medium hover:text-primary">
                  Jobs
                </Link>                
              </nav>
              <div className="flex items-center gap-4">
                <SignedIn>
                  <UserButton/>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button><User/> Sign In</Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </header>
  )
}

export default Header