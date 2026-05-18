import { FileTextIcon, FolderPlusIcon, FoldersIcon } from "lucide-react"
import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"

import { CategoriesTable } from "./components/categories-table"

export const metadata: Metadata = {
  title: "Categories",
  description:
    "View and manage product categories used to organize inventory items.",
}

export default async function CategoriesPage() {
  const categories = await api.getCategories()

  const totalCategories = categories.length
  const withDescription = categories.filter(
    (category) => category.description.trim().length > 0
  ).length
  const averageNameLength =
    totalCategories > 0
      ? Math.round(
          categories.reduce((sum, category) => sum + category.name.length, 0) /
            totalCategories
        )
      : 0

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Organize products into categories for reporting and inventory views.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-6 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Total Categories</CardTitle>
              <CardDescription>Categories registered in the system.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <FoldersIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{totalCategories}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">With Description</CardTitle>
              <CardDescription>Categories that include a description.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <FileTextIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{withDescription}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Avg. Name Length</CardTitle>
              <CardDescription>Average characters per category name.</CardDescription>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md border">
              <FolderPlusIcon className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{averageNameLength}</p>
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Category List</CardTitle>
            <CardDescription>
              Category names and descriptions for your product catalog.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CategoriesTable categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
