"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function AdminLayout({
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
                <Link href="/admin" className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">Admin Panel</span>
                </Link>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                <MobileNavigation />
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/admin" className="flex items-center gap-2 md:hidden">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Admin Panel</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="hidden md:flex">
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-4 py-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Admin Panel</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DesktopNavigation />
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@digitallearn.com</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

function DesktopNavigation() {
  const pathname = usePathname()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin/analytics"}>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/users")}>
                <Link href="/admin/users">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/courses")}>
                <Link href="/admin/courses">
                  <BookOpen className="h-4 w-4" />
                  <span>Courses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/jobs")}>
                <Link href="/admin/jobs">
                  <Briefcase className="h-4 w-4" />
                  <span>Jobs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>      
    </>
  )
}

function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="grid gap-2 px-2">
      <Link
        href="/admin"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/admin" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>

      <Link
        href="/admin/analytics"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname === "/admin/analytics" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </Link>

      <div className="my-2 px-3 text-xs font-medium text-muted-foreground">Management</div>

      <Link
        href="/admin/users"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname.startsWith("/admin/users") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <Users className="h-4 w-4" />
        Users
      </Link>

      <Link
        href="/admin/courses"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname.startsWith("/admin/courses") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <BookOpen className="h-4 w-4" />
        Courses
      </Link>

      <Link
        href="/admin/jobs"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
          pathname.startsWith("/admin/jobs") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        <Briefcase className="h-4 w-4" />
        Jobs
      </Link>
      

      <div className="my-2 border-t pt-2"></div>

      <Link href="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
        <LogOut className="h-4 w-4" />
        Log out
      </Link>
    </div>
  )
}

