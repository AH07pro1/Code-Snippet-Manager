import z from "zod";
const snippetSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  language: z.string().min(1, { message: "Language is required" }).optional(),
});

export default snippetSchema;