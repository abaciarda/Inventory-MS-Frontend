"use client"

import type { StockMovementRow } from "@/types/app.types"

import { DataTable } from "./data-table"
import { movementColumns } from "./movement-columns"

type StockMovementsTableProps = {
  movements: StockMovementRow[]
}

export function StockMovementsTable({ movements }: StockMovementsTableProps) {
  return (
    <DataTable
      columns={movementColumns}
      data={movements}
      searchColumn="productName"
      searchPlaceholder="Search by product..."
      emptyMessage="No stock movements found."
      entityLabel="movement"
    />
  )
}
