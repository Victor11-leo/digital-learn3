import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  LineChart,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              March 2025
            </Button>
          </div>
        </div>

        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Welcome back, Alex!</h3>
                <p className="text-muted-foreground">
                  You've completed 68% of your current courses. Keep up the good work!
                </p>
              </div>
              <Button>
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Score Avg.</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-7">
          {/* Current Courses */}
          <Card className="col-span-7 md:col-span-4">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Your enrolled courses and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg?height=40&width=40"}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">{course.instructor}</p>
                      </div>
                    </div>
                    <Badge variant={course.status === "In Progress" ? "default" : "outline"}>{course.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>
                        {course.lessonsCompleted}/{course.totalLessons} lessons
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/student/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Learning Path & Achievements */}
          <Card className="col-span-7 md:col-span-3">
            <Tabs defaultValue="path">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Journey</CardTitle>
                  <TabsList>
                    <TabsTrigger value="path">Path</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>

              <TabsContent value="path" className="space-y-0">
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    {learningPath.map((step, index) => (
                      <div key={index} className="relative">
                        {/* Connector Line */}
                        {index < learningPath.length - 1 && (
                          <div className="absolute top-7 left-4 h-full w-0.5 bg-muted-foreground/20" />
                        )}

                        <div className="flex gap-4">
                          <div
                            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                              step.completed
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            }`}
                          >
                            {step.completed ? <CheckCircle className="h-4 w-4" /> : <span>{index + 1}</span>}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium leading-none">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {step.courses && (
                              <div className="pt-2">
                                {step.courses.map((course, courseIndex) => (
                                  <div key={courseIndex} className="flex items-center gap-2 text-sm py-1">
                                    <div
                                      className={`h-2 w-2 rounded-full ${
                                        course.completed ? "bg-primary" : "bg-muted-foreground/30"
                                      }`}
                                    />
                                    <span className={course.completed ? "line-through text-muted-foreground" : ""}>
                                      {course.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {step.button && (
                              <div className="pt-2">
                                <Button variant="outline" size="sm">
                                  {step.button}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-0">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                          achievement.unlocked ? "bg-primary/5" : "bg-muted/50 opacity-70"
                        }`}
                      >
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 ${
                            achievement.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <achievement.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-medium text-center">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground text-center mt-1">{achievement.description}</p>
                        {achievement.unlocked && (
                          <Badge variant="outline" className="mt-2">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Upcoming Deadlines & Recommended Courses */}
        <div className="grid gap-4 md:grid-cols-7">
          {/* Upcoming Deadlines */}
          <Card className="col-span-7 md:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <deadline.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.course}</p>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{deadline.dueDate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardFooter>
          </Card>

          {/* Recommended Courses */}
          <Card className="col-span-7 md:col-span-4">
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
              <CardDescription>Based on your interests and learning history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="border shadow-none">
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={course.image || "/placeholder.svg?height=120&width=240"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription className="text-xs">{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center text-sm">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= course.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs">({course.reviews})</span>
                        <span className="ml-auto font-medium">${course.price}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        View Course
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/courses" className="w-full">
                <Button variant="outline" className="w-full">
                  Explore More Courses
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Career Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Career Resources</CardTitle>
            <CardDescription>Tools and resources to help advance your career</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Job Matching</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Find job opportunities that match your skills and courses.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/student/jobs">
                    <Button variant="outline" size="sm">
                      Browse Jobs
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Resume Builder</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Create a professional resume highlighting your skills and certifications.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/student/resume">
                    <Button variant="outline" size="sm">
                      Build Resume
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Career Counseling</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Schedule a session with a career advisor for personalized guidance.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/student/counseling">
                    <Button variant="outline" size="sm">
                      Book Session
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Sample data
const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=40&width=40",
    progress: 75,
    status: "In Progress",
    lastAccessed: "Today",
    lessonsCompleted: 15,
    totalLessons: 20,
  },
  {
    id: 2,
    title: "Data Science Essentials",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=40&width=40",
    progress: 45,
    status: "In Progress",
    lastAccessed: "Yesterday",
    lessonsCompleted: 9,
    totalLessons: 20,
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    instructor: "Emily Rodriguez",
    image: "/placeholder.svg?height=40&width=40",
    progress: 90,
    status: "Almost Complete",
    lastAccessed: "2 days ago",
    lessonsCompleted: 18,
    totalLessons: 20,
  },
  {
    id: 4,
    title: "Mobile App Development",
    instructor: "David Kim",
    image: "/placeholder.svg?height=40&width=40",
    progress: 20,
    status: "Just Started",
    lastAccessed: "1 week ago",
    lessonsCompleted: 4,
    totalLessons: 20,
  },
]

const learningPath = [
  {
    title: "Web Development Foundations",
    description: "Master the basics of web development",
    completed: true,
    courses: [
      { title: "HTML & CSS Basics", completed: true },
      { title: "JavaScript Fundamentals", completed: true },
      { title: "Responsive Web Design", completed: true },
    ],
  },
  {
    title: "Frontend Development",
    description: "Learn modern frontend frameworks",
    completed: false,
    courses: [
      { title: "React Fundamentals", completed: true },
      { title: "State Management", completed: false },
      { title: "Frontend Testing", completed: false },
    ],
  },
  {
    title: "Backend Development",
    description: "Build server-side applications",
    completed: false,
    button: "Start This Path",
  },
  {
    title: "Full Stack Mastery",
    description: "Combine frontend and backend skills",
    completed: false,
    button: "Locked",
  },
]

const achievements = [
  {
    title: "Fast Learner",
    description: "Complete 5 lessons in one day",
    icon: TrendingUp,
    unlocked: true,
  },
  {
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: Award,
    unlocked: true,
  },
  {
    title: "Course Master",
    description: "Complete an entire course",
    icon: GraduationCap,
    unlocked: false,
  },
  {
    title: "Dedication",
    description: "30-day learning streak",
    icon: Trophy,
    unlocked: false,
  },
]

const deadlines = [
  {
    id: 1,
    title: "Final Project Submission",
    course: "Web Development Fundamentals",
    dueDate: "May 15",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Quiz: Data Visualization",
    course: "Data Science Essentials",
    dueDate: "May 18",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "Design Critique Session",
    course: "UX/UI Design Principles",
    dueDate: "May 20",
    icon: Clock,
  },
]

const recommendedCourses = [
  {
    id: 101,
    title: "Advanced React Patterns",
    instructor: "David Lee",
    image: "/placeholder.svg?height=120&width=240",
    rating: 4.8,
    reviews: 342,
    price: 49.99,
  },
  {
    id: 102,
    title: "Node.js Backend Development",
    instructor: "Maria Garcia",
    image: "/placeholder.svg?height=120&width=240",
    rating: 4.7,
    reviews: 256,
    price: 59.99,
  },
  {
    id: 103,
    title: "Full Stack Project: E-Commerce",
    instructor: "James Wilson",
    image: "/placeholder.svg?height=120&width=240",
    rating: 4.9,
    reviews: 189,
    price: 69.99,
  },
  {
    id: 104,
    title: "Web Security Fundamentals",
    instructor: "Sophia Chen",
    image: "/placeholder.svg?height=120&width=240",
    rating: 4.6,
    reviews: 215,
    price: 54.99,
  },
]

