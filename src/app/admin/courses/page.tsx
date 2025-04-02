"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  BookOpen,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
} from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"

export default function CoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const toggleCourseSelection = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  const toggleAllCourses = () => {
    if (selectedCourses.length === courses.length) {
      setSelectedCourses([])
    } else {
      setSelectedCourses(courses.map((course) => course.id))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Link href="/admin/courses/new">
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
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
                    <Checkbox id="filter-category-dev" className="mr-2" />
                    <label htmlFor="filter-category-dev">Development</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-category-design" className="mr-2" />
                    <label htmlFor="filter-category-design">Design</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-category-business" className="mr-2" />
                    <label htmlFor="filter-category-business">Business</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-published" className="mr-2" />
                    <label htmlFor="filter-status-published">Published</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-draft" className="mr-2" />
                    <label htmlFor="filter-status-draft">Draft</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-review" className="mr-2" />
                    <label htmlFor="filter-status-review">Under Review</label>
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
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCourses.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedCourses.length} selected</span>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <BookOpen className="h-4 w-4" />
                Publish Selected
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
                <CardTitle>All Courses</CardTitle>
                <CardDescription>Manage your platform courses</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{courses.length} total</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedCourses.length === courses.length && courses.length > 0}
                      onCheckedChange={toggleAllCourses}
                    />
                  </TableHead>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center gap-1">
                      Course
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Instructor</div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={() => toggleCourseSelection(course.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 overflow-hidden rounded">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-xs text-muted-foreground">Created {course.createdDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                          <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{course.instructor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          course.status === "Published"
                            ? "success"
                            : course.status === "Draft"
                              ? "secondary"
                              : "warning"
                        }
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${course.price}</TableCell>
                    <TableCell>{course.enrollments}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= course.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span>{course.rating}</span>
                      </div>
                    </TableCell>
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
                            <Link href={`/admin/courses/${course.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/admin/courses/${course.id}/edit`} className="flex w-full items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {course.status !== "Published" && (
                            <DropdownMenuItem>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Publish Course
                            </DropdownMenuItem>
                          )}
                          {course.status === "Published" && <DropdownMenuItem>Unpublish Course</DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Course
                          </DropdownMenuItem>
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
            Showing <strong>1-10</strong> of <strong>50</strong> courses
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" disabled>
              ...
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              5
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
const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Development",
    status: "Published",
    price: 49.99,
    enrollments: 1245,
    rating: 4.8,
    createdDate: "Jan 15, 2025",
  },
  {
    id: "2",
    title: "Data Science Essentials",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Michael Chen",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Data Science",
    status: "Published",
    price: 59.99,
    enrollments: 876,
    rating: 4.7,
    createdDate: "Feb 3, 2025",
  },
  {
    id: "3",
    title: "UX/UI Design Principles",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Design",
    status: "Under Review",
    price: 39.99,
    enrollments: 0,
    rating: 0,
    createdDate: "Mar 10, 2025",
  },
  {
    id: "4",
    title: "Advanced React Development",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "David Kim",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Development",
    status: "Draft",
    price: 69.99,
    enrollments: 0,
    rating: 0,
    createdDate: "Mar 5, 2025",
  },
  {
    id: "5",
    title: "Digital Marketing Fundamentals",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Jessica Martinez",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Business",
    status: "Published",
    price: 44.99,
    enrollments: 532,
    rating: 4.5,
    createdDate: "Jan 22, 2025",
  },
  {
    id: "6",
    title: "Mobile App Design",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Design",
    status: "Published",
    price: 54.99,
    enrollments: 421,
    rating: 4.8,
    createdDate: "Feb 18, 2025",
  },
  {
    id: "7",
    title: "Business Analytics",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Robert Wilson",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Business",
    status: "Published",
    price: 64.99,
    enrollments: 345,
    rating: 4.7,
    createdDate: "Dec 10, 2024",
  },
  {
    id: "8",
    title: "Full-Stack JavaScript Development",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Sophia Lee",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Development",
    status: "Under Review",
    price: 79.99,
    enrollments: 0,
    rating: 0,
    createdDate: "Mar 8, 2025",
  },
  {
    id: "9",
    title: "Graphic Design for Beginners",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Marcus Johnson",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Design",
    status: "Published",
    price: 34.99,
    enrollments: 678,
    rating: 4.6,
    createdDate: "Jan 30, 2025",
  },
  {
    id: "10",
    title: "Python Programming Masterclass",
    image: "/placeholder.svg?height=40&width=80",
    instructor: "Olivia Thompson",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    category: "Development",
    status: "Draft",
    price: 49.99,
    enrollments: 0,
    rating: 0,
    createdDate: "Mar 12, 2025",
  },
]

