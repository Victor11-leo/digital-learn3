import Link from "next/link"
import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, DollarSign, GraduationCap, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <span>Last 30 days</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,546</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Postings</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">368</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                      <AvatarFallback>{activity.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.userName}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Platform Statistics</CardTitle>
              <CardDescription>Key metrics for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{stat.name}</p>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">{stat.value}</span>
                      {stat.change > 0 ? (
                        <Badge variant="outline" className="text-green-500">
                          +{stat.change}%
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500">
                          {stat.change}%
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Content */}
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-4">Recent Content</h3>
          <Tabs defaultValue="courses">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="courses" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentCourses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {course.category}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.enrollments} enrollments</span>
                        </div>
                        <div>
                          <span className="font-medium">${course.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">Added {course.addedDate}</div>
                      <Link href={`/admin/courses/${course.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/admin/courses">
                  <Button variant="outline">
                    View All Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="jobs" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentJobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{job.title}</CardTitle>
                          <CardDescription>{job.company}</CardDescription>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {job.type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{job.location}</span>
                        </div>
                        <div>
                          <span className="font-medium">{job.applications} applications</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">Posted {job.postedDate}</div>
                      <Link href={`/admin/jobs/${job.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/admin/jobs">
                  <Button variant="outline">
                    View All Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentReviews.map((review, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{review.userName}</CardTitle>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-3">{review.comment}</p>
                      <p className="text-xs font-medium mt-2">
                        For: <span className="text-primary">{review.courseName}</span>
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Approve
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Reject
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/admin/reviews">
                  <Button variant="outline">
                    View All Reviews
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Pending Approvals */}
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-4">Pending Approvals</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Course Approvals</CardTitle>
                <CardDescription>New courses waiting for review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground mt-2">3 high priority courses</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Review Courses
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Approvals</CardTitle>
                <CardDescription>Job postings waiting for review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-sm text-muted-foreground mt-2">2 featured job requests</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Review Jobs
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Verifications</CardTitle>
                <CardDescription>Teacher verification requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-sm text-muted-foreground mt-2">All pending since yesterday</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Verify Teachers
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const recentActivities = [
  {
    userName: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "Created a new course: Advanced React Development",
    time: "2 hours ago",
  },
  {
    userName: "Michael Chen",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "Posted a new job: Senior Data Scientist at DataViz Inc.",
    time: "5 hours ago",
  },
  {
    userName: "Emily Rodriguez",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "Submitted a course for review: UX/UI Design Masterclass",
    time: "8 hours ago",
  },
  {
    userName: "David Kim",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "Updated profile information and verification documents",
    time: "1 day ago",
  },
  {
    userName: "Jessica Martinez",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "Reported an issue with the messaging system",
    time: "1 day ago",
  },
]

const platformStats = [
  {
    name: "New Registrations",
    description: "Users who signed up",
    value: "1,234",
    change: 12.5,
    icon: Users,
  },
  {
    name: "Course Enrollments",
    description: "New course sign-ups",
    value: "5,678",
    change: 8.2,
    icon: BookOpen,
  },
  {
    name: "Job Applications",
    description: "Applications submitted",
    value: "892",
    change: -3.1,
    icon: Briefcase,
  },
  {
    name: "Revenue Generated",
    description: "From course purchases",
    value: "$45,231",
    change: 20.1,
    icon: DollarSign,
  },
  {
    name: "Active Students",
    description: "Currently learning",
    value: "8,342",
    change: 5.7,
    icon: GraduationCap,
  },
]

const recentCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    category: "Development",
    enrollments: 245,
    price: 69.99,
    addedDate: "2 hours ago",
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    instructor: "Michael Chen",
    category: "Data Science",
    enrollments: 189,
    price: 59.99,
    addedDate: "1 day ago",
  },
  {
    id: 3,
    title: "UX/UI Design Masterclass",
    instructor: "Emily Rodriguez",
    category: "Design",
    enrollments: 132,
    price: 49.99,
    addedDate: "2 days ago",
  },
]

const recentJobs = [
  {
    id: 1,
    title: "Senior Data Scientist",
    company: "DataViz Inc.",
    type: "Full-time",
    location: "Remote",
    applications: 28,
    postedDate: "5 hours ago",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "TechCorp",
    type: "Full-time",
    location: "New York, NY",
    applications: 42,
    postedDate: "1 day ago",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignHub",
    type: "Contract",
    location: "San Francisco, CA",
    applications: 15,
    postedDate: "3 days ago",
  },
]

const recentReviews = [
  {
    userName: "John Smith",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I went from knowing nothing about web development to building my own portfolio website.",
    courseName: "Web Development Fundamentals",
    date: "1 day ago",
  },
  {
    userName: "Emily Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment:
      "Great course for beginners. The projects are practical and helped me apply what I learned. I would have liked more advanced content, but overall it's a solid introduction.",
    courseName: "Data Science Essentials",
    date: "2 days ago",
  },
  {
    userName: "Michael Johnson",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    comment:
      "The content is good, but some sections feel rushed. I would have appreciated more in-depth explanations of certain concepts. The practical exercises are excellent though.",
    courseName: "UX/UI Design Principles",
    date: "3 days ago",
  },
]

