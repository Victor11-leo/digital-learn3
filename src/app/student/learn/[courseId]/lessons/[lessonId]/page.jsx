import { redirect } from "next/navigation"

export default function LessonPage({ params }) {
  // This page redirects to the main course page with the specific lesson selected
  // In a real application, you would store the current lesson in state or a database
  return redirect(`/learn/${params.courseId}?lesson=${params.lessonId}`)
}

