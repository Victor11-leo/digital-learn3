export const categories = ["Development", "Design", "Business", "Marketing", "Photography", "Music", "Health & Fitness"]

export const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

export const durations = ["0-2 hours", "3-6 hours", "7-16 hours", "17+ hours"]

export const prices = ["Free", "Paid", "Under $50", "Under $100"]

export const allCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
    category: "Development",
    duration: "8 weeks",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 342,
    level: "Beginner",
  },
  {
    id: 2,
    title: "Data Science Essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D",
    category: "Development",
    duration: "10 weeks",
    instructor: "Michael Chen",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 59.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 256,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Learn to create beautiful, user-friendly interfaces that delight users.",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VUklMkZVWCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Design",
    duration: "6 weeks",
    instructor: "Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 39.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewCount: 189,
    level: "Beginner",
  },
  {
    id: 4,
    title: "Advanced React Development",
    description: "Take your React skills to the next level with advanced patterns and techniques.",
    image: "https://images.unsplash.com/photo-1644938297138-fde22c59b32c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3QlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Development",
    duration: "8 weeks",
    instructor: "David Kim",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviewCount: 215,
    level: "Advanced",
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    description: "Learn the essential strategies and tools for effective digital marketing.",
    image: "https://plus.unsplash.com/premium_photo-1684341008757-3b456034e943?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Business",
    duration: "5 weeks",
    instructor: "Jessica Martinez",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 44.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 178,
    level: "Beginner",
  },
  {
    id: 6,
    title: "Mobile App Design",
    description: "Master the principles of designing intuitive and engaging mobile applications.",
    image: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlJTIwYXBwJTIwZGVzaWdufGVufDB8fDB8fHww",
    category: "Design",
    duration: "7 weeks",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 54.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 156,
    level: "Intermediate",
  },
  {
    id: 7,
    title: "Business Analytics",
    description: "Learn how to analyze business data to make informed strategic decisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3MlMjBhbmFseXRpY3N8ZW58MHx8MHx8fDA%3D",
    category: "Business",
    duration: "9 weeks",
    instructor: "Robert Wilson",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 64.99,
    originalPrice: 139.99,
    rating: 4.7,
    reviewCount: 132,
    level: "Intermediate",
  },
  {
    id: 8,
    title: "Full-Stack JavaScript Development",
    description: "Build complete web applications with JavaScript, Node.js, and MongoDB.",
    image: "https://plus.unsplash.com/premium_photo-1720551256983-445d23d516b2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVsbCUyMHN0YWNrJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
    category: "Development",
    duration: "12 weeks",
    instructor: "Sophia Lee",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 79.99,
    originalPrice: 169.99,
    rating: 4.9,
    reviewCount: 287,
    level: "Advanced",
  },
  {
    id: 9,
    title: "Graphic Design for Beginners",
    description: "Learn the fundamentals of graphic design and create stunning visuals.",
    image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVsbCUyMHN0YWNrJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
    category: "Design",
    duration: "6 weeks",
    instructor: "Marcus Johnson",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 34.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 145,
    level: "Beginner",
  },
]

