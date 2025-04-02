import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({  
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    userId: v.string(),
    role:v.string(),    
  }).index("by_userId", ["userId"]),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    fullDescription: v.string(),
    image: v.string(),
    category: v.string(),
    level: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
    ),
    status: v.union(
        v.literal("draft"),
        v.literal("published"),        
    ),
    skills: v.array(v.string()),
    learningObjectives: v.array(v.string()),
    curriculum: v.array(v.id("lessons")),
    // relations
    students: v.array(v.id("students")),    
    rating: v.string(),
    teacher: v.id("users"),
    reviews: v.array(v.id("reviews")),
  }),

  lessons:defineTable({
    title:v.string(),
    video:v.string(),
    description:v.string(),
    status: v.union(
        v.literal("draft"),
        v.literal("published"),        
    ),
    quiz:v.optional(v.id('quizes'))
  }),
  quizes:defineTable({
    title:v.string(),
    description:v.optional(v.string()),
    questions:v.array(v.string()),
    answer:v.string(),    
  }),

  students:defineTable({
    user:v.id("users"),
    courses:v.id("courses"),
    completionRate:v.string(),
    startDate:v.string(),
  }),

  teachers:defineTable({
    user:v.id("users"),
    courses:v.id("courses"),
    startDate:v.string(),
  }),

  reviews:defineTable({
    user:v.id("users"),
    courses:v.id("courses"),
    review:v.string(),
  }),

  rating:defineTable({
    user:v.id("users"),
    courses:v.id("courses"),
    review:v.string(),
  }),

  jobs: defineTable({
    title: v.string(),
    company: v.string(),
    logo: v.string(),
    location: v.string(),
    type: v.string(),
    salary: v.string(),
    category: v.string(),
    description: v.string(),
    about: v.string(),
    responsibilities: v.array(v.string()),
    requirements: v.array(v.string()),
    benefits: v.array(v.string()),
    skills: v.array(v.string()),
    applicants:v.id("users"),    
    employer: v.id("users"),
    status:v.string() //ongoing, finished
  }),

  applications:defineTable({
    user:v.id("user"),
    cv:v.string(),
    courses:v.array(v.id("courses")), //skills
    interviewDate:v.optional(v.string()),
    status: v.union(
        v.literal("accepted"),
        v.literal("rejected"),        
        v.literal("pending"),        
    ),
  })
});