import { Skeleton } from "@/components/ui/skeleton"

export default function CourseLearnLoading() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-background z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div>
              <Skeleton className="h-5 w-48 mb-1" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-32 rounded-md hidden md:block" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-5xl py-6">
            {/* Video Player Skeleton */}
            <div className="mb-6">
              <Skeleton className="aspect-video w-full rounded-lg mb-4" />
            </div>

            {/* Lesson Details Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Tabs Skeleton */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2 mb-6">
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
              </div>

              <Skeleton className="h-64 w-full rounded-lg" />
            </div>

            {/* Navigation Buttons Skeleton */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Skeleton className="h-10 w-36 rounded-md" />
              <Skeleton className="h-10 w-36 rounded-md" />
            </div>
          </div>
        </main>

        {/* Course Sidebar Skeleton */}
        <aside className="hidden lg:block w-[350px] border-l overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-2 flex-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="flex-1 p-4 space-y-6">
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-3">
                  <Skeleton className="h-6 w-5/6" />
                  <div className="space-y-2 pl-2">
                    {[1, 2, 3, 4].map((lesson) => (
                      <div key={lesson} className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-full mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

