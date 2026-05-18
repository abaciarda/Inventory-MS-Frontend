"use client"

import {
  EditCategoryFormValues,
  editCategorySchema,
} from "@/app/schemas/category.schema"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { updateCategoryAction } from "@/lib/actions"
import { cn } from "@/lib/utils"
import type { Category } from "@/types/app.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function EditCategoryForm({ category }: { category: Category }) {
  const router = useRouter()

  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      description: category.description,
    },
  })

  async function onSubmit(values: EditCategoryFormValues) {
    const result = await updateCategoryAction(values)

    if (result.ok) {
      toast.success("Category updated.")
      router.push("/categories")
      router.refresh()
      return
    }

    toast.error("Category update failed", {
      description: result.message,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-12 gap-5">
        <Field className="col-span-12">
          <FieldLabel htmlFor="name">Category Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Electronics"
            autoComplete="off"
            className="h-11 bg-muted/40"
            {...form.register("name")}
          />

          {form.formState.errors.name && (
            <FieldError>{form.formState.errors.name.message}</FieldError>
          )}
        </Field>

        <Field className="col-span-12">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <textarea
            id="description"
            rows={4}
            placeholder="Products in this category..."
            className={cn(
              "border-input bg-muted/40 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
            )}
            {...form.register("description")}
          />

          {form.formState.errors.description && (
            <FieldError>
              {form.formState.errors.description.message}
            </FieldError>
          )}
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting}
          onClick={() => router.push("/categories")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
