import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required."),
  description: z.string().trim().min(1, "Description is required."),
})

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>

export const editCategorySchema = createCategorySchema.extend({
  id: z.number(),
})

export type EditCategoryFormValues = z.infer<typeof editCategorySchema>
