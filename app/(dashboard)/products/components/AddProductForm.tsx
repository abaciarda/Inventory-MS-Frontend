"use client"

import {
  CreateProductFormValues,
  createProductSchema,
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
import { createProductAction } from "@/lib/actions"
import type { Category } from "@/types/app.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter()

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      categoryId: "",
      costPrice: "",
      salesPrice: "",
      initialStockQuantity: "0",
    },
  })

  async function onSubmit(values: CreateProductFormValues) {
    const result = await createProductAction(values)

    if (result.ok) {
      toast.success("Product created.")
      router.push("/products")
      router.refresh()
      return
    }

    toast.error("Product creation failed", {
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
            data-testid="create-product-name-input"
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
            data-testid="create-product-sku-input"
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
                  data-testid="create-product-category-select"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {categories.length === 0 ? (
                    <SelectItem value="" disabled>
                      No categories available
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
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
            data-testid="create-product-cost-input"
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
            data-testid="create-product-sales-input"
            {...form.register("salesPrice")}
          />

          {form.formState.errors.salesPrice && (
            <FieldError>{form.formState.errors.salesPrice.message}</FieldError>
          )}
        </Field>

        <Field className="col-span-12 md:col-span-6">
          <FieldLabel htmlFor="initialStockQuantity">
            Initial Stock Quantity
          </FieldLabel>
          <Input
            id="initialStockQuantity"
            type="number"
            step="1"
            min="0"
            placeholder="50"
            className="h-11 bg-muted/40"
            data-testid="create-product-stock-input"
            {...form.register("initialStockQuantity")}
          />

          {form.formState.errors.initialStockQuantity && (
            <FieldError>
              {form.formState.errors.initialStockQuantity.message}
            </FieldError>
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

        <Button type="submit" disabled={form.formState.isSubmitting} data-testid="create-product-submit">
          {form.formState.isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  )
}