"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  Briefcase,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
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

export default function JobsPage() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])

  const toggleJobSelection = (jobId: string) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId))
    } else {
      setSelectedJobs([...selectedJobs, jobId])
    }
  }

  const toggleAllJobs = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(jobs.map((job) => job.id))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Link href="/admin/jobs/new">
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                Add Job
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search jobs..." className="w-full pl-8" />
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
                    <Checkbox id="filter-type-fulltime" className="mr-2" />
                    <label htmlFor="filter-type-fulltime">Full-time</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-type-parttime" className="mr-2" />
                    <label htmlFor="filter-type-parttime">Part-time</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-type-contract" className="mr-2" />
                    <label htmlFor="filter-type-contract">Contract</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-type-remote" className="mr-2" />
                    <label htmlFor="filter-type-remote">Remote</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-active" className="mr-2" />
                    <label htmlFor="filter-status-active">Active</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-expired" className="mr-2" />
                    <label htmlFor="filter-status-expired">Expired</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Checkbox id="filter-status-draft" className="mr-2" />
                    <label htmlFor="filter-status-draft">Draft</label>
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
                  <SelectItem value="applications">Most Applications</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedJobs.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedJobs.length} selected</span>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Briefcase className="h-4 w-4" />
                Approve Selected
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
                <CardTitle>All Jobs</CardTitle>
                <CardDescription>Manage job postings on your platform</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{jobs.length} total</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedJobs.length === jobs.length && jobs.length > 0}
                      onCheckedChange={toggleAllJobs}
                    />
                  </TableHead>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center gap-1">
                      Job
                      <Button variant="ghost" size="sm" className="h-8 p-0 ml-1">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Company</div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={() => toggleJobSelection(job.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{job.title}</span>
                        <span className="text-xs text-muted-foreground">{job.salary}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={job.companyLogo} alt={job.company} />
                          <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{job.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.type}</Badge>
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          job.status === "Active" ? "success" : job.status === "Draft" ? "secondary" : "destructive"
                        }
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applications}</TableCell>
                    <TableCell>{job.postedDate}</TableCell>
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
                          <DropdownMenuItem>
                            <Link href={`/admin/jobs/${job.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/admin/jobs/${job.id}/edit`} className="flex w-full items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Job
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {job.status !== "Active" && (
                            <DropdownMenuItem>
                              <Briefcase className="mr-2 h-4 w-4" />
                              Activate Job
                            </DropdownMenuItem>
                          )}
                          {job.status === "Active" && <DropdownMenuItem>Deactivate Job</DropdownMenuItem>}
                          <DropdownMenuItem>View Applicants</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Job
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
            Showing <strong>1-10</strong> of <strong>30</strong> jobs
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
        </div>
      </div>
    </div>
  )
}

// Sample data
const jobs = [
  {
    id: "1",
    title: "Senior Data Scientist",
    company: "DataViz Inc.",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Remote",
    salary: "$120k-$150k",
    status: "Active",
    applications: 28,
    postedDate: "Mar 5, 2025",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "New York, NY",
    salary: "$90k-$110k",
    status: "Active",
    applications: 42,
    postedDate: "Feb 28, 2025",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignHub",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Contract",
    location: "San Francisco, CA",
    salary: "$60/hr",
    status: "Active",
    applications: 15,
    postedDate: "Mar 1, 2025",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Remote",
    salary: "$100k-$130k",
    status: "Draft",
    applications: 0,
    postedDate: "Not posted",
  },
  {
    id: "5",
    title: "Marketing Manager",
    company: "GrowthCo",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Chicago, IL",
    salary: "$80k-$100k",
    status: "Active",
    applications: 18,
    postedDate: "Feb 20, 2025",
  },
  {
    id: "6",
    title: "Product Manager",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Austin, TX",
    salary: "$110k-$140k",
    status: "Active",
    applications: 32,
    postedDate: "Feb 15, 2025",
  },
  {
    id: "7",
    title: "Content Writer",
    company: "ContentKing",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Part-time",
    location: "Remote",
    salary: "$30/hr",
    status: "Active",
    applications: 24,
    postedDate: "Mar 2, 2025",
  },
  {
    id: "8",
    title: "Mobile Developer",
    company: "AppWorks",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Seattle, WA",
    salary: "$95k-$120k",
    status: "Expired",
    applications: 37,
    postedDate: "Jan 10, 2025",
  },
  {
    id: "9",
    title: "Data Analyst",
    company: "DataViz Inc.",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Boston, MA",
    salary: "$75k-$95k",
    status: "Active",
    applications: 21,
    postedDate: "Feb 25, 2025",
  },
  {
    id: "10",
    title: "Sales Representative",
    company: "SalesPro",
    companyLogo: "/placeholder.svg?height=24&width=24",
    type: "Full-time",
    location: "Miami, FL",
    salary: "$60k-$80k + Commission",
    status: "Draft",
    applications: 0,
    postedDate: "Not posted",
  },
]

