"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Eye, MoreHorizontal, Plus, Search, Settings, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TeacherCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter courses based on search query, status, and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
          <Link href="/dashboard/teacher/courses/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
            </div>
          </div>

          <TabsContent value="grid" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg?height=200&width=400"}
                      alt={course.title}
                      className="object-cover w-full h-full transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          course.status === "published"
                            ? "success"
                            : course.status === "draft"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/dashboard/teacher/courses/${course.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/teacher/courses/${course.id}/edit`}
                              className="flex w-full items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/teacher/courses/${course.id}/settings`}
                              className="flex w-full items-center"
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Course Settings
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Course
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete the course and remove all
                                  associated data.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive">Delete Course</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="line-clamp-1 mt-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.students} students</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${star <= course.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-muted-foreground">({course.reviewCount})</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm">
                      <span className="font-medium">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-muted-foreground line-through ml-2">${course.originalPrice}</span>
                      )}
                    </div>
                    <Link href={`/dashboard/teacher/courses/${course.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}

              {/* Create Course Card */}
              <Link href="/dashboard/teacher/courses/new">
                <Card className="flex flex-col items-center justify-center h-full min-h-[350px] border-dashed hover:border-primary hover:bg-muted/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Plus className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="mt-4 text-xl font-medium">Create New Course</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      Start building a new course for your students
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                    <div className="col-span-5">Course</div>
                    <div className="col-span-2 text-center">Students</div>
                    <div className="col-span-2 text-center">Rating</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 overflow-hidden rounded">
                            <img
                              src={course.image || "/placeholder.svg?height=40&width=80"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{course.title}</span>
                            <span className="text-xs text-muted-foreground">{course.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">{course.students}</div>
                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{course.rating}</span>
                          <svg
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-xs text-muted-foreground">({course.reviewCount})</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <Badge
                          variant={
                            course.status === "published"
                              ? "success"
                              : course.status === "draft"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link
                                href={`/dashboard/teacher/courses/${course.id}`}
                                className="flex w-full items-center"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Course
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                href={`/dashboard/teacher/courses/${course.id}/edit`}
                                className="flex w-full items-center"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Course
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                href={`/dashboard/teacher/courses/${course.id}/settings`}
                                className="flex w-full items-center"
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                Course Settings
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete Course
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will permanently delete the course and remove all
                                    associated data.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button variant="destructive">Delete Course</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Sample data
const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    status: "published",
    students: 425,
    rating: 4.8,
    reviewCount: 342,
    price: 49.99,
    originalPrice: 99.99,
  },
  {
    id: 2,
    title: "Advanced React Development",
    description: "Take your React skills to the next level with advanced patterns and techniques.",
    image: "/placeholder.svg?height=200&width=400",
    category: "React",
    status: "published",
    students: 312,
    rating: 4.9,
    reviewCount: 215,
    price: 69.99,
    originalPrice: 149.99,
  },
  {
    id: 3,
    title: "JavaScript for Beginners",
    description: "A comprehensive introduction to JavaScript programming language.",
    image: "/placeholder.svg?height=200&width=400",
    category: "JavaScript",
    status: "published",
    students: 287,
    rating: 4.7,
    reviewCount: 178,
    price: 39.99,
    originalPrice: 89.99,
  },
  {
    id: 4,
    title: "Responsive Web Design",
    description: "Learn to create websites that look great on any device.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    status: "published",
    students: 156,
    rating: 4.6,
    reviewCount: 132,
    price: 44.99,
    originalPrice: 99.99,
  },
  {
    id: 5,
    title: "Full-Stack Development with Node.js",
    description: "Build complete web applications with JavaScript, Node.js, and MongoDB.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    status: "draft",
    students: 0,
    rating: 0,
    reviewCount: 0,
    price: 79.99,
    originalPrice: 169.99,
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and user experience design.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    status: "draft",
    students: 0,
    rating: 0,
    reviewCount: 0,
    price: 54.99,
    originalPrice: 119.99,
  },
  {
    id: 7,
    title: "React Native for Mobile Apps",
    description: "Learn to build native mobile apps for iOS and Android using React Native.",
    image: "/placeholder.svg?height=200&width=400",
    category: "React",
    status: "archived",
    students: 89,
    rating: 4.2,
    reviewCount: 45,
    price: 59.99,
    originalPrice: 129.99,
  },
]

