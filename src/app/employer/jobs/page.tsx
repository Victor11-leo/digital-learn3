import Link from "next/link"
import { Search, SlidersHorizontal, MapPin, Briefcase, Clock, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import JobCard from "@/components/global/cards/JobCard"

import { allJobs,jobTypes,experienceLevels,locations,salaryRanges } from "@/lib/data"
import Header from "@/components/global/Header"
import Footer from "@/components/global/Footer"

// Job Card Component

export default function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
              <p className="text-muted-foreground mt-2">Find opportunities that match your skills and career goals</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search jobs..." className="w-full pl-8" />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  </SelectContent>
                </Select>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Jobs</SheetTitle>
                      <SheetDescription>Narrow down jobs based on your preferences</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Job Type</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {jobTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`type-${type}`}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor={`type-${type}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Experience Level</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {experienceLevels.map((level) => (
                            <div key={level} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`level-${level}`}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor={`level-${level}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {level}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Location</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {locations.map((location) => (
                            <div key={location} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`location-${location}`}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor={`location-${location}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {location}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Salary Range</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {salaryRanges.map((range) => (
                            <div key={range} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`salary-${range}`}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor={`salary-${range}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {range}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline">Reset</Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                Job Type: Full-time
                <button className="ml-1 rounded-full hover:bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Remove filter</span>
                </button>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                Location: Remote
                <button className="ml-1 rounded-full hover:bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Remove filter</span>
                </button>
              </Badge>
              <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">
                Clear All
              </Button>
            </div>

            {/* Job Categories */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 h-auto">
                <TabsTrigger value="all" className="py-2">
                  All Jobs
                </TabsTrigger>
                <TabsTrigger value="tech" className="py-2">
                  Tech
                </TabsTrigger>
                <TabsTrigger value="design" className="py-2">
                  Design
                </TabsTrigger>
                <TabsTrigger value="business" className="py-2">
                  Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tech" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allJobs
                    .filter((job) => job.category === "Tech")
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allJobs
                    .filter((job) => job.category === "Design")
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allJobs
                    .filter((job) => job.category === "Business")
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" aria-current="page">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  4
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  5
                </Button>
                <Button variant="outline" size="icon">
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="sr-only">Next</span>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