export const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    fullDescription:
      "This comprehensive course will take you from a complete beginner to a confident web developer. You'll learn how to create responsive websites using HTML5, style them with CSS3, and add interactivity with JavaScript. Through hands-on projects and real-world examples, you'll gain practical experience that you can immediately apply to your own projects.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Development",
    duration: "8 weeks",
    totalHours: 24,
    lessons: 42,
    resources: 15,
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    instructorTitle: "Senior Web Developer & Educator",
    instructorBio:
      "Sarah has over 10 years of experience in web development and has worked with companies like Google and Facebook. She's passionate about teaching and has helped thousands of students launch their careers in tech.",
    instructorRating: 4.9,
    instructorReviews: 1245,
    instructorStudents: 15420,
    instructorCourses: 8,
    price: 49.99,
    originalPrice: 99.99,
    discountPercentage: 50,
    rating: 4.8,
    reviewCount: 342,
    ratingBreakdown: {
      5: 280,
      4: 42,
      3: 12,
      2: 5,
      1: 3,
    },
    enrolledStudents: 4256,
    level: "Beginner",
    lastUpdated: "March 2025",
    learningOutcomes: [
      "Build responsive websites using HTML5 and CSS3",
      "Create interactive web pages with JavaScript",
      "Understand web development best practices",
      "Deploy websites to production environments",
      "Optimize websites for performance and SEO",
      "Implement modern UI/UX principles",
      "Debug and troubleshoot common web development issues",
      "Use developer tools effectively",
    ],
    requirements: [
      "No prior programming experience required",
      "Basic computer skills",
      "A computer with internet access",
      "Eagerness to learn and practice",
    ],
    targetAudience: [
      "Beginners with no coding experience",
      "Designers looking to expand their skills",
      "Professionals transitioning to tech careers",
      "Students interested in web development",
      "Anyone who wants to build their own websites",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Accessibility", "Git"],
    sections: [
      {
        title: "Introduction to Web Development",
        duration: "2 hours",
        lessons: [
          {
            title: "Course Overview",
            duration: "5 min",
            type: "video",
            preview: true,
          },
          {
            title: "How the Web Works",
            duration: "15 min",
            type: "video",
            preview: true,
          },
          {
            title: "Setting Up Your Development Environment",
            duration: "20 min",
            type: "video",
            preview: false,
          },
          {
            title: "Web Development Tools",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Section Resources",
            duration: "5 min",
            type: "document",
            preview: false,
          },
        ],
      },
      {
        title: "HTML Fundamentals",
        duration: "4 hours",
        lessons: [
          {
            title: "HTML Document Structure",
            duration: "20 min",
            type: "video",
            preview: false,
          },
          {
            title: "HTML Elements and Attributes",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "Text Formatting",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Links and Navigation",
            duration: "20 min",
            type: "video",
            preview: false,
          },
          {
            title: "Images and Multimedia",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Tables and Forms",
            duration: "35 min",
            type: "video",
            preview: false,
          },
          {
            title: "HTML5 Semantic Elements",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "HTML Practice Exercise",
            duration: "45 min",
            type: "document",
            preview: false,
          },
          {
            title: "Section Resources",
            duration: "10 min",
            type: "document",
            preview: false,
          },
        ],
      },
      {
        title: "CSS Styling",
        duration: "5 hours",
        lessons: [
          {
            title: "Introduction to CSS",
            duration: "20 min",
            type: "video",
            preview: false,
          },
          {
            title: "CSS Selectors",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "Colors and Backgrounds",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Box Model",
            duration: "35 min",
            type: "video",
            preview: false,
          },
          {
            title: "Typography and Text Styling",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "Layout with Flexbox",
            duration: "45 min",
            type: "video",
            preview: false,
          },
          {
            title: "Layout with CSS Grid",
            duration: "45 min",
            type: "video",
            preview: false,
          },
          {
            title: "Responsive Design",
            duration: "40 min",
            type: "video",
            preview: false,
          },
          {
            title: "CSS Animations and Transitions",
            duration: "35 min",
            type: "video",
            preview: false,
          },
          {
            title: "CSS Practice Exercise",
            duration: "45 min",
            type: "document",
            preview: false,
          },
        ],
      },
      {
        title: "JavaScript Basics",
        duration: "6 hours",
        lessons: [
          {
            title: "Introduction to JavaScript",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Variables and Data Types",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "Operators and Expressions",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Control Flow",
            duration: "35 min",
            type: "video",
            preview: false,
          },
          {
            title: "Functions",
            duration: "40 min",
            type: "video",
            preview: false,
          },
          {
            title: "Arrays and Objects",
            duration: "45 min",
            type: "video",
            preview: false,
          },
          {
            title: "DOM Manipulation",
            duration: "50 min",
            type: "video",
            preview: false,
          },
          {
            title: "Events",
            duration: "35 min",
            type: "video",
            preview: false,
          },
          {
            title: "JavaScript Practice Exercise",
            duration: "45 min",
            type: "document",
            preview: false,
          },
        ],
      },
      {
        title: "Building a Complete Website",
        duration: "7 hours",
        lessons: [
          {
            title: "Project Overview",
            duration: "15 min",
            type: "video",
            preview: false,
          },
          {
            title: "Planning and Wireframing",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "Setting Up the Project",
            duration: "20 min",
            type: "video",
            preview: false,
          },
          {
            title: "Building the HTML Structure",
            duration: "45 min",
            type: "video",
            preview: false,
          },
          {
            title: "Styling with CSS",
            duration: "60 min",
            type: "video",
            preview: false,
          },
          {
            title: "Adding Interactivity with JavaScript",
            duration: "60 min",
            type: "video",
            preview: false,
          },
          {
            title: "Making the Website Responsive",
            duration: "45 min",
            type: "video",
            preview: false,
          },
          {
            title: "Testing and Debugging",
            duration: "30 min",
            type: "video",
            preview: false,
          },
          {
            title: "Deployment",
            duration: "25 min",
            type: "video",
            preview: false,
          },
          {
            title: "Final Project Submission",
            duration: "10 min",
            type: "document",
            preview: false,
          },
        ],
      },
    ],
  },
]

