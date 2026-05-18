"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatStockTimestamp } from "@/lib/stock-utils"
import type { MovementType, StockMovementRow } from "@/types/app.types"

function movementBadgeVariant(type: MovementType) {
  if (type === "IN") return "default" as const
  if (type === "OUT") return "destructive" as const
  return "secondary" as const
}

export const movementColumns: ColumnDef<StockMovementRow>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatStockTimestamp(row.getValue("timestamp"))}
      </span>
    ),
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => {
      const movement = row.original
      return (
        <div>
          <p className="font-medium">
            {movement.productName ?? `Product #${movement.productId}`}
          </p>
          {movement.productSku && (
            <p className="text-sm text-muted-foreground">{movement.productSku}</p>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as MovementType
      return <Badge variant={movementBadgeVariant(type)}>{type}</Badge>
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Qty</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("username")}</span>
    ),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <p className="max-w-xs truncate text-muted-foreground">
        {row.getValue("reason")}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="link" className="h-auto p-0" asChild>
          <Link href={`/products/${row.original.productId}/edit`}>
            View product
          </Link>
        </Button>
      </div>
    ),
    enableSorting: false,
  },
]
