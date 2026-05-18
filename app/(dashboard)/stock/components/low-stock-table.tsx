"use client"

import type { LowStockRow } from "@/types/app.types"

import { DataTable } from "./data-table"
import { lowStockColumns } from "./low-stock-columns"

type LowStockTableProps = {
  rows: LowStockRow[]
}

export function LowStockTable({ rows }: LowStockTableProps) {
  return (
    <DataTable
      columns={lowStockColumns}
      data={rows}
      searchColumn="productName"
      searchPlaceholder="Search products..."
      emptyMessage="No low stock alerts. All products are above their minimum threshold."
      entityLabel="alert"
    />
  )
}
