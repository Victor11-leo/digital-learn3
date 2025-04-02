"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, BookOpen, Check, FileText, Image, Info, Layers, Plus, Upload, Video, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditCoursePage() {
  const params = useParams()
  const courseId = params.id as string

  // Find the course by ID from our sample data
  const course = courses.find((c) => c.id.toString() === courseId) || courses[0]

  const [activeTab, setActiveTab] = useState("basic")
  const [sections, setSections] = useState(course.curriculum)

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `New Section ${sections.length + 1}`,
      lessons: [],
    }
    setSections([...sections, newSection])
  }

  const addLesson = (sectionId: number) => {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/teacher/courses/${courseId}`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Edit Course: {course.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save Changes</Button>
            <Button>Publish Updates</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Curriculum</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Media</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
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
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update the essential details about your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" defaultValue={course.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Course Subtitle</Label>
                  <Input id="subtitle" defaultValue="Learn HTML, CSS, and JavaScript from scratch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea id="description" defaultValue={course.description} className="min-h-[150px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={course.category.toLowerCase().replace(/\s+/g, "-")}>
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select defaultValue={course.level.toLowerCase()}>
                      <SelectTrigger id="level">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="all-levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learning-objectives">Learning Objectives</Label>
                  <Textarea
                    id="learning-objectives"
                    defaultValue={course.learningObjectives.join("\n")}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter each learning objective on a new line. These will be displayed as bullet points.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>Organize your course content into sections and lessons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {sections.length} sections • {sections.reduce((acc, section) => acc + section.lessons.length, 0)}{" "}
                    lessons
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={addSection}>
                      <Plus className="h-4 w-4" />
                      Add Section
                    </Button>
                  </div>
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              Delete Section
                            </Button>
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
                            <Label>Lessons</Label>
                            <div className="mt-2 space-y-2">
                              {section.lessons.map((lesson, index) => (
                                <div key={lesson.id} className="flex items-center gap-2 rounded-md border p-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      {lesson.type === "video" ? (
                                        <Video className="h-4 w-4 text-muted-foreground" />
                                      ) : lesson.type === "assignment" ? (
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                      )}
                                      <Input
                                        value={lesson.title}
                                        onChange={(e) => {
                                          const updatedSections = sections.map((s) => {
                                            if (s.id === section.id) {
                                              const updatedLessons = s.lessons.map((l) =>
                                                l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                              )
                                              return { ...s, lessons: updatedLessons }
                                            }
                                            return s
                                          })
                                          setSections(updatedSections)
                                        }}
                                        className="h-8"
                                      />
                                    </div>
                                  </div>
                                  <Select
                                    value={lesson.type}
                                    onValueChange={(value) => {
                                      const updatedSections = sections.map((s) => {
                                        if (s.id === section.id) {
                                          const updatedLessons = s.lessons.map((l) =>
                                            l.id === lesson.id ? { ...l, type: value } : l,
                                          )
                                          return { ...s, lessons: updatedLessons }
                                        }
                                        return s
                                      })
                                      setSections(updatedSections)
                                    }}
                                  >
                                    <SelectTrigger className="w-[110px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="assignment">Assignment</SelectItem>
                                      <SelectItem value="text">Text</SelectItem>
                                      <SelectItem value="quiz">Quiz</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {lesson.type === "video" && (
                                    <Input
                                      value={lesson.duration}
                                      onChange={(e) => {
                                        const updatedSections = sections.map((s) => {
                                          if (s.id === section.id) {
                                            const updatedLessons = s.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, duration: e.target.value } : l,
                                            )
                                            return { ...s, lessons: updatedLessons }
                                          }
                                          return s
                                        })
                                        setSections(updatedSections)
                                      }}
                                      placeholder="Duration"
                                      className="w-[80px] h-8"
                                    />
                                  )}
                                  <Select
                                    value={lesson.status}
                                    onValueChange={(value) => {
                                      const updatedSections = sections.map((s) => {
                                        if (s.id === section.id) {
                                          const updatedLessons = s.lessons.map((l) =>
                                            l.id === lesson.id ? { ...l, status: value } : l,
                                          )
                                          return { ...s, lessons: updatedLessons }
                                        }
                                        return s
                                      })
                                      setSections(updatedSections)
                                    }}
                                  >
                                    <SelectTrigger className="w-[110px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="published">Published</SelectItem>
                                      <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
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

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Media</CardTitle>
                <CardDescription>Update images and promotional videos for your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>
                  <div className="space-y-4">
                    <div className="aspect-video w-full max-w-md overflow-hidden rounded-md border">
                      <img
                        src={course.image || "/placeholder.svg?height=200&width=400"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Upload className="h-4 w-4" />
                        Replace Thumbnail
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Promotional Video</Label>
                  {course.promoVideo ? (
                    <div className="space-y-4">
                      <div className="aspect-video w-full max-w-md overflow-hidden rounded-md border bg-muted">
                        <div className="flex h-full items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Upload className="h-4 w-4" />
                          Replace Video
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border-2 border-dashed rounded-md h-[200px] bg-muted/50">
                      <div className="flex flex-col items-center gap-2 p-4 text-center">
                        <Video className="h-8 w-8 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Drag & drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">
                            Max file size: 500MB. Supported formats: MP4, MOV
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL (Alternative)</Label>
                  <Input id="video-url" placeholder="e.g., https://youtube.com/watch?v=..." />
                  <p className="text-xs text-muted-foreground">
                    If you prefer to use a video from YouTube or Vimeo, enter the URL here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Pricing</CardTitle>
                <CardDescription>Update the price and payment options for your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pricing-type">Pricing Type</Label>
                  <Select defaultValue="paid">
                    <SelectTrigger id="pricing-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="subscription">Subscription Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" min="0" step="0.01" defaultValue={course.price} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original-price">Original Price ($)</Label>
                    <Input id="original-price" type="number" min="0" step="0.01" defaultValue={course.originalPrice} />
                    <p className="text-xs text-muted-foreground">Set a higher original price to show a discount.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Enrollment Options</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lifetime-access" defaultChecked />
                    <label
                      htmlFor="lifetime-access"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lifetime Access
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="certificate" defaultChecked />
                    <label
                      htmlFor="certificate"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include Certificate of Completion
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coupon-code">Coupon Code (Optional)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input id="coupon-code" placeholder="e.g., LAUNCH50" className="col-span-2" />
                    <Input id="discount-percent" type="number" min="1" max="100" placeholder="% off" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Create a coupon code for special promotions or early adopters.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>Configure additional settings for your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Course Visibility</Label>
                  <Select defaultValue={course.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Student Engagement</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-discussions" defaultChecked />
                    <label
                      htmlFor="enable-discussions"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable Course Discussions
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-reviews" defaultChecked />
                    <label
                      htmlFor="enable-reviews"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow Student Reviews
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-progress" defaultChecked />
                    <label
                      htmlFor="enable-progress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Track Student Progress
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Course Completion</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="completion-certificate" defaultChecked />
                    <label
                      htmlFor="completion-certificate"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Issue Completion Certificate
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="completion-email" defaultChecked />
                    <label
                      htmlFor="completion-email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send Completion Email
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Course Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Course Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., javascript, web development, coding"
                    defaultValue="html, css, javascript, web development"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas. Tags help students find your course.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              const prevTab = {
                basic: "basic",
                curriculum: "basic",
                media: "curriculum",
                pricing: "media",
                settings: "pricing",
              }[activeTab as string]
              setActiveTab(prevTab)
            }}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              const nextTab = {
                basic: "curriculum",
                curriculum: "media",
                media: "pricing",
                pricing: "settings",
                settings: "settings",
              }[activeTab as string]
              setActiveTab(nextTab)
            }}
          >
            {activeTab === "settings" ? (
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                Save Changes
              </div>
            ) : (
              "Next"
            )}
          </Button>
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

