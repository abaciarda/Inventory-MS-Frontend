"use client"

import {
  UpdateStockThresholdFormValues,
  updateStockThresholdSchema,
} from "@/app/schemas/stock.schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { updateStockThresholdAction } from "@/lib/actions"
import { formatStockTimestamp } from "@/lib/stock-utils"
import type { MovementType, Product, Stock, StockMovement } from "@/types/app.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PackageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { RecordMovementSheet } from "../../stock/components/record-movement-sheet"

function movementBadgeVariant(type: MovementType) {
  if (type === "IN") return "default" as const
  if (type === "OUT") return "destructive" as const
  return "secondary" as const
}

type ProductStockSectionProps = {
  product: Product
  stock: Stock | null
  movements: StockMovement[]
  products: Product[]
}

export function ProductStockSection({
  product,
  stock,
  movements,
  products,
}: ProductStockSectionProps) {
  const router = useRouter()

  const form = useForm<UpdateStockThresholdFormValues>({
    resolver: zodResolver(updateStockThresholdSchema),
    defaultValues: {
      productId: product.id,
      minThreshold: stock ? String(stock.minThreshold) : "0",
    },
  })

  async function onSubmit(values: UpdateStockThresholdFormValues) {
    const result = await updateStockThresholdAction(values)

    if (result.ok) {
      toast.success("Minimum threshold updated.")
      router.refresh()
      return
    }

    toast.error("Threshold update failed", {
      description: result.message,
    })
  }

  const isLowStock =
    stock != null && stock.currentQuantity <= stock.minThreshold

  return (
    <div className="col-span-12 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                <PackageIcon className="size-5" />
              </div>
              <div>
                <CardTitle>Inventory Stock</CardTitle>
                <CardDescription>
                  Current quantity and low-stock threshold for this product.
                </CardDescription>
              </div>
            </div>
            <RecordMovementSheet
              products={products}
              defaultProductId={product.id}
              triggerLabel="Record Movement"
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {stock ? (
            <>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-4 rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">On Hand</p>
                  <p className="mt-1 text-2xl font-bold">
                    {stock.currentQuantity}
                    {isLowStock && (
                      <Badge variant="destructive" className="ml-2">
                        Low
                      </Badge>
                    )}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-4 rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Min Threshold</p>
                  <p className="mt-1 text-2xl font-bold">{stock.minThreshold}</p>
                </div>
                <div className="col-span-12 sm:col-span-4 rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="mt-1 text-sm font-medium">
                    {formatStockTimestamp(stock.lastUpdated)}
                  </p>
                </div>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-end"
              >
                <Field className="flex-1">
                  <FieldLabel htmlFor="minThreshold">
                    Update Minimum Threshold
                  </FieldLabel>
                  <Input
                    id="minThreshold"
                    type="number"
                    min="0"
                    step="1"
                    className="h-11 max-w-xs bg-muted/40"
                    {...form.register("minThreshold")}
                  />
                  {form.formState.errors.minThreshold && (
                    <FieldError>
                      {form.formState.errors.minThreshold.message}
                    </FieldError>
                  )}
                </Field>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="sm:mb-0.5"
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save Threshold"}
                </Button>
              </form>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No stock record found for this product.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Movement History</CardTitle>
          <CardDescription>
            Audit trail of stock changes for this product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.length ? (
                  movements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="text-muted-foreground">
                        {formatStockTimestamp(movement.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={movementBadgeVariant(movement.type)}>
                          {movement.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {movement.quantity}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {movement.username}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {movement.reason}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No movements recorded yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
