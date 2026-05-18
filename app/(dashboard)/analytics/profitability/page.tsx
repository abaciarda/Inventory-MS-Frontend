import {
  DollarSignIcon,
  PercentIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { DashboardStatCard } from "@/app/(dashboard)/dashboard/components/DashboardStatCard"
import { api } from "@/lib/api"
import { getServerSession } from "@/lib/auth"
import { formatCurrency, formatPercent } from "@/lib/format-utils"

import { CategoryProfitabilityChart } from "./components/category-profitability-chart"
import { TopProductsTable } from "./components/top-products-table"

export const metadata: Metadata = {
  title: "Profitability",
  description:
    "Analyze inventory cost, retail value, margins, and top profitable products.",
}

export default async function ProfitabilityPage() {
  const session = await getServerSession()

  if (session?.role !== "SME_OWNER") {
    redirect("/dashboard")
  }

  const [summary, categories, topProducts] = await Promise.all([
    api.getProfitabilitySummary(),
    api.getCategoryProfitability(),
    api.getTopProductsByProfit(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profitability</h1>
        <p className="text-muted-foreground">
          Business insights based on current stock levels and pricing.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Cost Value"
          value={formatCurrency(summary?.totalCostValue ?? 0)}
          description="Capital tied up in stock"
          icon={WalletIcon}
        />

        <DashboardStatCard
          title="Total Retail Value"
          value={formatCurrency(summary?.totalRetailValue ?? 0)}
          description="Potential revenue at current stock"
          icon={DollarSignIcon}
        />

        <DashboardStatCard
          title="Potential Profit"
          value={formatCurrency(summary?.potentialProfit ?? 0)}
          description="Retail value minus cost value"
          icon={TrendingUpIcon}
        />

        <DashboardStatCard
          title="Average Margin"
          value={formatPercent(summary?.averageProfitMargin ?? 0)}
          description="Overall profit margin percentage"
          icon={PercentIcon}
        />
      </div>

      <div className="grid min-w-0 grid-cols-12 gap-4">
        <div className="col-span-12">
          <CategoryProfitabilityChart data={categories} />
        </div>

        <div className="col-span-12">
          <TopProductsTable products={topProducts} />
        </div>
      </div>
    </div>
  )
}
