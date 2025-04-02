"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container flex h-screen  flex-col items-center justify-center p-2">      

      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[400px]">
        <div className="flex flex-col space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Creating an account</h1>
          <p className="text-sm text-muted-foreground">Sign up to start your learning journey</p>
        </div>
          
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Choose your role</CardTitle>
                  <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                                    
                  <form onSubmit={handleSignup}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" type="text" placeholder="John" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" type="text" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Role</Label>
                        <div className="relative">
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="employer">Employer</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                        <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                            privacy policy
                          </Link>
                        </label>
                      </div>

                      <Button disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account
                          </>
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </Card>          
          
      </div>
    </div>
  )
}

