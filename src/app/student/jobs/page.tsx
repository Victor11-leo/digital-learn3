import Link from "next/link"
import { Briefcase, Building, Clock, DollarSign, MapPin, Search, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentJobsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Job Opportunities</h2>
            <p className="text-muted-foreground">Find job opportunities that match your skills and interests</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/student/profile">
              <Button variant="outline">Update Resume</Button>
            </Link>
            <Button>Job Alerts</Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search jobs by title, company, or keyword..." className="pl-8" />
          </div>
          <Select defaultValue="location">
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="location">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="experience">
            <SelectTrigger>
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="experience">All Experience Levels</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills Match Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Skills Match</h3>
                <p className="text-muted-foreground">
                  We've found 15 jobs that match your skills based on your completed courses and profile.
                </p>
              </div>
              <Button>View Matched Jobs</Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Categories */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline">Load More Jobs</Button>
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="mt-6">
            <div className="grid gap-6">
              {jobs
                .filter((job) => job.recommended)
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="applied" className="mt-6">
            <div className="grid gap-6">
              {jobs
                .filter((job) => job.applied)
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="grid gap-6">
              {jobs
                .filter((job) => job.saved)
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Career Resources */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Career Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Review</CardTitle>
                <CardDescription>Get expert feedback on your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our career experts will review your resume and provide personalized feedback to help you stand out to
                  employers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Schedule Review
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interview Preparation</CardTitle>
                <CardDescription>Practice for your next interview</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access mock interviews, common questions, and tips to help you prepare for technical and behavioral
                  interviews.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Start Practice
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Career Counseling</CardTitle>
                <CardDescription>Get guidance from industry professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Book a one-on-one session with a career counselor to discuss your career goals and get personalized
                  advice.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Book Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function JobCard({ job }: { job: any }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={job.company}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>{job.company}</span>
                  {job.companyRating && (
                    <>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="ml-1">{job.companyRating}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{job.type}</Badge>
                {job.recommended && <Badge className="bg-green-500">Recommended</Badge>}
                {job.applied && <Badge variant="secondary">Applied</Badge>}
                {job.saved && <Badge variant="outline">Saved</Badge>}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              {job.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-secondary/40">
                  {skill}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link href={`/jobs/${job.id}`}>
                <Button>View Job</Button>
              </Link>
              {!job.applied && <Button variant="outline">Quick Apply</Button>}
              <Button variant="ghost" size="icon">
                <Star className={`h-4 w-4 ${job.saved ? "fill-primary text-primary" : ""}`} />
                <span className="sr-only">{job.saved ? "Unsave" : "Save"}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=64&width=64",
    companyRating: 4.5,
    type: "Full-time",
    location: "Remote",
    salary: "$80k-$100k",
    experience: "2-3 years",
    postedDate: "2 days ago",
    description:
      "We're looking for a skilled Frontend Developer to join our team and help build beautiful, responsive web applications using React, TypeScript, and modern CSS frameworks.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    recommended: true,
    applied: false,
    saved: true,
    skillMatch: 95,
  },
  {
    id: 2,
    title: "Junior Web Developer",
    company: "StartupHub",
    companyLogo: "/placeholder.svg?height=64&width=64",
    companyRating: 4.2,
    type: "Full-time",
    location: "Hybrid - New York, NY",
    salary: "$65k-$80k",
    experience: "0-1 years",
    postedDate: "1 week ago",
    description:
      "Great opportunity for a bootcamp graduate or junior developer to join a fast-growing startup. You'll work on our main product using JavaScript, HTML, CSS, and learn React on the job.",
    skills: ["JavaScript", "HTML", "CSS", "React"],
    recommended: true,
    applied: true,
    saved: false,
    skillMatch: 90,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=64&width=64",
    companyRating: 4.7,
    type: "Contract",
    location: "Remote",
    salary: "$50-$60/hr",
    experience: "3-5 years",
    postedDate: "3 days ago",
    description:
      "We're seeking a Full Stack Developer with experience in React, Node.js, and MongoDB to help build and maintain our SaaS platform. This is a 6-month contract with possibility of extension.",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    recommended: false,
    applied: false,
    saved: true,
    skillMatch: 85,
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "DesignStudio",
    companyLogo: "/placeholder.svg?height=64&width=64",
    companyRating: 4.8,
    type: "Full-time",
    location: "San Francisco, CA",
    salary: "$90k-$110k",
    experience: "2-4 years",
    postedDate: "1 day ago",
    description:
      "Join our creative team as a UX/UI Designer to create intuitive and engaging user experiences for our clients. You'll work closely with developers and product managers to bring designs to life.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    recommended: true,
    applied: false,
    saved: false,
    skillMatch: 80,
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "DataInsights",
    companyLogo: "/placeholder.svg?height=64&width=64",
    companyRating: 4.3,
    type: "Full-time",
    location: "Chicago, IL",
    salary: "$75k-$90k",
    experience: "1-3 years",
    postedDate: "5 days ago",
    description:
      "We're looking for a Data Analyst to help us make sense of complex datasets and provide actionable insights to our clients. You'll work with SQL, Python, and visualization tools.",
    skills: ["SQL", "Python", "Tableau", "Data Visualization"],
    recommended: false,
    applied: true,
    saved: true,
    skillMatch: 75,
  },
]

