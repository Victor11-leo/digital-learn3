"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Edit,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Settings,
  Star,
  Trash,
  Upload,
  Users,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function CourseManagementPage() {
  const params = useParams()
  const courseId = params.id

  // Find the course by ID from our sample data
  const course = courses.find((c) => c.id.toString() === courseId) || courses[0]

  const [activeTab, setActiveTab] = useState("overview")
  const [sections, setSections] = useState(course.curriculum)

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `New Section ${sections.length + 1}`,
      lessons: [],
    }
    setSections([...sections, newSection])
  }

  const addLesson = (sectionId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [
            ...section.lessons,
            {
              id: Math.max(0, ...sections.flatMap((s) => s.lessons.map((l) => l.id))) + 1,
              title: `New Lesson`,
              type: "video",
              duration: "0:00",
              status: "draft",
            },
          ],
        }
      }
      return section
    })
    setSections(updatedSections)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/teacher/courses">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{course.title}</h2>
              <p className="text-sm text-muted-foreground">
                {course.category} • {course.level}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/courses/${courseId}`} target="_blank">
              <Button variant="outline" size="sm" className="h-8">
                Preview
              </Button>
            </Link>
            <Link href={`/dashboard/teacher/courses/${courseId}/edit`}>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <MoreHorizontal className="h-4 w-4" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Course Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={`/dashboard/teacher/courses/${courseId}/settings`} className="flex w-full items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Course Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/dashboard/teacher/courses/${courseId}/analytics`} className="flex w-full items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {course.status === "published" ? (
                  <DropdownMenuItem>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Unpublish Course
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Publish Course
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Students
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
                        This action cannot be undone. This will permanently delete the course and remove all associated
                        data.
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
            <Button size="sm" className="h-8">
              {course.status === "published" ? "Published" : "Publish Course"}
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        {course.status !== "published" && (
          <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Course is not published</h3>
                <div className="mt-1">
                  <p>
                    This course is currently in {course.status} mode and is not visible to students. Publish it when
                    you're ready.
                  </p>
                </div>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    Publish Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 md:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Curriculum</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Discussions</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.students}</div>
                  <p className="text-xs text-muted-foreground">+{course.newStudents} in the last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">{course.completedStudents} students completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.rating}</div>
                  <p className="text-xs text-muted-foreground">From {course.reviewCount} reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${course.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +${course.revenueIncrease.toLocaleString()} from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Status</p>
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
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm">{course.category}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Level</p>
                      <p className="text-sm">{course.level}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-sm">
                        ${course.price}{" "}
                        {course.originalPrice && (
                          <span className="text-muted-foreground line-through">${course.originalPrice}</span>
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-sm">{course.createdDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-sm">{course.lastUpdated}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm">{course.description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Learning Objectives</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {course.learningObjectives.map((objective, index) => (
                        <li key={index} className="text-sm">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/teacher/courses/${courseId}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Course Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Thumbnail</p>
                    <div className="aspect-video w-full overflow-hidden rounded-md border">
                      <img
                        src={course.image || "/placeholder.svg?height=200&width=400"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Promotional Video</p>
                    {course.promoVideo ? (
                      <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
                        <div className="flex h-full items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border-2 border-dashed rounded-md h-[120px] bg-muted/50">
                        <div className="flex flex-col items-center gap-1 p-4 text-center">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">No promotional video uploaded</p>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Upload Video
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
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
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topStudents.map((student) => (
                      <div key={student.id} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.progress}% completed</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/teacher/courses/${courseId}/students`}>
                    <Button variant="outline" className="w-full">
                      View All Students
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>Manage your course content and structure</CardDescription>
                </div>
                <Button className="gap-1" onClick={addSection}>
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {sections.length} sections • {sections.reduce((acc, section) => acc + section.lessons.length, 0)}{" "}
                  lessons
                </div>

                <Accordion type="multiple" className="w-full" defaultValue={sections.map((s) => s.id.toString())}>
                  {sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id.toString()} className="border rounded-md mb-4">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex flex-1 items-center justify-between pr-4">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-muted-foreground">{section.lessons.length} lessons</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-7 gap-1">
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
                                  className="h-4 w-4"
                                >
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                Move Up
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                Delete Section
                              </Button>
                            </div>
                          </div>
                          <Input
                            id={`section-title-${section.id}`}
                            value={section.title}
                            onChange={(e) => {
                              const updatedSections = sections.map((s) =>
                                s.id === section.id ? { ...s, title: e.target.value } : s,
                              )
                              setSections(updatedSections)
                            }}
                          />

                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <Label>Lessons</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1"
                                onClick={() => addLesson(section.id)}
                              >
                                <Plus className="h-4 w-4" />
                                Add Lesson
                              </Button>
                            </div>
                            <div className="mt-2 space-y-2">
                              {section.lessons.map((lesson, index) => (
                                <div key={lesson.id} className="flex items-center gap-2 rounded-md border p-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      {lesson.type === "video" ? (
                                        <Video className="h-4 w-4 text-muted-foreground" />
                                      ) : lesson.type === "assignment" ? (
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                      )}
                                      <div className="flex flex-col">
                                        <span className="font-medium">{lesson.title}</span>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <span className="capitalize">{lesson.type}</span>
                                          {lesson.duration && (
                                            <>
                                              <span>•</span>
                                              <span>{lesson.duration}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Badge
                                    variant={
                                      lesson.status === "published"
                                        ? "success"
                                        : lesson.status === "draft"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
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
                                        <Link
                                          href={`/dashboard/teacher/courses/${courseId}/lessons/${lesson.id}`}
                                          className="flex w-full items-center"
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Lesson
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
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
                                          className="mr-2 h-4 w-4"
                                        >
                                          <path d="m12 19-7-7 7-7" />
                                          <path d="M19 12H5" />
                                        </svg>
                                        Move Up
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
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
                                          className="mr-2 h-4 w-4"
                                        >
                                          <path d="m19 12-7 7-7-7" />
                                          <path d="M5 12h14" />
                                        </svg>
                                        Move Down
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      {lesson.status === "published" ? (
                                        <DropdownMenuItem>
                                          <BookOpen className="mr-2 h-4 w-4" />
                                          Unpublish Lesson
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem>
                                          <BookOpen className="mr-2 h-4 w-4" />
                                          Publish Lesson
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete Lesson
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-1 mt-2"
                                onClick={() => addLesson(section.id)}
                              >
                                <Plus className="h-4 w-4" />
                                Add Lesson
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Button variant="outline" className="w-full gap-1" onClick={addSection}>
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Enrolled Students</CardTitle>
                  <CardDescription>Manage and track your students' progress</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[250px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search students..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Message All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                    <div className="col-span-4">Student</div>
                    <div className="col-span-2 text-center">Enrolled</div>
                    <div className="col-span-3 text-center">Progress</div>
                    <div className="col-span-2 text-center">Last Active</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {enrolledStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-xs text-muted-foreground">{student.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center text-sm">{student.enrolledDate}</div>
                      <div className="col-span-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Progress value={student.progress} className="h-2 w-full" />
                          <span className="text-xs text-muted-foreground">{student.progress}% completed</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-center text-sm">{student.lastActive}</div>
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
                                href={`/dashboard/teacher/students/${student.id}`}
                                className="flex w-full items-center"
                              >
                                <User className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
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
                                className="mr-2 h-4 w-4"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <line x1="17" x2="22" y1="8" y2="13" />
                                <line x1="22" x2="17" y1="8" y2="13" />
                              </svg>
                              Remove Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>10</strong> of <strong>{course.students}</strong> students
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
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Course Discussions</CardTitle>
                  <CardDescription>Manage questions and discussions from your students</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Discussions</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                      <SelectItem value="answered">Answered</SelectItem>
                      <SelectItem value="pinned">Pinned</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative w-[250px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search discussions..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={discussion.userAvatar} alt={discussion.userName} />
                            <AvatarFallback>{discussion.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{discussion.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <span>{discussion.userName}</span>
                              <span>•</span>
                              <span>{discussion.postedDate}</span>
                              <span>•</span>
                              <span>Lesson: {discussion.lesson}</span>
                            </div>
                            <p className="text-sm mt-2">{discussion.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {discussion.status === "unanswered" ? (
                            <Badge variant="secondary">Unanswered</Badge>
                          ) : (
                            <Badge variant="success">Answered</Badge>
                          )}
                          {discussion.pinned && <Badge variant="outline">Pinned</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View Thread
                          </Button>
                          <Button size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>5</strong> of <strong>24</strong> discussions
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
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Course Analytics</CardTitle>
                  <CardDescription>Track performance and engagement metrics</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last 12 months</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Enrollment Trend</h3>
                    <div className="aspect-[4/3] w-full rounded-md border bg-muted p-2">
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Completion Rate</h3>
                    <div className="aspect-[4/3] w-full rounded-md border bg-muted p-2">
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Revenue</h3>
                    <div className="aspect-[4/3] w-full rounded-md border bg-muted p-2">
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Lesson Engagement</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-5">Lesson</div>
                      <div className="col-span-2 text-center">Views</div>
                      <div className="col-span-2 text-center">Completion</div>
                      <div className="col-span-3 text-center">Avg. Time Spent</div>
                    </div>
                    {lessonEngagement.map((lesson) => (
                      <div key={lesson.id} className="grid grid-cols-12 items-center border-b px-4 py-3">
                        <div className="col-span-5">
                          <div className="flex items-center gap-2">
                            {lesson.type === "video" ? (
                              <Video className="h-4 w-4 text-muted-foreground" />
                            ) : lesson.type === "assignment" ? (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">{lesson.views}</div>
                        <div className="col-span-2 text-center">{lesson.completionRate}%</div>
                        <div className="col-span-3 text-center">{lesson.avgTimeSpent}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Student Demographics</h3>
                    <div className="aspect-square w-full rounded-md border bg-muted p-2">
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Rating Distribution</h3>
                    <div className="aspect-square w-full rounded-md border bg-muted p-2">
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
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
    fullDescription:
      "This comprehensive course will take you from a complete beginner to a confident web developer. You'll learn how to create responsive websites using HTML5, style them with CSS3, and add interactivity with JavaScript. Through hands-on projects and real-world examples, you'll gain practical experience that you can immediately apply to your own projects.",
    image: "/placeholder.svg?height=200&width=400",
    promoVideo: null,
    category: "Web Development",
    level: "Beginner",
    status: "published",
    students: 425,
    newStudents: 28,
    completionRate: 78,
    completedStudents: 331,
    rating: 4.8,
    reviewCount: 342,
    price: 49.99,
    originalPrice: 99.99,
    revenue: 18750,
    revenueIncrease: 1250,
    createdDate: "Jan 15, 2025",
    lastUpdated: "Mar 10, 2025",
    learningObjectives: [
      "Build responsive websites using HTML5 and CSS3",
      "Create interactive web pages with JavaScript",
      "Understand web development best practices",
      "Deploy websites to production environments",
      "Optimize websites for performance and SEO",
      "Implement modern UI/UX principles",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction",
        lessons: [
          { id: 1, title: "Welcome to the Course", type: "video", duration: "5:30", status: "published" },
          { id: 2, title: "Course Overview", type: "video", duration: "8:45", status: "published" },
        ],
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          { id: 3, title: "HTML Document Structure", type: "video", duration: "12:20", status: "published" },
          { id: 4, title: "HTML Elements and Attributes", type: "video", duration: "15:10", status: "published" },
          { id: 5, title: "HTML Practice Exercise", type: "assignment", duration: "", status: "published" },
        ],
      },
      {
        id: 3,
        title: "CSS Styling",
        lessons: [
          { id: 6, title: "Introduction to CSS", type: "video", duration: "10:15", status: "published" },
          { id: 7, title: "CSS Selectors", type: "video", duration: "14:30", status: "published" },
          { id: 8, title: "Box Model", type: "video", duration: "18:45", status: "published" },
          { id: 9, title: "CSS Layout with Flexbox", type: "video", duration: "22:10", status: "published" },
          { id: 10, title: "CSS Practice Exercise", type: "assignment", duration: "", status: "published" },
        ],
      },
      {
        id: 4,
        title: "JavaScript Basics",
        lessons: [
          { id: 11, title: "Introduction to JavaScript", type: "video", duration: "11:20", status: "published" },
          { id: 12, title: "Variables and Data Types", type: "video", duration: "13:45", status: "published" },
          { id: 13, title: "Control Flow", type: "video", duration: "16:30", status: "published" },
          { id: 14, title: "Functions", type: "video", duration: "19:15", status: "draft" },
          { id: 15, title: "DOM Manipulation", type: "video", duration: "21:40", status: "draft" },
        ],
      },
    ],
  },
]

const recentActivities = [
  {
    title: "New Student Enrollment",
    description: "5 new students enrolled in the course",
    time: "2h ago",
    icon: Users,
  },
  {
    title: "Course Completion",
    description: "John Smith completed the course",
    time: "5h ago",
    icon: CheckCircle,
  },
  {
    title: "New Review",
    description: "Emily Chen left a 5-star review",
    time: "1d ago",
    icon: Star,
  },
  {
    title: "Assignment Submission",
    description: "15 students submitted the HTML Practice Exercise",
    time: "2d ago",
    icon: FileText,
  },
]

const topStudents = [
  {
    id: "1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: 100,
  },
  {
    id: "2",
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: 95,
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: 90,
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: 85,
  },
]

const enrolledStudents = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Jan 20, 2025",
    progress: 100,
    lastActive: "Today",
  },
  {
    id: "2",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Jan 22, 2025",
    progress: 95,
    lastActive: "Yesterday",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Jan 25, 2025",
    progress: 90,
    lastActive: "2 days ago",
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 1, 2025",
    progress: 85,
    lastActive: "Today",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 3, 2025",
    progress: 75,
    lastActive: "3 days ago",
  },
  {
    id: "6",
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 5, 2025",
    progress: 70,
    lastActive: "Today",
  },
  {
    id: "7",
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 10, 2025",
    progress: 65,
    lastActive: "Yesterday",
  },
  {
    id: "8",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 12, 2025",
    progress: 60,
    lastActive: "Today",
  },
  {
    id: "9",
    name: "Olivia Thompson",
    email: "olivia.thompson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 15, 2025",
    progress: 50,
    lastActive: "1 week ago",
  },
  {
    id: "10",
    name: "James Anderson",
    email: "james.anderson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledDate: "Feb 18, 2025",
    progress: 45,
    lastActive: "2 days ago",
  },
]

const discussions = [
  {
    id: "1",
    title: "Question about CSS Flexbox",
    content:
      "I'm having trouble understanding how to center items both horizontally and vertically with Flexbox. Can someone explain this concept in simpler terms?",
    userName: "Emily Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "2 days ago",
    lesson: "CSS Layout with Flexbox",
    status: "answered",
    pinned: true,
    replies: 3,
  },
  {
    id: "2",
    title: "JavaScript function scope confusion",
    content: "I'm confused about the difference between var, let, and const in JavaScript. When should I use each one?",
    userName: "Michael Johnson",
    userAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "3 days ago",
    lesson: "Variables and Data Types",
    status: "answered",
    pinned: false,
    replies: 5,
  },
  {
    id: "3",
    title: "HTML form submission not working",
    content: "I've created a form following the tutorial, but when I click submit, nothing happens. What am I missing?",
    userName: "David Kim",
    userAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "1 week ago",
    lesson: "HTML Elements and Attributes",
    status: "unanswered",
    pinned: false,
    replies: 0,
  },
  {
    id: "4",
    title: "Best practices for responsive design",
    content: "Are there any additional resources or tips for making websites look good on all devices?",
    userName: "Sophia Rodriguez",
    userAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "1 week ago",
    lesson: "CSS Layout with Flexbox",
    status: "answered",
    pinned: false,
    replies: 2,
  },
  {
    id: "5",
    title: "Error in JavaScript exercise",
    content:
      "I'm getting an 'Uncaught TypeError' when trying to complete the DOM manipulation exercise. Can someone help me debug this?",
    userName: "John Smith",
    userAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "2 weeks ago",
    lesson: "DOM Manipulation",
    status: "unanswered",
    pinned: false,
    replies: 1,
  },
]

const lessonEngagement = [
  {
    id: 1,
    title: "Welcome to the Course",
    type: "video",
    views: 425,
    completionRate: 98,
    avgTimeSpent: "5:12",
  },
  {
    id: 2,
    title: "Course Overview",
    type: "video",
    views: 420,
    completionRate: 95,
    avgTimeSpent: "8:30",
  },
  {
    id: 3,
    title: "HTML Document Structure",
    type: "video",
    views: 412,
    completionRate: 92,
    avgTimeSpent: "11:45",
  },
  {
    id: 4,
    title: "HTML Elements and Attributes",
    type: "video",
    views: 405,
    completionRate: 90,
    avgTimeSpent: "14:20",
  },
  {
    id: 5,
    title: "HTML Practice Exercise",
    type: "assignment",
    views: 398,
    completionRate: 85,
    avgTimeSpent: "25:10",
  },
  {
    id: 6,
    title: "Introduction to CSS",
    type: "video",
    views: 385,
    completionRate: 82,
    avgTimeSpent: "9:50",
  },
  {
    id: 7,
    title: "CSS Selectors",
    type: "video",
    views: 372,
    completionRate: 78,
    avgTimeSpent: "13:15",
  },
  {
    id: 8,
    title: "Box Model",
    type: "video",
    views: 360,
    completionRate: 75,
    avgTimeSpent: "17:30",
  },
]

// Missing imports
import { Search, User, CheckCircle, Download } from "lucide-react"

