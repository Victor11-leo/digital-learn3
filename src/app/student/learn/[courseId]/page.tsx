import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Flag,
  Lightbulb,
  List,
  MessageSquare,
  Pencil,
  Play,
  Settings,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function CourseLearnPage({ params }: { params: { courseId: string } }) {
  // In a real application, you would fetch the course data based on the ID
  const courseId = params.courseId
  const course = mockCourses.find((c) => c.id.toString() === courseId) || mockCourses[0]

  // Current lesson (in a real app, this would be stored in state or fetched from an API)
  const currentSection = course.sections[0]
  const currentLesson = currentSection.lessons[0]

  // Calculate overall progress
  const totalLessons = course.sections.reduce((total, section) => total + section.lessons.length, 0)
  const completedLessons = course.sections.reduce(
    (total, section) => total + section.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-background z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to dashboard</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold line-clamp-1">{course.title}</h1>
              <div className="flex items-center gap-2">
                <Progress value={progressPercentage} className="h-2 w-24" />
                <span className="text-xs text-muted-foreground">{progressPercentage}% complete</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <List className="h-4 w-4 mr-2" />
                  Course Content
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] sm:w-[540px] p-0">
                <CourseSidebar course={course} currentLessonId={currentLesson.id} />
              </SheetContent>
            </Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-5xl py-6">
            {/* Video Player */}
            {currentLesson.type === "video" && (
              <div className="mb-6">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary">
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                  <img
                    src={currentLesson.thumbnail || "/placeholder.svg?height=720&width=1280"}
                    alt={currentLesson.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
              </div>
            )}

            {/* Quiz Content */}
            {currentLesson.type === "quiz" && (
              <div className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz: {currentLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentLesson.questions?.map((question, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="font-medium">
                            Question {index + 1}: {question.text}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-start space-x-2">
                                <Checkbox id={`q${index}-option${optionIndex}`} />
                                <label
                                  htmlFor={`q${index}-option${optionIndex}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button>Submit Answers</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Assignment Content */}
            {currentLesson.type === "assignment" && (
              <div className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment: {currentLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="prose max-w-none dark:prose-invert">
                        <p>{currentLesson.description}</p>
                        <h3>Instructions</h3>
                        <ol>
                          {currentLesson.instructions?.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                        <h3>Submission</h3>
                        <p>Please upload your completed assignment below.</p>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Download className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your files here or click to browse
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Files
                        </Button>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Comments (optional)</label>
                        <Textarea placeholder="Add any comments about your submission..." />
                      </div>
                      <Button>Submit Assignment</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Lesson Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{currentLesson.duration}</span>
                </div>
                {currentLesson.type === "video" && (
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Downloadable</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Resources: {currentLesson.resources?.length || 0}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{currentLesson.description}</p>
            </div>

            {/* Tabs for Additional Content */}
            <Tabs defaultValue="notes" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Your Notes</h3>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Notes
                      </Button>
                    </div>
                    <Textarea placeholder="Add your notes for this lesson here..." className="min-h-[200px]" />
                    <div className="flex justify-end mt-4">
                      <Button>Save Notes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">Lesson Resources</h3>
                    <div className="space-y-3">
                      {currentLesson.resources?.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                      {(!currentLesson.resources || currentLesson.resources.length === 0) && (
                        <p className="text-muted-foreground text-center py-6">
                          No resources available for this lesson.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcript" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">Lesson Transcript</h3>
                    {currentLesson.transcript ? (
                      <div className="space-y-4 text-sm">
                        {currentLesson.transcript.map((entry, index) => (
                          <div key={index} className="space-y-1">
                            <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                            <p>{entry.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-6">
                        Transcript not available for this lesson.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium">Lesson Discussions</h3>
                      <Button>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask a Question
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {currentLesson.discussions?.map((discussion, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                              <AvatarFallback>{discussion.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">{discussion.user.name}</span>
                                  <span className="text-xs text-muted-foreground ml-2">{discussion.timestamp}</span>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Flag className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="mt-1">{discussion.question}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Reply
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Lightbulb className="h-4 w-4 mr-2" />
                                  Helpful ({discussion.helpfulCount})
                                </Button>
                              </div>
                            </div>
                          </div>

                          {discussion.answers && discussion.answers.length > 0 && (
                            <div className="pl-11 space-y-4">
                              {discussion.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="border-l-2 pl-4 space-y-2">
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={answer.user.avatar} alt={answer.user.name} />
                                      <AvatarFallback>{answer.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <span className="font-medium text-sm">{answer.user.name}</span>
                                        {answer.isInstructor && (
                                          <Badge variant="outline" className="ml-2 text-xs">
                                            Instructor
                                          </Badge>
                                        )}
                                        <span className="text-xs text-muted-foreground ml-2">{answer.timestamp}</span>
                                      </div>
                                      <p className="text-sm mt-1">{answer.text}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {(!currentLesson.discussions || currentLesson.discussions.length === 0) && (
                        <div className="text-center py-8">
                          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                          <h3 className="font-medium mb-1">No discussions yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Be the first to ask a question about this lesson.
                          </p>
                          <Button>Ask a Question</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" disabled={true}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </Button>
              <Button>
                Next Lesson
                <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
              </Button>
            </div>
          </div>
        </main>

        {/* Course Sidebar (visible on larger screens) */}
        <aside className="hidden lg:block w-[350px] border-l overflow-y-auto">
          <CourseSidebar course={course} currentLessonId={currentLesson.id} />
        </aside>
      </div>
    </div>
  )
}

// Course Sidebar Component
function CourseSidebar({ course, currentLessonId }: { course: any; currentLessonId: number }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">{course.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Progress value={course.progress} className="h-2 flex-1" />
          <span className="text-xs text-muted-foreground">{course.progress}% complete</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={course.sections.map((_, i) => `section-${i}`)} className="w-full">
          {course.sections.map((section, sectionIndex) => (
            <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {section.lessons.filter((l) => l.completed).length}/{section.lessons.length} • {section.duration}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="space-y-1">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lessonIndex}
                      href={`/learn/${course.id}/lessons/${lesson.id}`}
                      className={`flex items-center gap-3 px-4 py-2 text-sm ${
                        lesson.id === currentLessonId ? "bg-muted font-medium" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        ) : lesson.id === currentLessonId ? (
                          <Play className="h-5 w-5 text-primary" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{lesson.title}</span>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {lesson.type === "video" && <Play className="h-3 w-3 text-muted-foreground" />}
                          {lesson.type === "quiz" && <FileText className="h-3 w-3 text-muted-foreground" />}
                          {lesson.type === "assignment" && <Pencil className="h-3 w-3 text-muted-foreground" />}
                          <span className="text-xs text-muted-foreground capitalize">{lesson.type}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

// Mock data
const mockCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    progress: 35,
    sections: [
      {
        title: "Getting Started with HTML",
        duration: "1h 45m",
        lessons: [
          {
            id: 101,
            title: "Introduction to HTML",
            type: "video",
            duration: "10:23",
            completed: true,
            description: "Learn the basics of HTML and understand how web pages are structured.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
            resources: [
              {
                title: "HTML Cheat Sheet",
                type: "PDF",
                size: "1.2 MB",
              },
              {
                title: "Starter Code",
                type: "ZIP",
                size: "345 KB",
              },
            ],
            transcript: [
              { timestamp: "00:00", text: "Welcome to the Introduction to HTML course." },
              { timestamp: "00:15", text: "HTML stands for HyperText Markup Language." },
              { timestamp: "00:30", text: "It's the standard markup language for creating web pages." },
            ],
            discussions: [
              {
                user: {
                  name: "Alex Johnson",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                timestamp: "2 days ago",
                question: "Is HTML considered a programming language?",
                helpfulCount: 5,
                answers: [
                  {
                    user: {
                      name: "Sarah Miller",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    isInstructor: true,
                    timestamp: "1 day ago",
                    text: "HTML is actually a markup language, not a programming language. It's used to structure content on the web, but it doesn't have programming logic like conditionals or loops.",
                  },
                ],
              },
            ],
          },
          {
            id: 102,
            title: "HTML Elements and Attributes",
            type: "video",
            duration: "15:47",
            completed: true,
            description: "Explore the various HTML elements and attributes that form the building blocks of web pages.",
          },
          {
            id: 103,
            title: "HTML Forms and Input Elements",
            type: "video",
            duration: "18:32",
            completed: false,
            description: "Learn how to create interactive forms to collect user input on your web pages.",
          },
          {
            id: 104,
            title: "HTML Quiz",
            type: "quiz",
            duration: "15 min",
            completed: false,
            description: "Test your knowledge of HTML fundamentals.",
            questions: [
              {
                text: "What does HTML stand for?",
                options: [
                  "Hyper Text Markup Language",
                  "High Tech Modern Language",
                  "Hyperlink and Text Markup Language",
                  "Home Tool Markup Language",
                ],
              },
              {
                text: "Which HTML element is used to define the main content of a document?",
                options: ["<main>", "<content>", "<section>", "<article>"],
              },
              {
                text: "Which attribute is used to specify a unique identifier for an HTML element?",
                options: ["id", "class", "name", "unique"],
              },
            ],
          },
        ],
      },
      {
        title: "CSS Styling",
        duration: "2h 30m",
        lessons: [
          {
            id: 201,
            title: "Introduction to CSS",
            type: "video",
            duration: "12:15",
            completed: false,
            description: "Learn the basics of CSS and how to style your HTML elements.",
          },
          {
            id: 202,
            title: "CSS Selectors",
            type: "video",
            duration: "14:53",
            completed: false,
            description: "Master the different types of CSS selectors to target specific HTML elements.",
          },
          {
            id: 203,
            title: "CSS Layout with Flexbox",
            type: "video",
            duration: "22:18",
            completed: false,
            description: "Learn how to create flexible and responsive layouts using CSS Flexbox.",
          },
          {
            id: 204,
            title: "CSS Assignment: Build a Landing Page",
            type: "assignment",
            duration: "1 hour",
            completed: false,
            description: "Apply your CSS knowledge by building a responsive landing page.",
            instructions: [
              "Create a responsive landing page for a fictional product",
              "Use Flexbox for the layout",
              "Include a navigation bar, hero section, features section, and footer",
              "Make sure it looks good on both desktop and mobile devices",
              "Use appropriate color schemes and typography",
            ],
          },
        ],
      },
      {
        title: "JavaScript Basics",
        duration: "3h 15m",
        lessons: [
          {
            id: 301,
            title: "Introduction to JavaScript",
            type: "video",
            duration: "15:42",
            completed: false,
            description: "Get started with JavaScript, the programming language of the web.",
          },
          {
            id: 302,
            title: "Variables and Data Types",
            type: "video",
            duration: "18:27",
            completed: false,
            description: "Learn about JavaScript variables and the different data types they can hold.",
          },
          {
            id: 303,
            title: "Functions and Events",
            type: "video",
            duration: "20:15",
            completed: false,
            description: "Understand how to create and use functions, and how to handle events in JavaScript.",
          },
        ],
      },
    ],
  },
]

