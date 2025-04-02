
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import Header from "@/components/global/Header"
import Footer from '@/components/global/Footer'
import CourseCard from "@/components/global/cards/CourseCard"

import {categories,levels,durations,prices,allCourses} from '@/lib/data'

export default function CoursesPage() {
  return (
    <>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
              <p className="text-muted-foreground mt-2">
                Browse our collection of high-quality courses taught by industry experts
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                Category: Development
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
                Level: Beginner
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

            {/* Course Categories */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 h-auto">
                <TabsTrigger value="all" className="py-2">
                  All
                </TabsTrigger>
                <TabsTrigger value="development" className="py-2">
                  Development
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
                  {allCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="development" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCourses
                    .filter((course) => course.category === "Development")
                    .map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCourses
                    .filter((course) => course.category === "Design")
                    .map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCourses
                    .filter((course) => course.category === "Business")
                    .map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 py-4">
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
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                ...
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                4
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                5
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground p-0">
                6
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                7
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                8
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                ...
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                12
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
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}


