"use client"

import {
  GenerateReportFormValues,
  generateReportSchema,
} from "@/app/schemas/report.schema"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { generateReportAction } from "@/lib/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileBarChartIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export function GenerateReportSheet() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<GenerateReportFormValues>({
    resolver: zodResolver(generateReportSchema),
    defaultValues: {
      name: "",
      format: "PDF",
    },
  })

  async function onSubmit(values: GenerateReportFormValues) {
    const result = await generateReportAction(values)

    if (result.ok) {
      toast.success("Report generated and saved.")
      setOpen(false)
      form.reset({ name: "", format: "PDF" })
      router.refresh()
      return
    }

    toast.error("Failed to generate report", {
      description: result.message,
    })
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} data-testid="generate-report-button">
        <FileBarChartIcon className="mr-2 size-4" />
        Generate New Report
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Generate New Report</SheetTitle>
            <SheetDescription>
              Create a named report archive in CSV, Excel, or PDF format. The
              file is saved on the server for later download.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-5 p-4"
          >
            <Field>
              <FieldLabel htmlFor="name">Report Name</FieldLabel>
              <Input
                id="name"
                placeholder="Q1 Stock Movement Report"
                className="h-11"
                autoComplete="off"
                data-testid="generate-report-name-input"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="format">Format</FieldLabel>
              <Controller
                name="format"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="format" className="h-11 w-full" data-testid="generate-report-format-select">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                      <SelectItem value="EXCEL">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.format && (
                <FieldError>{form.formState.errors.format.message}</FieldError>
              )}
            </Field>

            <SheetFooter className="gap-2 p-0 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={form.formState.isSubmitting}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting} data-testid="generate-report-submit">
                {form.formState.isSubmitting ? "Generating..." : "Generate"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
