"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  BookOpen,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="p-4 border-b">
                <Link href="/" className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">Digital Learn</span>
                </Link>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                <MobileNavigation pathname={pathname} />
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Digital Learn</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserButton/>            
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="hidden md:flex">
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-4 py-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Teacher Portal</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DesktopNavigation pathname={pathname} />
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-4">
                <UserButton/>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Sarah Johnson</span>
                  <span className="text-xs text-muted-foreground">Web Development Instructor</span>
                </div>
                
              </div>
            </SidebarFooter>
            <SidebarTrigger />
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/teacher/"}>
                <Link href="/dashboard/teacher/">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Courses</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/courses"}>
                <Link href="/teacher/courses">
                  <BookOpen className="h-4 w-4" />
                  <span>My Courses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/courses/new"}>
                <Link href="/teacher/courses/new">
                  <PlusCircle className="h-4 w-4" />
                  <span>Create Course</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/content"}>
                <Link href="/teacher/content">
                  <FileText className="h-4 w-4" />
                  <span>Content Library</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Students</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/students"}>
                <Link href="/teacher/students">
                  <Users className="h-4 w-4" />
                  <span>Students</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/messages"}>
                <Link href="/teacher/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/profile"}>
                <Link href="/teacher/profile">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/teacher/settings"}>
                <Link href="/teacher/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

function MobileNavigation({ pathname }: { pathname: string }) {
  return (
    <div className="grid gap-2 px-2">
      <Link
        href="/dashboard/teacher/"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/dashboard/teacher/" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>

      <div className="my-2 px-3 text-xs font-medium text-muted-foreground">Courses</div>

      <Link
        href="/teacher/courses"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/courses" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <BookOpen className="h-4 w-4" />
        My Courses
      </Link>

      <Link
        href="/teacher/courses/new"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/courses/new" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <PlusCircle className="h-4 w-4" />
        Create Course
      </Link>

      <Link
        href="/teacher/content"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/content" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <FileText className="h-4 w-4" />
        Content Library
      </Link>

      <div className="my-2 px-3 text-xs font-medium text-muted-foreground">Students</div>

      <Link
        href="/teacher/students"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/students" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <Users className="h-4 w-4" />
        Students
      </Link>

      <Link
        href="/teacher/messages"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/messages" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        Messages
      </Link>

      <div className="my-2 px-3 text-xs font-medium text-muted-foreground">Account</div>

      <Link
        href="/teacher/profile"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/profile" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <User className="h-4 w-4" />
        Profile
      </Link>

      <Link
        href="/teacher/settings"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/teacher/settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>

      <div className="my-2 border-t pt-2"></div>

      <Link href="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
        <LogOut className="h-4 w-4" />
        Log out
      </Link>
    </div>
  )
}

