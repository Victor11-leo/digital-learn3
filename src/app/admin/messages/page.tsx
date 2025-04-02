"use client"

import { useState } from "react"
import {
  Archive,
  ArrowUpDown,
  ChevronDown,
  Download,
  Filter,
  Flag,
  MoreHorizontal,
  Search,
  Trash,
  User,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function MessagesPage() {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [viewMessage, setViewMessage] = useState<any | null>(null)

  const toggleMessageSelection = (messageId: string) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter((id) => id !== messageId))
    } else {
      setSelectedMessages([...selectedMessages, messageId])
    }
  }

  const toggleAllMessages = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(messages.map((message) => message.id))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
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
              <Input type="search" placeholder="Search messages..." className="w-full pl-8" />
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
                    <Checkbox id="filter-type-student" className="mr-2" />
                    <label htmlFor="filter-type-student">Student Messages</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-type-teacher" className="mr-2" />
                    <label htmlFor="filter-type-teacher">Teacher Messages</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-type-employer" className="mr-2" />
                    <label htmlFor="filter-type-employer">Employer Messages</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-unread" className="mr-2" />
                    <label htmlFor="filter-status-unread">Unread</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-read" className="mr-2" />
                    <label htmlFor="filter-status-read">Read</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-flagged" className="mr-2" />
                    <label htmlFor="filter-status-flagged">Flagged</label>
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
                  <SelectItem value="unread">Unread First</SelectItem>
                  <SelectItem value="flagged">Flagged First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedMessages.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedMessages.length} selected</span>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Archive className="h-4 w-4" />
                Archive
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Flag className="h-4 w-4" />
                Flag
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
                <CardTitle>All Messages</CardTitle>
                <CardDescription>Manage platform messages and conversations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{messages.length} total</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedMessages.length === messages.length && messages.length > 0}
                      onCheckedChange={toggleAllMessages}
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center gap-1">
                      From
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center gap-1">To</div>
                  </TableHead>
                  <TableHead>Subject</TableHead>
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
                {messages.map((message) => (
                  <TableRow key={message.id} className={message.status === "Unread" ? "font-medium" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedMessages.includes(message.id)}
                        onCheckedChange={() => toggleMessageSelection(message.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={message.senderAvatar} alt={message.sender} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className={message.status === "Unread" ? "font-medium" : ""}>{message.sender}</span>
                          <span className="text-xs text-muted-foreground">{message.senderRole}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={message.recipientAvatar} alt={message.recipient} />
                          <AvatarFallback>{message.recipient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span>{message.recipient}</span>
                          <span className="text-xs text-muted-foreground">{message.recipientRole}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1 max-w-[200px]">{message.subject}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {message.status === "Unread" && <Badge variant="secondary">Unread</Badge>}
                        {message.flagged && <Badge variant="destructive">Flagged</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>{message.date}</TableCell>
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
                          <DropdownMenuItem onClick={() => setViewMessage(message)}>View Message</DropdownMenuItem>
                          {message.status === "Unread" && <DropdownMenuItem>Mark as Read</DropdownMenuItem>}
                          {message.status === "Read" && <DropdownMenuItem>Mark as Unread</DropdownMenuItem>}
                          {!message.flagged && (
                            <DropdownMenuItem>
                              <Flag className="mr-2 h-4 w-4" />
                              Flag Message
                            </DropdownMenuItem>
                          )}
                          {message.flagged && <DropdownMenuItem>Remove Flag</DropdownMenuItem>}
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Message
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
            Showing <strong>1-10</strong> of <strong>35</strong> messages
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
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              4
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Message Details Dialog */}
      <Dialog open={!!viewMessage} onOpenChange={(open) => !open && setViewMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{viewMessage?.subject}</DialogTitle>
            <DialogDescription>
              Conversation between {viewMessage?.sender} and {viewMessage?.recipient}
            </DialogDescription>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={viewMessage.senderAvatar} alt={viewMessage.sender} />
                    <AvatarFallback>{viewMessage.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{viewMessage.sender}</h3>
                    <p className="text-xs text-muted-foreground">{viewMessage.senderRole}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{viewMessage.date}</div>
              </div>

              <div className="rounded-lg border p-4">
                <p className="whitespace-pre-line">{viewMessage.content}</p>
              </div>

              {viewMessage.replies && viewMessage.replies.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Replies</h4>
                  {viewMessage.replies.map((reply, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={reply.senderAvatar} alt={reply.sender} />
                            <AvatarFallback>{reply.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{reply.sender}</h3>
                            <p className="text-xs text-muted-foreground">{reply.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 ml-10">
                        <p className="whitespace-pre-line">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Reply</h4>
                <Textarea placeholder="Type your reply here..." rows={4} />
              </div>
            </div>
          )}
          <DialogFooter className="flex items-center justify-between">
            <div className="flex gap-2">
              {!viewMessage?.flagged && (
                <Button variant="outline" className="gap-1">
                  <Flag className="h-4 w-4" />
                  Flag
                </Button>
              )}
              {viewMessage?.flagged && (
                <Button variant="outline" className="gap-1">
                  Remove Flag
                </Button>
              )}
              <Button variant="outline" className="gap-1">
                <Archive className="h-4 w-4" />
                Archive
              </Button>
              <Button variant="destructive" className="gap-1">
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </div>
            <Button className="gap-1">
              <User className="h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Sample data
const messages = [
  {
    id: "1",
    sender: "John Smith",
    senderRole: "Student",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Sarah Johnson",
    recipientRole: "Teacher",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Question about JavaScript Assignment",
    content:
      "Hi Sarah,\n\nI'm having trouble with the JavaScript assignment from Week 3. Specifically, I'm not sure how to implement the event listeners for the form submission. Could you provide some guidance or examples?\n\nThanks,\nJohn",
    status: "Unread",
    flagged: false,
    date: "Mar 12, 2025, 10:23 AM",
    replies: [],
  },
  {
    id: "2",
    sender: "Emily Chen",
    senderRole: "Student",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Michael Chen",
    recipientRole: "Teacher",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Feedback on Data Visualization Project",
    content:
      "Hello Michael,\n\nI've submitted my data visualization project and I was wondering if you could provide some feedback on my approach. I'm particularly interested in knowing if my choice of visualization types was appropriate for the dataset.\n\nBest regards,\nEmily",
    status: "Read",
    flagged: false,
    date: "Mar 10, 2025, 2:45 PM",
    replies: [
      {
        sender: "Michael Chen",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content:
          "Hi Emily,\n\nI've reviewed your project and I'm impressed with your work! Your choice of visualization types was spot on for the dataset. The interactive elements you added really enhance the user experience.\n\nI've left more detailed comments in the project submission area.\n\nBest,\nMichael",
        date: "Mar 11, 2025, 9:30 AM",
      },
    ],
  },
  {
    id: "3",
    sender: "David Kim",
    senderRole: "Student",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Emily Rodriguez",
    recipientRole: "Teacher",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Inappropriate Content in Discussion Forum",
    content:
      "Dear Emily,\n\nI wanted to bring to your attention some inappropriate comments in the UX/UI Design course discussion forum. User 'DesignPro123' has been posting offensive content and harassing other students.\n\nCould you please look into this matter?\n\nRegards,\nDavid",
    status: "Unread",
    flagged: true,
    date: "Mar 12, 2025, 8:15 AM",
    replies: [],
  },
  {
    id: "4",
    sender: "Jessica Martinez",
    senderRole: "Teacher",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Admin Team",
    recipientRole: "Admin",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Request for Additional Course Materials",
    content:
      "Hello Admin Team,\n\nI'm teaching the Digital Marketing Fundamentals course and would like to request additional resources for my students. Specifically, I need access to premium marketing tools and case studies.\n\nPlease let me know if this is possible and what the process would be.\n\nThank you,\nJessica Martinez",
    status: "Read",
    flagged: false,
    date: "Mar 9, 2025, 11:20 AM",
    replies: [],
  },
  {
    id: "5",
    sender: "Michael Chen",
    senderRole: "Teacher",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Sophia Lee",
    recipientRole: "Student",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Your Outstanding Performance in Data Science Course",
    content:
      "Hi Sophia,\n\nI wanted to personally reach out and commend you on your exceptional work in the Data Science Essentials course. Your final project was one of the best I've seen, and your contributions to class discussions have been invaluable.\n\nI'd like to discuss potential opportunities for you to serve as a teaching assistant for future cohorts. Please let me know if you're interested.\n\nBest regards,\nMichael Chen",
    status: "Read",
    flagged: false,
    date: "Mar 8, 2025, 3:40 PM",
    replies: [],
  },
  {
    id: "6",
    sender: "Robert Wilson",
    senderRole: "Employer",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Admin Team",
    recipientRole: "Admin",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Issue with Job Posting",
    content:
      "Hello,\n\nI'm having trouble with my job posting for 'Business Analyst' position. The posting is not appearing in search results despite being approved and active.\n\nCan you please investigate this issue?\n\nThank you,\nRobert Wilson\nTalent Acquisition Manager\nDataCorp Analytics",
    status: "Unread",
    flagged: false,
    date: "Mar 12, 2025, 9:05 AM",
    replies: [],
  },
  {
    id: "7",
    sender: "Olivia Thompson",
    senderRole: "Student",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Marcus Johnson",
    recipientRole: "Teacher",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Request for Course Extension",
    content:
      "Dear Marcus,\n\nDue to unexpected personal circumstances, I'm unable to complete the Graphic Design course by the deadline. I've completed 80% of the coursework and would really appreciate a two-week extension to finish the remaining assignments.\n\nPlease let me know if this is possible.\n\nThank you for your understanding,\nOlivia Thompson",
    status: "Read",
    flagged: false,
    date: "Mar 7, 2025, 5:15 PM",
    replies: [],
  },
  {
    id: "8",
    sender: "James Anderson",
    senderRole: "Student",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Admin Team",
    recipientRole: "Admin",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Refund Request",
    content:
      "To whom it may concern,\n\nI would like to request a refund for the Python Programming Masterclass course I purchased yesterday. The course description mentioned advanced topics that are not actually covered in the curriculum.\n\nMy order number is #ORD-12345.\n\nThank you,\nJames Anderson",
    status: "Unread",
    flagged: true,
    date: "Mar 11, 2025, 4:30 PM",
    replies: [],
  },
  {
    id: "9",
    sender: "Alex Thompson",
    senderRole: "Teacher",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "Admin Team",
    recipientRole: "Admin",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Course Update Approval",
    content:
      "Hello Admin Team,\n\nI've made significant updates to my Mobile App Design course to include the latest design trends and tools. The updates are ready for review in the draft version.\n\nCould you please review and approve these changes so I can publish the updated content?\n\nBest regards,\nAlex Thompson",
    status: "Read",
    flagged: false,
    date: "Mar 6, 2025, 1:20 PM",
    replies: [],
  },
  {
    id: "10",
    sender: "Sophia Lee",
    senderRole: "Student",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    recipient: "TechCorp Recruiting",
    recipientRole: "Employer",
    recipientAvatar: "/placeholder.svg?height=40&width=40",
    subject: "Follow-up on Job Application",
    content:
      "Dear TechCorp Recruiting Team,\n\nI recently applied for the Frontend Developer position (Job ID: FE-2025-03) through the Digital Learn job board. I wanted to follow up and express my continued interest in the role.\n\nI've completed several relevant courses on the platform, including Advanced React Development and Full-Stack JavaScript Development, which I believe make me a strong candidate for this position.\n\nThank you for your consideration. I look forward to hearing from you.\n\nBest regards,\nSophia Lee",
    status: "Read",
    flagged: false,
    date: "Mar 5, 2025, 10:45 AM",
    replies: [],
  },
]

