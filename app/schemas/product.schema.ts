import { z } from "zod"

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters.")
    .max(120, "Product name must be at most 120 characters."),

  sku: z
    .string()
    .trim()
    .toUpperCase()
    .min(5, "SKU must be at least 5 characters.")
    .max(50, "SKU must be at most 50 characters.")
    .regex(/^SKU-[A-Z0-9-]+$/, {
      message:
        "SKU must be in SKU-CODE format. Example: SKU-001 or SKU-MOUSE01.",
    }),

  categoryId: z.string().min(1, "Please select a category."),

  costPrice: z
    .string()
    .min(1, "Cost price is required.")
    .refine((value) => Number(value) >= 0, {
      message: "Cost price must be 0 or greater.",
    }),

  salesPrice: z
    .string()
    .min(1, "Sales price is required.")
    .refine((value) => Number(value) >= 0, {
      message: "Sales price must be 0 or greater.",
    }),
})

export type CreateProductFormValues = z.infer<typeof createProductSchema>

export const editProductSchema = createProductSchema.extend({
    id: z.number(),
})

export type EditProductFormValues = z.infer<typeof editProductSchema>