import { z } from "zod"

export const movementTypes = ["IN", "OUT", "ADJUSTMENT"] as const

export const recordStockMovementSchema = z.object({
  productId: z.string().min(1, "Please select a product."),
  type: z.enum(movementTypes, {
    message: "Please select a movement type.",
  }),
  quantity: z
    .string()
    .min(1, "Quantity is required.")
    .refine((value) => Number.isInteger(Number(value)) && Number(value) >= 1, {
      message: "Quantity must be a whole number of at least 1.",
    }),
  reason: z.string().trim().min(1, "Reason is required."),
})

export type RecordStockMovementFormValues = z.infer<
  typeof recordStockMovementSchema
>

export type StockMovementApiPayload = {
  productId: number
  type: (typeof movementTypes)[number]
  quantity: number
  reason: string
}

export function toStockMovementPayload(
  values: RecordStockMovementFormValues
): StockMovementApiPayload {
  return {
    productId: Number(values.productId),
    type: values.type,
    quantity: Number(values.quantity),
    reason: values.reason.trim(),
  }
}

export function normalizeStockMovementInput(
  input: RecordStockMovementFormValues | RecordStockMovementFormValues[]
): RecordStockMovementFormValues {
  if (Array.isArray(input)) {
    const first = input[0]
    if (!first) {
      throw new Error("Invalid stock movement payload")
    }
    return first
  }
  return input
}

export const updateStockThresholdSchema = z.object({
  productId: z.number(),
  minThreshold: z
    .string()
    .min(1, "Minimum threshold is required.")
    .refine(
      (value) =>
        Number.isInteger(Number(value)) && Number(value) >= 0,
      { message: "Threshold must be a whole number of 0 or greater." }
    ),
})

export type UpdateStockThresholdFormValues = z.infer<
  typeof updateStockThresholdSchema
>
