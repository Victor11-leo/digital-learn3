import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const getUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("users")
      .collect();
    return data;
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
    userId: v.string(),
    role:v.string(),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.insert("users",{
        name:args.name,
        email:args.email,
        image:args.image,
        userId:args.userId,
        role:args.role,
    })

    return data;
  },
});

export const updateUser = mutation({
  args: {
    id:v.id("users"),
    role:v.string(),
  },
  handler: async (ctx, args) => {
    const {id,role} = args
    const data = await ctx.db.patch(id,{role})
      
    return data;
  },
});

export const deleteUser = mutation({
  args: {
    id:v.id("users"),
  },
  handler: async (ctx, args) => {
    const {id,} = args
    const data = await ctx.db.delete(id)      
    return data;
  },
});