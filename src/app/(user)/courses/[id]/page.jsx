import Link from "next/link"
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Globe,
  Heart,
  MessageSquare,
  Share2,
  Star,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Header from "@/components/global/Header"
import { allCourses, courses,reviews } from "@/lib/data"

export default function CourseDetailsPage({ params }) {
  
  const courseId = Number.parseInt(params.id)
  const course = allCourses.find((c) => c.id === courseId) || courses[0]
  console.log(course);

  return (
    <>
      

      {/* Course Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  Courses
                </Link>
                <span className="text-sm text-muted-foreground">/</span>
                <Link
                  href={`/courses?category=${course.category}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {course.category}
                </Link>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= course.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last updated {course.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{course.instructor}</p>
                    <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through ml-2">${course.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant="secondary">{course.discountPercentage}% off</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Sale ends in 2 days!</p>
                  <Button className="w-full mb-4">Enroll Now</Button>                  
                  <Button disabled className="w-full mb-4">Start Learning</Button>
                  <p className="text-center text-sm text-muted-foreground mb-6">30-Day Money-Back Guarantee</p>
                  <div className="space-y-4">
                    <h3 className="font-medium">This course includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {course.lessons} lessons
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        {course.resources} downloadable resources
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        Direct instructor support
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      {/* <main className="flex-1 py-8">
        <div className="container">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full max-w-md grid grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="curriculum" className="py-2">
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="instructor" className="py-2">
                Instructor
              </TabsTrigger>
              <TabsTrigger value="reviews" className="py-2">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                    <div className="space-y-4">
                      <p>{course.fullDescription}</p>
                      <p>
                        By the end of this course, you'll have the skills and knowledge to build professional-grade
                        applications and advance your career in {course.category}.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Who this course is for</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {course.targetAudience.map((audience, index) => (
                        <li key={index}>{audience}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Difficulty</span>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Language</span>
                          <span className="text-sm font-medium">English</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Captions</span>
                          <span className="text-sm font-medium">Yes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Lessons</span>
                          <span className="text-sm font-medium">{course.lessons}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Hours</span>
                          <span className="text-sm font-medium">{course.totalHours} hours</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-2">Skills you'll gain</h3>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Course Content</h2>
                  <div className="text-sm text-muted-foreground">
                    {course.sections.length} sections • {course.lessons} lessons • {course.totalHours} hours total
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {course.sections.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {section.lessons.length} lessons • {section.duration}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-2 rounded hover:bg-muted"
                            >
                              <div className="flex items-center gap-2">
                                {lesson.type === "video" ? (
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
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                ) : (
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
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                  </svg>
                                )}
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="instructor" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{course.instructor}</h2>
                      <p className="text-muted-foreground">{course.instructorTitle}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.instructorRating} Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{course.instructorReviews} Reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{course.instructorStudents} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{course.instructorCourses} Courses</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p>{course.instructorBio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Feedback</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold">{course.rating}</div>
                          <div className="flex flex-col">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${
                                    star <= course.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">Course Rating</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="text-sm font-medium w-2">{rating}</div>
                              <Star className="h-4 w-4 text-muted-foreground" />
                              <Progress
                                value={(course.ratingBreakdown[rating] / course.reviewCount) * 100}
                                className="h-2 flex-1"
                              />
                              <div className="text-sm text-muted-foreground w-10">
                                {Math.round((course.ratingBreakdown[rating] / course.reviewCount) * 100)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Write a Review</CardTitle>
                        <CardDescription>Share your experience with this course</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Rating</label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} className="h-8 w-8 flex items-center justify-center">
                                  <Star className="h-6 w-6 text-muted-foreground" />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Review</label>
                            <textarea
                              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Write your review here..."
                            />
                          </div>
                          <Button className="w-full">Submit Review</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main> */}
      
    </>
  )
}

// Sample data
