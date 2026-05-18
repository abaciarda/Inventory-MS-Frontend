import { FileTextIcon, FolderCheckIcon, FoldersIcon } from "lucide-react"
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

import { EditCategoryForm } from "../../components/EditCategoryForm"

export const metadata: Metadata = {
  title: "Edit Category",
  description: "Update category name and description.",
}

type EditCategoryPageProps = {
  params: Promise<{
    categoryId: string
  }>
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { categoryId } = await params
  const parsedCategoryId = Number(categoryId)

  if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
    notFound()
  }

  const category = await api.getCategoryById(parsedCategoryId).catch(() => null)

  if (!category) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground">
          Update category details used across your product catalog.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Category Information</CardTitle>
                <CardDescription>
                  Update the category name and description.
                </CardDescription>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                <FolderCheckIcon className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <EditCategoryForm category={category} />
          </CardContent>
        </Card>

        <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Category Data</CardTitle>
                  <CardDescription>
                    Changes apply to all products linked to this category.
                  </CardDescription>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                  <FoldersIcon className="size-5" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <FoldersIcon className="mt-0.5 size-4 shrink-0" />
                <p>Renaming a category updates how it appears in product lists.</p>
              </div>

              <div className="flex items-start gap-3">
                <FileTextIcon className="mt-0.5 size-4 shrink-0" />
                <p>Keep descriptions accurate for inventory reporting.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
