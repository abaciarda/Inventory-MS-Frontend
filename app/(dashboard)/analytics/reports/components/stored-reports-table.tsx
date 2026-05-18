"use client"

import type { StoredReport } from "@/types/app.types"

import { DataTable } from "@/app/(dashboard)/stock/components/data-table"

import { storedReportColumns } from "./columns"

type StoredReportsTableProps = {
  reports: StoredReport[]
}

export function StoredReportsTable({ reports }: StoredReportsTableProps) {
  return (
    <DataTable
      columns={storedReportColumns}
      data={reports}
      searchColumn="name"
      searchPlaceholder="Search reports..."
      emptyMessage="No reports generated yet."
      entityLabel="report"
    />
  )
}
