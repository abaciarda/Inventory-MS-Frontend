"use client"

import type { Category } from "@/types/app.types"

import { columns } from "./columns"
import { DataTable } from "./data-table"

type CategoriesTableProps = {
  categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  return <DataTable columns={columns} data={categories} />
}
