"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatStockTimestamp } from "@/lib/stock-utils"
import type { LowStockRow } from "@/types/app.types"

export const lowStockColumns: ColumnDef<LowStockRow>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("productName")}</p>
        <p className="text-sm text-muted-foreground">{row.original.productSku}</p>
      </div>
    ),
  },
  {
    accessorKey: "currentQuantity",
    header: () => <div className="text-right">On Hand</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Badge variant="destructive">{row.getValue("currentQuantity")}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "minThreshold",
    header: () => <div className="text-right">Min Threshold</div>,
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground">
        {row.getValue("minThreshold")}
      </div>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatStockTimestamp(row.getValue("lastUpdated"))}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button variant="link" className="h-auto p-0" asChild>
          <Link href={`/products/${row.original.productId}/edit`}>
            Manage
          </Link>
        </Button>
      </div>
    ),
    enableSorting: false,
  },
]
