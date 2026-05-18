"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon, MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteProductAction } from "@/lib/actions"
import type { Category, Product } from "@/types/app.types"
import Link from "next/link"
import { toast } from "sonner"

function formatCurrency(value: unknown) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value ?? 0))
}

export function getProductColumns(categories: Category[]): ColumnDef<Product>[] {
  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name])
  )

  return [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
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
      <p className="font-medium">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("sku")}
      </span>
    ),
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => {
      const categoryId = row.getValue("categoryId") as number
      const categoryName = categoryMap.get(categoryId)

      return (
        <Badge variant="secondary">
          {categoryName ?? `Category #${categoryId}`}
        </Badge>
      )
    },
  },
  {
    accessorKey: "costPrice",
    header: () => <div className="text-right">Cost Price</div>,
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground">
        {formatCurrency(row.getValue("costPrice"))}
      </div>
    ),
  },
  {
    accessorKey: "salesPrice",
    header: () => <div className="text-right">Sales Price</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrency(row.getValue("salesPrice"))}
      </div>
    ),
  },
  {
    id: "profit",
    header: () => <div className="text-right">Profit</div>,
    cell: ({ row }) => {
      const costPrice = Number(row.original.costPrice ?? 0)
      const salesPrice = Number(row.original.salesPrice ?? 0)
      const profit = salesPrice - costPrice

      return (
        <div className="text-right">
          <Badge variant={profit > 0 ? "default" : "destructive"}>
            {formatCurrency(profit)}
          </Badge>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Operations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(String(product.sku))
                  toast.success("Product ID copied to clipboard")
                }}
              >
                Copy product ID
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/products/${product.id}/edit`}>
                  Edit product
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  if (!product.id) return
                  const res = await deleteProductAction(product.id)
                  if (res.ok) {
                    toast.success("Product deleted successfully")
                  } else {
                    toast.error(res.message)
                  }
                }}
                className="text-red-500"
              >
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
  },
]
}