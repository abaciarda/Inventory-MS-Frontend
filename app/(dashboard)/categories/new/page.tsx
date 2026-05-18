import { FileTextIcon, FolderPlusIcon, FoldersIcon } from "lucide-react"
import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AddCategoryForm } from "../components/AddCategoryForm"

export const metadata: Metadata = {
  title: "Add Category",
  description: "Create a new product category for your inventory catalog.",
}

export default function AddCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Category</h1>
        <p className="text-muted-foreground">
          Create a new category to group related products.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Category Information</CardTitle>
                <CardDescription>
                  Enter a name and description for the new category.
                </CardDescription>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                <FolderPlusIcon className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AddCategoryForm />
          </CardContent>
        </Card>

        <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Category Data</CardTitle>
                  <CardDescription>
                    Categories help organize products in lists and reports.
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
                <p>Use clear names so staff can find products quickly.</p>
              </div>

              <div className="flex items-start gap-3">
                <FileTextIcon className="mt-0.5 size-4 shrink-0" />
                <p>
                  Descriptions explain what belongs in this category for new
                  team members.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
