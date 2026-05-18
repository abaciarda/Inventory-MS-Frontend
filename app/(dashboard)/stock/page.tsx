import {
  ArrowDownIcon,
  ArrowUpIcon,
  HistoryIcon,
  SlidersHorizontalIcon,
} from "lucide-react"
import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"
import { enrichMovements } from "@/lib/stock-utils"

import { RecordMovementSheet } from "./components/record-movement-sheet"
import { StockMovementsTable } from "./components/stock-movements-table"

export const metadata: Metadata = {
  title: "Stock Movements",
  description:
    "View stock movement history and record inventory in, out, or adjustment transactions.",
}

export default async function StockMovementsPage() {
  const [movements, products] = await Promise.all([
    api.getStockMovements(),
    api.getProducts(),
  ])

  const rows = enrichMovements(movements, products)
  const inCount = movements.filter((movement) => movement.type === "IN").length
  const outCount = movements.filter((movement) => movement.type === "OUT").length
  const adjustmentCount = movements.filter(
    (movement) => movement.type === "ADJUSTMENT"
  ).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Movements</h1>
          <p className="text-muted-foreground">
            Audit log of inventory changes — who adjusted stock, when, and why.
          </p>
        </div>

        <RecordMovementSheet products={products} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Total Movements</CardTitle>
              <CardDescription>All recorded stock transactions.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <HistoryIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{movements.length}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Stock In</CardTitle>
              <CardDescription>Incoming inventory movements.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <ArrowUpIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{inCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Stock Out</CardTitle>
              <CardDescription>Outgoing inventory movements.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <ArrowDownIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{outCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Adjustments</CardTitle>
              <CardDescription>Quantity override corrections.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <SlidersHorizontalIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{adjustmentCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Movement History</CardTitle>
            <CardDescription>
              Complete ledger of stock changes across all products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StockMovementsTable movements={rows} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
