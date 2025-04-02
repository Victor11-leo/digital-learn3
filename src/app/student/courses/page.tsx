import Link from "next/link"
import { BookOpen, Calendar, CheckCircle, Clock, Filter, Search, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentCoursesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
            <p className="text-muted-foreground">Manage your enrolled courses and learning progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/courses">
              <Button>
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search your courses..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Accessed</SelectItem>
                <SelectItem value="progress">Progress (High to Low)</SelectItem>
                <SelectItem value="progress-asc">Progress (Low to High)</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">More filters</span>
            </Button>
          </div>
        </div>

        {/* Course Categories */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            <div className="grid gap-6">
              {enrolledCourses
                .filter((course) => course.progress > 0 && course.progress < 100)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid gap-6">
              {enrolledCourses
                .filter((course) => course.progress === 100)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="mt-6">
            <div className="grid gap-6">
              {enrolledCourses
                .filter((course) => course.archived)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recommended Courses */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recommended For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <RecommendedCourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/courses">
              <Button variant="outline">Browse All Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Course Image (only on larger screens) */}
          <div className="hidden md:block w-48 h-auto overflow-hidden">
            <img
              src={course.image || "/placeholder.svg?height=180&width=180"}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Course Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {/* Course Image (only on mobile) */}
                  <div className="block md:hidden w-12 h-12 rounded overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg?height=48&width=48"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{course.instructor}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="ml-1">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {course.lessonsCompleted}/{course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Last accessed: {course.lastAccessed}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start md:items-end">
                <Badge variant={getBadgeVariant(course.progress)}>{getStatusText(course.progress)}</Badge>
                <div className="flex gap-2 mt-auto">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Complete
                  </Button>
                  <Link href={`/learn/${course.id}`}>
                    <Button size="sm">Continue</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RecommendedCourseCard({ course }: { course: any }) {
  return (
    <Card>
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={course.image || "/placeholder.svg?height=180&width=320"}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
            <AvatarFallback>{course.instructor[0]}</AvatarFallback>
          </Avatar>
          {course.instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= course.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({course.reviews})</span>
          </div>
          <span className="font-bold">${course.price}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{course.lessons} lessons</span>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Enroll Now</Button>
      </CardFooter>
    </Card>
  )
}

// Helper functions
function getBadgeVariant(progress: number) {
  if (progress === 0) return "outline"
  if (progress === 100) return "default"
  if (progress > 75) return "secondary"
  return "secondary"
}

function getStatusText(progress: number) {
  if (progress === 0) return "Not Started"
  if (progress === 100) return "Completed"
  if (progress > 75) return "Almost Complete"
  if (progress > 25) return "In Progress"
  return "Just Started"
}

// Sample data
const enrolledCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=180&width=180",
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
    duration: "10 hours",
    lastAccessed: "Today",
    rating: 4.8,
    archived: false,
  },
  {
    id: 2,
    title: "Data Science Essentials",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=180&width=180",
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
    duration: "15 hours",
    lastAccessed: "Yesterday",
    rating: 4.7,
    archived: false,
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    instructor: "Emily Rodriguez",
    image: "/placeholder.svg?height=180&width=180",
    progress: 90,
    lessonsCompleted: 18,
    totalLessons: 20,
    duration: "8 hours",
    lastAccessed: "2 days ago",
    rating: 4.9,
    archived: false,
  },
  {
    id: 4,
    title: "Mobile App Development",
    instructor: "David Kim",
    image: "/placeholder.svg?height=180&width=180",
    progress: 20,
    lessonsCompleted: 4,
    totalLessons: 20,
    duration: "12 hours",
    lastAccessed: "1 week ago",
    rating: 4.6,
    archived: false,
  },
  {
    id: 5,
    title: "Introduction to Python Programming",
    instructor: "James Wilson",
    image: "/placeholder.svg?height=180&width=180",
    progress: 100,
    lessonsCompleted: 25,
    totalLessons: 25,
    duration: "14 hours",
    lastAccessed: "1 month ago",
    rating: 4.8,
    archived: false,
  },
  {
    id: 6,
    title: "Digital Marketing Fundamentals",
    instructor: "Jessica Martinez",
    image: "/placeholder.svg?height=180&width=180",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 15,
    duration: "6 hours",
    lastAccessed: "Never",
    rating: 4.5,
    archived: false,
  },
  {
    id: 7,
    title: "Photography Basics",
    instructor: "Robert Taylor",
    image: "/placeholder.svg?height=180&width=180",
    progress: 60,
    lessonsCompleted: 6,
    totalLessons: 10,
    duration: "5 hours",
    lastAccessed: "3 days ago",
    rating: 4.7,
    archived: true,
  },
]

const recommendedCourses = [
  {
    id: 101,
    title: "Advanced React Patterns",
    instructor: "David Lee",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=180&width=320",
    rating: 4.8,
    reviews: 342,
    price: 49.99,
    lessons: 42,
    duration: "10 hours",
  },
  {
    id: 102,
    title: "Node.js Backend Development",
    instructor: "Maria Garcia",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=180&width=320",
    rating: 4.7,
    reviews: 256,
    price: 59.99,
    lessons: 38,
    duration: "12 hours",
  },
  {
    id: 103,
    title: "Full Stack Project: E-Commerce",
    instructor: "James Wilson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=180&width=320",
    rating: 4.9,
    reviews: 189,
    price: 69.99,
    lessons: 55,
    duration: "15 hours",
  },
]

