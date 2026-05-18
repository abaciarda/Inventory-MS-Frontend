import {
    BarcodeIcon,
    BoxesIcon,
    PackageCheckIcon,
    TagsIcon,
    WalletIcon,
} from "lucide-react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"

import { EditProductForm } from "../../components/EditProductForm"

export const metadata: Metadata = {
  title: "Edit Product",
  description:
    "Update product information, SKU, category, cost price, and sales price.",
}

type EditProductPageProps = {
  params: Promise<{
    productId: string
  }>
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { productId } = await params
  const parsedProductId = Number(productId)

  if (!Number.isInteger(parsedProductId) || parsedProductId <= 0) {
    notFound()
  }

  const [product, categories] = await Promise.all([
    api.getProductById(parsedProductId).catch(() => null),
    api.getCategories(),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">
          Update product details and pricing information.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Update product name, SKU, category, and price details.
                </CardDescription>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                <PackageCheckIcon className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <EditProductForm product={product} categories={categories} />
          </CardContent>
        </Card>

        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Product Data</CardTitle>
                  <CardDescription>
                    Keep product information consistent across inventory records.
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
                  SKU must follow the SKU-CODE format, such as SKU-001.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <TagsIcon className="mt-0.5 size-4 shrink-0" />
                <p>
                  Category changes affect product grouping and inventory reports.
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