import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  LineChart,
  PlusCircle,
  Star,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Last 30 days
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+24% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Performance */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-${course.color}`} />
                      <span className="text-sm font-medium">{course.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{course.students} students</span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.completion}% completion rate</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/teachercourses">
                <Button variant="ghost" className="gap-1">
                  View all courses
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Student Insights */}
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-4">Student Insights</h3>
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Students</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              <Link href="/teacherstudents">
                <Button variant="outline" size="sm">
                  View All Students
                </Button>
              </Link>
            </div>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                  <Card key={student.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{student.name}</CardTitle>
                            <CardDescription>{student.email}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={student.status === "Active" ? "success" : "secondary"}>{student.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Enrolled Courses:</span>
                          <span className="font-medium">{student.enrolledCourses}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Completion Rate:</span>
                          <span className="font-medium">{student.completionRate}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Last Active:</span>
                          <span className="font-medium">{student.lastActive}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href={`/teacherstudents/${student.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View Profile
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href={`/teachermessages?to=${student.id}`}>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {students
                  .filter((student) => student.status === "Active")
                  .map((student) => (
                    <Card key={student.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{student.name}</CardTitle>
                              <CardDescription>{student.email}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Enrolled Courses:</span>
                            <span className="font-medium">{student.enrolledCourses}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Completion Rate:</span>
                            <span className="font-medium">{student.completionRate}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Last Active:</span>
                            <span className="font-medium">{student.lastActive}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link href={`/teacherstudents/${student.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View Profile
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/teachermessages?to=${student.id}`}>
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {students
                  .filter((student) => student.isNew)
                  .map((student) => (
                    <Card key={student.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{student.name}</CardTitle>
                              <CardDescription>{student.email}</CardDescription>
                            </div>
                          </div>
                          <Badge>New</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Enrolled Courses:</span>
                            <span className="font-medium">{student.enrolledCourses}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Completion Rate:</span>
                            <span className="font-medium">{student.completionRate}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Last Active:</span>
                            <span className="font-medium">{student.lastActive}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link href={`/teacherstudents/${student.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View Profile
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/teachermessages?to=${student.id}`}>
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/teachercourses/new">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <PlusCircle className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium">Create New Course</h3>
                  <p className="text-sm text-muted-foreground mt-1">Start building a new course for your students</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/teachercontent">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium">Manage Content</h3>
                  <p className="text-sm text-muted-foreground mt-1">Upload and organize your course materials</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/teacherstudents">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium">View Students</h3>
                  <p className="text-sm text-muted-foreground mt-1">Check on your students' progress and engagement</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/teacheranalytics">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1">View detailed analytics for your courses</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    students: 425,
    completion: 78,
    rating: 4.8,
    color: "blue-500",
  },
  {
    id: 2,
    title: "Advanced React Development",
    students: 312,
    completion: 65,
    rating: 4.9,
    color: "green-500",
  },
  {
    id: 3,
    title: "JavaScript for Beginners",
    students: 287,
    completion: 82,
    rating: 4.7,
    color: "purple-500",
  },
  {
    id: 4,
    title: "Responsive Web Design",
    students: 156,
    completion: 91,
    rating: 4.6,
    color: "orange-500",
  },
  {
    id: 5,
    title: "Full-Stack Development with Node.js",
    students: 68,
    completion: 45,
    rating: 4.5,
    color: "red-500",
  },
]

const activities = [
  {
    title: "New Student Enrollment",
    description: "5 new students enrolled in 'Web Development Fundamentals'",
    time: "2h ago",
    icon: Users,
  },
  {
    title: "Course Completion",
    description: "John Smith completed 'JavaScript for Beginners'",
    time: "5h ago",
    icon: CheckCircle,
  },
  {
    title: "New Review",
    description: "Emily Chen left a 5-star review on 'Advanced React Development'",
    time: "1d ago",
    icon: Star,
  },
  {
    title: "Assignment Submission",
    description: "15 students submitted the final project for 'Responsive Web Design'",
    time: "2d ago",
    icon: FileText,
  },
  {
    title: "Revenue Update",
    description: "You earned $1,250 from course sales this week",
    time: "3d ago",
    icon: TrendingUp,
  },
]

const students = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    enrolledCourses: 3,
    completionRate: 75,
    lastActive: "Today",
    isNew: false,
  },
  {
    id: "2",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    enrolledCourses: 2,
    completionRate: 60,
    lastActive: "Yesterday",
    isNew: false,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive",
    enrolledCourses: 1,
    completionRate: 30,
    lastActive: "2 weeks ago",
    isNew: false,
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    enrolledCourses: 4,
    completionRate: 85,
    lastActive: "Today",
    isNew: true,
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    enrolledCourses: 2,
    completionRate: 45,
    lastActive: "3 days ago",
    isNew: true,
  },
  {
    id: "6",
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    enrolledCourses: 1,
    completionRate: 20,
    lastActive: "Today",
    isNew: true,
  },
]

