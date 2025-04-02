import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

const CourseCard = ({course}) => {
  return (
    <Card key={course.id} className="overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
            <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="object-cover w-full h-full transition-all hover:scale-105"
            />
        </div>
        <CardHeader>
            <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {course.category}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">{course.duration}</span>
            </div>
            <CardTitle className="line-clamp-1">{course.title}</CardTitle>
            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-2">
            <User/>
            <span className="text-sm font-medium">{course.instructor}</span>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <div className="flex items-center">
            <span className="text-lg font-bold">Ksh {course.price}</span>
            {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">Kshs {course.originalPrice}</span>
            )}
            </div>
            <Link href={`/courses/${course.id}`}>
            <Button variant="outline" size="sm">
                View Course
            </Button>
            </Link>
        </CardFooter>
        </Card>
  )
}

export default CourseCard