"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, Download, Filter, MoreHorizontal, Plus, Search, Trash, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function UsersPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const toggleAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((user) => user.id))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. The user will receive an email to set their password.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john.doe@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="course-access" />
                        <label
                          htmlFor="course-access"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Course Access
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="job-access" />
                        <label
                          htmlFor="job-access"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Job Board Access
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="messaging" />
                        <label
                          htmlFor="messaging"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Messaging
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="admin-panel" />
                        <label
                          htmlFor="admin-panel"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Admin Panel
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="w-full pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Checkbox id="filter-role-student" className="mr-2" />
                    <label htmlFor="filter-role-student">Students</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-role-teacher" className="mr-2" />
                    <label htmlFor="filter-role-teacher">Teachers</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-role-employer" className="mr-2" />
                    <label htmlFor="filter-role-employer">Employers</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-role-admin" className="mr-2" />
                    <label htmlFor="filter-role-admin">Admins</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-active" className="mr-2" />
                    <label htmlFor="filter-status-active">Active</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-inactive" className="mr-2" />
                    <label htmlFor="filter-status-inactive">Inactive</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <Button size="sm" className="w-full">
                      Apply Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="newest">
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedUsers.length} selected</span>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <UserCog className="h-4 w-4" />
                Manage Selected
              </Button>
              <Button variant="destructive" size="sm" className="h-8 gap-1">
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage your platform users</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{users.length} total</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onCheckedChange={toggleAllUsers}
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center gap-1">
                      User
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Role
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "Admin"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                            : user.role === "Teacher"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                              : user.role === "Employer"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                                : "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/admin/users/${user.id}`} className="flex w-full items-center">
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          {user.status === "Active" ? (
                            <DropdownMenuItem>Deactivate User</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Activate User</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>100</strong> users
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" disabled>
              ...
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              10
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Teacher",
    status: "Active",
    joinedDate: "Jan 15, 2025",
    lastActive: "Today",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Employer",
    status: "Active",
    joinedDate: "Feb 3, 2025",
    lastActive: "Yesterday",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Teacher",
    status: "Active",
    joinedDate: "Dec 10, 2024",
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Student",
    status: "Active",
    joinedDate: "Mar 5, 2025",
    lastActive: "Today",
  },
  {
    id: "5",
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Student",
    status: "Inactive",
    joinedDate: "Nov 22, 2024",
    lastActive: "2 weeks ago",
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Student",
    status: "Active",
    joinedDate: "Feb 18, 2025",
    lastActive: "Today",
  },
  {
    id: "7",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Employer",
    status: "Active",
    joinedDate: "Jan 30, 2025",
    lastActive: "Yesterday",
  },
  {
    id: "8",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Admin",
    status: "Active",
    joinedDate: "Dec 5, 2024",
    lastActive: "Today",
  },
  {
    id: "9",
    name: "Olivia Thompson",
    email: "olivia.thompson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Student",
    status: "Inactive",
    joinedDate: "Mar 10, 2025",
    lastActive: "1 month ago",
  },
  {
    id: "10",
    name: "James Anderson",
    email: "james.anderson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Teacher",
    status: "Active",
    joinedDate: "Feb 22, 2025",
    lastActive: "2 days ago",
  },
]

