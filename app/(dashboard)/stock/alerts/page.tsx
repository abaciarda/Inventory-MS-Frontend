import { AlertTriangleIcon, PackageIcon, TrendingDownIcon } from "lucide-react"
import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"
import { buildLowStockRows } from "@/lib/stock-utils"

import { LowStockTable } from "../components/low-stock-table"

export const metadata: Metadata = {
  title: "Low Stock Alerts",
  description:
    "Products at or below their minimum stock threshold that may need reordering.",
}

export default async function LowStockAlertsPage() {
  const [stocks, products] = await Promise.all([
    api.getStocks(),
    api.getProducts(),
  ])

  const lowStockRows = buildLowStockRows(stocks, products)
  const criticalCount = lowStockRows.filter(
    (row) => row.currentQuantity === 0
  ).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Low Stock Alerts</h1>
        <p className="text-muted-foreground">
          Products at or below their minimum threshold — review and restock as
          needed.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-6 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Low Stock Items</CardTitle>
              <CardDescription>
                Products at or below minimum threshold.
              </CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <AlertTriangleIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lowStockRows.length}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Out of Stock</CardTitle>
              <CardDescription>Products with zero quantity on hand.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <TrendingDownIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{criticalCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Tracked Products</CardTitle>
              <CardDescription>Total products with stock records.</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <PackageIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stocks.length}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Alert List</CardTitle>
            <CardDescription>
              Open a product to update its minimum threshold or record a stock
              movement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LowStockTable rows={lowStockRows} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