export const reviews = [
    {
      name: "John Smith",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I went from knowing nothing about web development to building my own portfolio website. Highly recommended!",
    },
    {
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great course for beginners. The projects are practical and helped me apply what I learned. I would have liked more advanced JavaScript content, but overall it's a solid introduction to web development.",
    },
    {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "2 months ago",
      comment:
        "Sarah is an amazing instructor! Her explanations are clear and concise. The course content is well-structured and the pace is perfect. I've taken several web development courses, and this is by far the best one for beginners.",
    },
    {
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "3 months ago",
      comment:
        "I had tried learning web development on my own but always got stuck. This course provided the structure I needed. The projects are challenging but doable, and I feel much more confident in my skills now.",
    },
    {
      name: "David Kim",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 3,
      date: "3 months ago",
      comment:
        "The content is good, but some sections feel rushed. I would have appreciated more in-depth explanations of certain JavaScript concepts. The HTML and CSS sections are excellent though.",
    },
]

export const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Engineer at Google",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "Digital Learn helped me transition from a marketing role to a software engineer. The courses were comprehensive and the job board connected me directly with employers.",
    },
    {
      name: "Priya Sharma",
      role: "Data Analyst at Microsoft",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "I completed the Data Science track and landed my dream job within two months. The hands-on projects really prepared me for real-world challenges.",
    },
    {
      name: "Marcus Johnson",
      role: "UX Designer at Adobe",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "The design courses on Digital Learn are top-notch. I was able to build a portfolio that impressed employers and secured multiple job offers.",
    },
]

export const allJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    category: "Tech",
    description: "We're looking for an experienced frontend developer with React expertise to join our growing team.",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=40&width=40",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $110k",
    posted: "1 week ago",
    category: "Design",
    description: "Join our creative team to design beautiful and intuitive user experiences for our clients.",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateCo",
    logo: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "3 days ago",
    category: "Business",
    description: "Lead product development and strategy for our flagship SaaS platform.",
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "DataSystems",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $130k",
    posted: "5 days ago",
    category: "Tech",
    description: "Develop and maintain our cloud infrastructure and backend services.",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "GrowthLabs",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70k - $90k",
    posted: "1 day ago",
    category: "Business",
    description: "Drive our digital marketing campaigns and help us reach new audiences.",
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppWorks",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $140k",
    posted: "4 days ago",
    category: "Tech",
    description: "Build innovative mobile applications for iOS and Android platforms.",
  },
  {
    id: 7,
    title: "Graphic Designer",
    company: "CreativeStudio",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Austin, TX",
    type: "Part-time",
    salary: "$60k - $80k",
    posted: "2 weeks ago",
    category: "Design",
    description: "Create stunning visual assets for our marketing and product teams.",
  },
  {
    id: 8,
    title: "Data Scientist",
    company: "AnalyticsPro",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "3 days ago",
    category: "Tech",
    description: "Analyze complex datasets and build machine learning models to drive business decisions.",
  },
  {
    id: 9,
    title: "Sales Manager",
    company: "RevenuePlus",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Miami, FL",
    type: "Full-time",
    salary: "$100k - $130k + Commission",
    posted: "1 week ago",
    category: "Business",
    description: "Lead our sales team and develop strategies to increase revenue and market share.",
  },
]

export const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"]
export const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Lead"]
export const locations = ["Remote", "Hybrid", "On-site"]
export const salaryRanges = ["$0-$50k", "$50k-$100k", "$100k-$150k", "$150k+"]