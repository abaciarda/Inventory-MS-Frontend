import { BoxesIcon, WalletIcon, AlertTriangleIcon, ArrowLeftRightIcon } from "lucide-react";
import { DashboardStatCard } from "./components/DashboardStatCard";
import { RecentStockMovements } from "./components/RecentStockMovements";
import { LowStockAlerts } from "./components/LowStockAlerts";
import { InventorySnapshotChart } from "./components/InventorySnapshotChart";

export default function Page() {
  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 min-w-0">
        <DashboardStatCard
          title="Total Products"
          value="248"
          description="Active products in the system"
          icon={BoxesIcon}
          trend="+8%"
        />

        <DashboardStatCard
          title="Stock Value"
          value="₺128.450"
          description="Total inventory cost value"
          icon={WalletIcon}
          trend="+14%"
        />

        <DashboardStatCard
          title="Low Stock"
          value="12"
          description="Products below the minimum threshold"
          icon={AlertTriangleIcon}
        />

        <DashboardStatCard
          title="Today's Movement"
          value="36"
          description="Stock movements today"
          icon={ArrowLeftRightIcon}
          trend="+5"
        />
      </div>
      <div className="grid grid-cols-12 gap-4 min-w-0">

        <div className="col-span-12 xl:col-span-8">
          <RecentStockMovements />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <LowStockAlerts />
        </div>
      </div>

      <div className="col-span-12 min-w-0">
        <InventorySnapshotChart />
      </div>
    </>
  )
}
