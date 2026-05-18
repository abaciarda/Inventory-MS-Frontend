import { FileBarChartIcon, FileTextIcon, FolderArchiveIcon } from "lucide-react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"
import { getServerSession } from "@/lib/auth"

import { GenerateReportSheet } from "./components/generate-report-sheet"
import { StoredReportsTable } from "./components/stored-reports-table"

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Generate, archive, and download inventory reports in CSV, Excel, or PDF format.",
}

export default async function ReportsPage() {
  const session = await getServerSession()

  if (session?.role !== "SME_OWNER") {
    redirect("/dashboard")
  }

  const reports = await api.getStoredReports()

  const pdfCount = reports.filter((report) => report.format === "PDF").length
  const csvCount = reports.filter((report) => report.format === "CSV").length
  const excelCount = reports.filter((report) => report.format === "EXCEL").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate professional reports and download archived files anytime.
          </p>
        </div>
        <GenerateReportSheet />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Saved Reports</CardTitle>
              <CardDescription>Total archived reports.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <FolderArchiveIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{reports.length}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">PDF Reports</CardTitle>
              <CardDescription>Archived PDF exports.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <FileTextIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pdfCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Spreadsheet Reports</CardTitle>
              <CardDescription>CSV and Excel archives.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <FileBarChartIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{csvCount + excelCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Report Archive</CardTitle>
            <CardDescription>
              All generated reports with download actions per row.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StoredReportsTable reports={reports} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
