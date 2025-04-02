import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const createCourses = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.insert("courses",{
      title:args.title,
      description:args.description,
      fullDescription:args.fullDescription,
      image:args.image,
      category:args.category,
      level:args.level,
      status:args.status,
      skills:args.skills,
      learningObjectives:args.learningObjectives,
      curriculum:args.curriculum,
      rating:args.rating,
      teacher:args.teacher,
      reviews:args.reviews,
      students:args.students,
    })
    return data;
  },
});

export const getCourses = query({
  args: {},
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("courses")
      .collect();
    return data;
  },
});

export const getCourse = query({
  args: {
    id:v.id("courses")
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.id)
    return data;
  },
});

// export const updateCourse = mutation({
//   args: {
//     id:v.id("courses"),
//     role:v.string(),
//   },
//   handler: async (ctx, args) => {
//     const {id,role} = args
//     const data = await ctx.db.patch(id,{role})
      
//     return data;
//   },
// });

export const deleteCourse = mutation({
  args: {
    id:v.id("courses"),
  },
  handler: async (ctx, args) => {
    const {id,} = args
    const data = await ctx.db.delete(id)      
    return data;
  },
});

