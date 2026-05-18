"use client"

import type { Category, Product } from "@/types/app.types"

import { getProductColumns } from "./columns"
import { DataTable } from "./data-table"

type ProductsTableProps = {
  products: Product[]
  categories: Category[]
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  return (
    <DataTable columns={getProductColumns(categories)} data={products} />
  )
}
