"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { CategoryDistribution } from "@/types/app.types"

const chartConfig = {
  products: {
    label: "Total Products",
    color: "var(--chart-2)",
  },
  lowStock: {
    label: "Low Stock",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

type InventorySnapshotChartProps = {
  data: CategoryDistribution[]
}

export function InventorySnapshotChart({ data }: InventorySnapshotChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Snapshot</CardTitle>
        <CardDescription>
          Product distribution by category and low stock density.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {data.length ? (
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />

              <YAxis tickLine={false} axisLine={false} tickMargin={10} />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Bar
                dataKey="products"
                fill="var(--color-products)"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="lowStock"
                fill="var(--color-lowStock)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
            No category distribution data available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
