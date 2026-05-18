import { z } from "zod"

export const reportFormats = ["CSV", "PDF", "EXCEL"] as const

export const generateReportSchema = z.object({
  name: z.string().trim().min(1, "Report name is required."),
  format: z.enum(reportFormats, {
    message: "Please select a format.",
  }),
})

export type GenerateReportFormValues = z.infer<typeof generateReportSchema>
