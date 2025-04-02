"use client"

import { useState } from "react"
import { ArrowUpDown, Check, ChevronDown, Download, Filter, MoreHorizontal, Search, Trash, X } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewsPage() {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])
  const [viewReview, setViewReview] = useState<any | null>(null)

  const toggleReviewSelection = (reviewId: string) => {
    if (selectedReviews.includes(reviewId)) {
      setSelectedReviews(selectedReviews.filter((id) => id !== reviewId))
    } else {
      setSelectedReviews([...selectedReviews, reviewId])
    }
  }

  const toggleAllReviews = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(reviews.map((review) => review.id))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search reviews..." className="w-full pl-8" />
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
                    <Checkbox id="filter-rating-5" className="mr-2" />
                    <label htmlFor="filter-rating-5">5 Stars</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-rating-4" className="mr-2" />
                    <label htmlFor="filter-rating-4">4 Stars</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-rating-3" className="mr-2" />
                    <label htmlFor="filter-rating-3">3 Stars</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-rating-2" className="mr-2" />
                    <label htmlFor="filter-rating-2">2 Stars</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-rating-1" className="mr-2" />
                    <label htmlFor="filter-rating-1">1 Star</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-approved" className="mr-2" />
                    <label htmlFor="filter-status-approved">Approved</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-pending" className="mr-2" />
                    <label htmlFor="filter-status-pending">Pending</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-rejected" className="mr-2" />
                    <label htmlFor="filter-status-rejected">Rejected</label>
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
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="rating-high">Rating: High to Low</SelectItem>
                  <SelectItem value="rating-low">Rating: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedReviews.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedReviews.length} selected</span>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Check className="h-4 w-4" />
                Approve
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <X className="h-4 w-4" />
                Reject
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
                <CardTitle>All Reviews</CardTitle>
                <CardDescription>Manage course reviews and ratings</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{reviews.length} total</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedReviews.length === reviews.length && reviews.length > 0}
                      onCheckedChange={toggleAllReviews}
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center gap-1">
                      User
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Rating
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Date
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedReviews.includes(review.id)}
                        onCheckedChange={() => toggleReviewSelection(review.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{review.userName}</span>
                          <span className="text-xs text-muted-foreground">{review.userEmail}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{review.courseName}</span>
                        <span className="text-xs text-muted-foreground">{review.courseInstructor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
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
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1 max-w-[200px]">{review.comment}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "Approved"
                            ? "success"
                            : review.status === "Pending"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{review.date}</TableCell>
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
                          <DropdownMenuItem onClick={() => setViewReview(review)}>View Details</DropdownMenuItem>
                          {review.status === "Pending" && (
                            <>
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {review.status === "Approved" && (
                            <DropdownMenuItem>
                              <X className="mr-2 h-4 w-4" />
                              Unapprove
                            </DropdownMenuItem>
                          )}
                          {review.status === "Rejected" && (
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Review
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
            Showing <strong>1-10</strong> of <strong>45</strong> reviews
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

      {/* Review Details Dialog */}
      <Dialog open={!!viewReview} onOpenChange={(open) => !open && setViewReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>Review for {viewReview?.courseName}</DialogDescription>
          </DialogHeader>
          {viewReview && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={viewReview.userAvatar} alt={viewReview.userName} />
                  <AvatarFallback>{viewReview.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{viewReview.userName}</h3>
                  <p className="text-sm text-muted-foreground">{viewReview.userEmail}</p>
                </div>
                <div className="ml-auto">
                  <Badge
                    variant={
                      viewReview.status === "Approved"
                        ? "success"
                        : viewReview.status === "Pending"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {viewReview.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Rating:</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star <= viewReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Course:</h4>
                  <p>
                    {viewReview.courseName} by {viewReview.courseInstructor}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Date:</h4>
                  <p>{viewReview.date}</p>
                </div>
                <div>
                  <h4 className="font-medium">Comment:</h4>
                  <p className="whitespace-pre-line">{viewReview.comment}</p>
                </div>
              </div>

              {viewReview.status === "Rejected" && (
                <div className="space-y-2">
                  <h4 className="font-medium">Rejection Reason:</h4>
                  <p>{viewReview.rejectionReason || "No reason provided."}</p>
                </div>
              )}

              {viewReview.status === "Pending" && (
                <div className="space-y-2">
                  <h4 className="font-medium">Rejection Reason (Optional):</h4>
                  <Textarea placeholder="Enter reason for rejection..." />
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex items-center justify-between">
            {viewReview?.status === "Pending" && (
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button className="gap-1">
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
            {viewReview?.status === "Approved" && (
              <Button variant="outline" className="gap-1">
                <X className="h-4 w-4" />
                Unapprove
              </Button>
            )}
            {viewReview?.status === "Rejected" && (
              <Button className="gap-1">
                <Check className="h-4 w-4" />
                Approve
              </Button>
            )}
            <Button variant="destructive" className="gap-1">
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Sample data
const reviews = [
  {
    id: "1",
    userName: "John Smith",
    userEmail: "john.smith@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Web Development Fundamentals",
    courseInstructor: "Sarah Johnson",
    rating: 5,
    comment:
      "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I went from knowing nothing about web development to building my own portfolio website. Highly recommended!",
    status: "Approved",
    date: "Mar 10, 2025",
  },
  {
    id: "2",
    userName: "Emily Chen",
    userEmail: "emily.chen@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Data Science Essentials",
    courseInstructor: "Michael Chen",
    rating: 4,
    comment:
      "Great course for beginners. The projects are practical and helped me apply what I learned. I would have liked more advanced content, but overall it's a solid introduction.",
    status: "Approved",
    date: "Mar 8, 2025",
  },
  {
    id: "3",
    userName: "Michael Johnson",
    userEmail: "michael.johnson@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "UX/UI Design Principles",
    courseInstructor: "Emily Rodriguez",
    rating: 3,
    comment:
      "The content is good, but some sections feel rushed. I would have appreciated more in-depth explanations of certain concepts. The practical exercises are excellent though.",
    status: "Pending",
    date: "Mar 12, 2025",
  },
  {
    id: "4",
    userName: "Sophia Rodriguez",
    userEmail: "sophia.rodriguez@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Advanced React Development",
    courseInstructor: "David Kim",
    rating: 5,
    comment:
      "Excellent advanced course! David really knows his stuff and explains complex React patterns clearly. The projects are challenging but doable, and I learned so much. Highly recommended for anyone looking to level up their React skills.",
    status: "Approved",
    date: "Mar 5, 2025",
  },
  {
    id: "5",
    userName: "David Kim",
    userEmail: "david.kim@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Digital Marketing Fundamentals",
    courseInstructor: "Jessica Martinez",
    rating: 2,
    comment:
      "The course content is outdated. Many of the strategies and tools mentioned are no longer relevant in today's digital marketing landscape. I expected more current information.",
    status: "Rejected",
    rejectionReason: "Review contains inaccurate information about course content.",
    date: "Mar 7, 2025",
  },
  {
    id: "6",
    userName: "Jessica Martinez",
    userEmail: "jessica.martinez@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Mobile App Design",
    courseInstructor: "Alex Thompson",
    rating: 5,
    comment:
      "This course is fantastic! Alex is an amazing instructor who breaks down complex design concepts into easy-to-understand lessons. The projects are well-structured and helped me build a strong portfolio. I've already landed a job interview thanks to what I learned!",
    status: "Pending",
    date: "Mar 11, 2025",
  },
  {
    id: "7",
    userName: "Alex Thompson",
    userEmail: "alex.thompson@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Business Analytics",
    courseInstructor: "Robert Wilson",
    rating: 4,
    comment:
      "Solid course with practical examples. Robert explains complex analytics concepts clearly. The Excel and Tableau sections were particularly helpful. Would recommend for anyone looking to get into business analytics.",
    status: "Approved",
    date: "Mar 3, 2025",
  },
  {
    id: "8",
    userName: "Robert Wilson",
    userEmail: "robert.wilson@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Full-Stack JavaScript Development",
    courseInstructor: "Sophia Lee",
    rating: 1,
    comment:
      "This course is a complete waste of money. The instructor rushes through important concepts and the code examples don't even work. Save your money and find a better course.",
    status: "Rejected",
    rejectionReason: "Review violates community guidelines with inappropriate language and tone.",
    date: "Mar 9, 2025",
  },
  {
    id: "9",
    userName: "Olivia Thompson",
    userEmail: "olivia.thompson@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Graphic Design for Beginners",
    courseInstructor: "Marcus Johnson",
    rating: 5,
    comment:
      "As someone with zero design experience, this course was perfect! Marcus is patient and thorough in his explanations. I now feel confident using design software and understanding basic design principles. The projects were fun and helped reinforce what I learned.",
    status: "Approved",
    date: "Mar 2, 2025",
  },
  {
    id: "10",
    userName: "James Anderson",
    userEmail: "james.anderson@example.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    courseName: "Python Programming Masterclass",
    courseInstructor: "Olivia Thompson",
    rating: 4,
    comment:
      "Great comprehensive Python course. Covers everything from basics to advanced topics like machine learning integration. The only reason I'm not giving 5 stars is that some of the later sections felt a bit rushed. Overall, excellent value for money.",
    status: "Pending",
    date: "Mar 12, 2025",
  },
]

