import {z} from "zod";

const textLimit = 65535; // text (databse field)

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1).max(textLimit),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1).max(textLimit).optional(),
  userId: z
    .string()
    .min(1, "AssignedTo userId is required.")
    .max(255)
    .optional() // creating or updating issue (title, description)
    .nullable(), // un-assign user issue
});
