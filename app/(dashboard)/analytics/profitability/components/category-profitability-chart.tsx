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
import type { CategoryProfitability } from "@/types/app.types"

const chartConfig = {
  costValue: {
    label: "Cost Value",
    color: "var(--chart-3)",
  },
  retailValue: {
    label: "Retail Value",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type CategoryProfitabilityChartProps = {
  data: CategoryProfitability[]
}

export function CategoryProfitabilityChart({
  data,
}: CategoryProfitabilityChartProps) {
  const chartData = data.map((item) => ({
    category: item.categoryName,
    costValue: Number(item.costValue),
    retailValue: Number(item.retailValue),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profitability by Category</CardTitle>
        <CardDescription>
          Cost value vs retail value per category (current stock).
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length ? (
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <BarChart data={chartData}>
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
                dataKey="costValue"
                fill="var(--color-costValue)"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="retailValue"
                fill="var(--color-retailValue)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
            No category profitability data available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
