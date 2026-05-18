import {
    BarcodeIcon,
    BoxesIcon,
    PackagePlusIcon,
    TagsIcon,
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

import { AddProductForm } from "../components/AddProductForm"

export const metadata: Metadata = {
  title: "Add Product",
  description:
    "Create a new product with SKU, category, cost price, and sales price information.",
}

export default async function AddProductPage() {
  const categories = await api.getCategories()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
        <p className="text-muted-foreground">
          Create a new product record for your inventory.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Enter product details, pricing, and category information.
                </CardDescription>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                <PackagePlusIcon className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AddProductForm categories={categories} />
          </CardContent>
        </Card>

        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Product Data</CardTitle>
                  <CardDescription>
                    Main information required to register inventory items.
                  </CardDescription>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                  <BoxesIcon className="size-5" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <BarcodeIcon className="mt-0.5 size-4 shrink-0" />
                <p>
                  SKU should be unique and easy to identify in stock movements.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <TagsIcon className="mt-0.5 size-4 shrink-0" />
                <p>
                  Categories help group products in reports and inventory views.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <WalletIcon className="mt-0.5 size-4 shrink-0" />
                <p>
                  Cost and sales prices are used for profitability calculations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}