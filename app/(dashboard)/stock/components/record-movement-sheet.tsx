"use client"

import {
  RecordStockMovementFormValues,
  recordStockMovementSchema,
} from "@/app/schemas/stock.schema"
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

import { ProductSearchPicker } from "./product-search-picker"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { recordStockMovementAction } from "@/lib/actions"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/app.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

type RecordMovementSheetProps = {
  products: Product[]
  defaultProductId?: number
  triggerLabel?: string
}

export function RecordMovementSheet({
  products,
  defaultProductId,
  triggerLabel = "Record Movement",
}: RecordMovementSheetProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<RecordStockMovementFormValues>({
    resolver: zodResolver(recordStockMovementSchema),
    defaultValues: {
      productId: defaultProductId ? String(defaultProductId) : "",
      type: "IN",
      quantity: "",
      reason: "",
    },
  })

  useEffect(() => {
    if (open && defaultProductId) {
      form.setValue("productId", String(defaultProductId))
    }
  }, [open, defaultProductId, form])

  async function onSubmit(values: RecordStockMovementFormValues) {
    const result = await recordStockMovementAction(values)

    if (result.ok) {
      toast.success("Stock movement recorded.")
      setOpen(false)
      form.reset({
        productId: defaultProductId ? String(defaultProductId) : "",
        type: "IN",
        quantity: "",
        reason: "",
      })
      router.refresh()
      return
    }

    toast.error("Failed to record movement", {
      description: result.message,
    })
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon className="mr-2 size-4" />
        {triggerLabel}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Record Stock Movement</SheetTitle>
            <SheetDescription>
              Log stock in, out, or an adjustment. The backend records your user
              from the session automatically.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 p-4"
          >
            <Field>
              <FieldLabel htmlFor="product-search">Product</FieldLabel>
              <Controller
                name="productId"
                control={form.control}
                render={({ field }) => (
                  <ProductSearchPicker
                    products={products}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={Boolean(defaultProductId)}
                  />
                )}
              />
              {form.formState.errors.productId && (
                <FieldError>{form.formState.errors.productId.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="type">Movement Type</FieldLabel>
              <Controller
                name="type"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type" className="h-11 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="IN">IN — Add stock</SelectItem>
                      <SelectItem value="OUT">OUT — Remove stock</SelectItem>
                      <SelectItem value="ADJUSTMENT">
                        ADJUSTMENT — Set exact quantity
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <FieldError>{form.formState.errors.type.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                id="quantity"
                type="number"
                min="1"
                step="1"
                placeholder="10"
                className="h-11"
                {...form.register("quantity")}
              />
              {form.formState.errors.quantity && (
                <FieldError>{form.formState.errors.quantity.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="reason">Reason</FieldLabel>
              <textarea
                id="reason"
                rows={3}
                placeholder="Restocked from supplier"
                className={cn(
                  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                )}
                {...form.register("reason")}
              />
              {form.formState.errors.reason && (
                <FieldError>{form.formState.errors.reason.message}</FieldError>
              )}
            </Field>

            <SheetFooter className="gap-2 sm:justify-end p-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Record Movement"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
