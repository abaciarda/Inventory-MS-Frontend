import {
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  BoxesIcon,
  WalletIcon,
} from "lucide-react"
import { Metadata } from "next"

import { api } from "@/lib/api"
import { enrichMovements } from "@/lib/stock-utils"

import { DashboardStatCard } from "./components/DashboardStatCard"
import { InventorySnapshotChart } from "./components/InventorySnapshotChart"
import { LowStockAlerts } from "./components/LowStockAlerts"
import { RecentStockMovements } from "./components/RecentStockMovements"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View inventory statistics, stock movements, low stock alerts, and product distribution from the dashboard.",
}

function formatStockValue(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export default async function Page() {
  const [dashboardData, products] = await Promise.all([
    api.getDashboardData(),
    api.getProducts(),
  ])

  const recentMovements = enrichMovements(
    dashboardData?.recentMovements ?? [],
    products
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your inventory status, stock movements, and critical alerts.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Products"
          value={dashboardData?.totalProducts ?? 0}
          description="Active products in the system"
          icon={BoxesIcon}
        />

        <DashboardStatCard
          title="Stock Value"
          value={formatStockValue(dashboardData?.stockValue ?? 0)}
          description="Total inventory cost value"
          icon={WalletIcon}
        />

        <DashboardStatCard
          title="Low Stock"
          value={dashboardData?.lowStockAmount ?? 0}
          description="Products below the minimum threshold"
          icon={AlertTriangleIcon}
        />

        <DashboardStatCard
          title="Today's Movement"
          value={dashboardData?.movementCount ?? 0}
          description="Stock movements today"
          icon={ArrowLeftRightIcon}
        />
      </div>

      <div className="grid min-w-0 grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8">
          <RecentStockMovements movements={recentMovements} />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <LowStockAlerts items={dashboardData?.lowStockAlerts ?? []} />
        </div>
      </div>

      <div className="min-w-0">
        <InventorySnapshotChart
          data={dashboardData?.inventorySnapshot ?? []}
        />
      </div>
    </div>
  )
}
