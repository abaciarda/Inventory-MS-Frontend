"use client"

import {
  EditProductFormValues,
  editProductSchema,
} from "@/app/schemas/product.schema"
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
import { updateProductAction } from "@/lib/actions"
import type { Category, Product } from "@/types/app.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export function EditProductForm({
  product,
  categories,
}: {
  product: Product
  categories: Category[]
}) {
  const router = useRouter()

  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      sku: product.sku,
      categoryId: String(product.categoryId),
      costPrice: String(product.costPrice),
      salesPrice: String(product.salesPrice),
    },
  })

  async function onSubmit(values: EditProductFormValues) {
    const result = await updateProductAction(values)

    if (result.ok) {
      toast.success("Product updated.")
      router.push("/products")
      router.refresh()
      return
    }

    toast.error("Product update failed", {
      description: result.message,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-12 gap-5">
        <Field className="col-span-12">
          <FieldLabel htmlFor="name">Product Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Wireless Mouse"
            autoComplete="off"
            className="h-11 bg-muted/40"
            {...form.register("name")}
          />

          {form.formState.errors.name && (
            <FieldError>{form.formState.errors.name.message}</FieldError>
          )}
        </Field>

        <Field className="col-span-12 md:col-span-6">
          <FieldLabel htmlFor="sku">SKU</FieldLabel>
          <Input
            id="sku"
            type="text"
            placeholder="SKU-001"
            autoComplete="off"
            className="h-11 bg-muted/40 uppercase"
            {...form.register("sku")}
          />

          {form.formState.errors.sku && (
            <FieldError>{form.formState.errors.sku.message}</FieldError>
          )}
        </Field>

        <Field className="col-span-12 md:col-span-6">
          <FieldLabel htmlFor="categoryId">Category</FieldLabel>
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="categoryId"
                  className="h-11! w-full bg-muted/40"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {form.formState.errors.categoryId && (
            <FieldError>{form.formState.errors.categoryId.message}</FieldError>
          )}
        </Field>

        <Field className="col-span-12 md:col-span-6">
          <FieldLabel htmlFor="costPrice">Cost Price</FieldLabel>
          <Input
            id="costPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="25.00"
            className="h-11 bg-muted/40"
            {...form.register("costPrice")}
          />

          {form.formState.errors.costPrice && (
            <FieldError>{form.formState.errors.costPrice.message}</FieldError>
          )}
        </Field>

        <Field className="col-span-12 md:col-span-6">
          <FieldLabel htmlFor="salesPrice">Sales Price</FieldLabel>
          <Input
            id="salesPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="39.99"
            className="h-11 bg-muted/40"
            {...form.register("salesPrice")}
          />

          {form.formState.errors.salesPrice && (
            <FieldError>{form.formState.errors.salesPrice.message}</FieldError>
          )}
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting}
          onClick={() => router.push("/products")}
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