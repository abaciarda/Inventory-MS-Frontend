import {
    BoxesIcon,
    LayersIcon,
    PackageSearchIcon,
    WalletIcon,
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
import { ProductsTable } from "./components/products-table"

export const metadata: Metadata = {
  title: "Products",
  description:
    "View and manage products, SKUs, categories, cost prices, and sales prices in the inventory management system.",
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    api.getProducts(),
    api.getCategories(),
  ])

  const totalProducts = products.length

  const totalCostValue = products.reduce((total, product) => {
    return total + Number(product.costPrice ?? 0)
  }, 0)

  const totalSalesValue = products.reduce((total, product) => {
    return total + Number(product.salesPrice ?? 0)
  }, 0)

  const categoryCount = categories.length

  const averageProfit =
    totalProducts > 0
      ? (totalSalesValue - totalCostValue) / totalProducts
      : 0

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          View products, SKUs, categories, and pricing information.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Total Products</CardTitle>
              <CardDescription>Products registered in the system.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <BoxesIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Categories</CardTitle>
              <CardDescription>Unique product categories.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <LayersIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{categoryCount}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Total Cost Value</CardTitle>
              <CardDescription>Combined product cost prices.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <WalletIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalCostValue)}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Average Profit</CardTitle>
              <CardDescription>Average sales minus cost price.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <PackageSearchIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(averageProfit)}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Products List</CardTitle>
            <CardDescription>
              Product names, SKUs, categories, and pricing details.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ProductsTable products={products} categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}