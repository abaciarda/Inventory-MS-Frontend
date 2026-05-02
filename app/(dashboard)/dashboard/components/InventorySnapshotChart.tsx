"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    category: "Electronics",
    products: 84,
    lowStock: 8,
  },
  {
    category: "Accessories",
    products: 56,
    lowStock: 6,
  },
  {
    category: "Office",
    products: 42,
    lowStock: 4,
  },
  {
    category: "Medical",
    products: 31,
    lowStock: 2,
  },
  {
    category: "Other",
    products: 18,
    lowStock: 1,
  },
];

const chartConfig = {
  products: {
    label: "Total Products ",
    color: "var(--chart-2)",
  },
  lowStock: {
    label: "Low Stock ",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function InventorySnapshotChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Snapshot</CardTitle>
        <CardDescription>
          Product distribution by category and low stock density.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

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
      </CardContent>
    </Card>
  );
}