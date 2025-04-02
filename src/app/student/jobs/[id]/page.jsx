import Link from "next/link"
import { ArrowLeft, Briefcase, Clock, DollarSign, MapPin, Share2, Building, GraduationCap, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/global/Header"
import Footer from "@/components/global/Footer"

// Sample job data - in a real app, this would come from a database
const job = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp",
  logo: "/placeholder.svg?height=80&width=80",
  location: "Remote",
  type: "Full-time",
  salary: "$120k - $150k",
  posted: "2 days ago",
  category: "Tech",
  description: "We're looking for an experienced frontend developer with React expertise to join our growing team.",
  about:
    "TechCorp is a leading technology company specializing in building innovative web applications for enterprise clients. With a team of over 200 professionals worldwide, we're dedicated to creating cutting-edge solutions that transform businesses.",
  responsibilities: [
    "Develop and maintain high-quality frontend applications using React, Next.js, and TypeScript",
    "Collaborate with designers, product managers, and backend developers to implement new features",
    "Write clean, maintainable, and efficient code with proper documentation",
    "Participate in code reviews and provide constructive feedback to other developers",
    "Optimize applications for maximum speed and scalability",
    "Stay up-to-date with emerging trends and technologies in frontend development",
  ],
  requirements: [
    "5+ years of experience in frontend development",
    "3+ years of experience with React and modern JavaScript (ES6+)",
    "Strong understanding of TypeScript, HTML5, CSS3, and responsive design",
    "Experience with Next.js, state management libraries (Redux, Zustand, etc.)",
    "Familiarity with testing frameworks (Jest, React Testing Library)",
    "Knowledge of CI/CD pipelines and version control systems (Git)",
    "Excellent problem-solving skills and attention to detail",
    "Strong communication skills and ability to work in a team environment",
  ],
  benefits: [
    "Competitive salary and equity options",
    "Flexible remote work policy",
    "Comprehensive health, dental, and vision insurance",
    "401(k) matching program",
    "Professional development budget",
    "Unlimited PTO policy",
    "Home office stipend",
    "Regular team retreats and events",
  ],
  skills: ["React", "TypeScript", "Next.js", "CSS", "HTML", "JavaScript", "Redux", "Git", "Jest", "API Integration"],
}

// Similar jobs data
const similarJobs = [
  {
    id: 4,
    title: "Frontend Developer",
    company: "WebSolutions",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $110k",
    posted: "1 week ago",
  },
  {
    id: 5,
    title: "React Developer",
    company: "AppWorks",
    logo: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "3 days ago",
  },
  {
    id: 6,
    title: "UI Engineer",
    company: "DesignTech",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    type: "Contract",
    salary: "$110k - $140k",
    posted: "5 days ago",
  },
]

export default function JobDetailPage({ params }) {
  return (
    <div className="flex flex-col min-h-screen p-4">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Back Button */}
            <div className="lg:col-span-3">
              <Link
                href="/jobs"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Jobs
              </Link>
            </div>

            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <Avatar className="h-16 w-16 rounded-md">
                  <AvatarImage src={job.logo} alt={job.company} />
                  <AvatarFallback className="rounded-md">{job.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{job.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.type}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.salary}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Posted {job.posted}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="flex-1 sm:flex-none">
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                  Save Job
                </Button>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Responsibilities:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Requirements:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Benefits:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.benefits.map((item, index) => (
                        <li key={index} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* About Company */}
              <Card>
                <CardHeader>
                  <CardTitle>About {job.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.about}</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                  <CardDescription>Submit your application now</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Company Size</p>
                      <p className="text-sm text-muted-foreground">201-500 employees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Industry</p>
                      <p className="text-sm text-muted-foreground">Information Technology</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Founded</p>
                      <p className="text-sm text-muted-foreground">2015</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarJobs.map((job) => (
                    <div key={job.id} className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback className="rounded-md">{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <Link href={`/jobs/${job.id}`} className="font-medium hover:text-primary">
                          {job.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{job.location}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

