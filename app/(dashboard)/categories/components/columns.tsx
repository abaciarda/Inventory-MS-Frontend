"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon, MoreHorizontalIcon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteCategoryAction } from "@/lib/actions"
import type { Category } from "@/types/app.types"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p className="font-medium">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="max-w-md truncate text-muted-foreground">
        {row.getValue("description")}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="category-actions-button">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Operations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(String(category.id))
                  toast.success("Category ID copied to clipboard")
                }}
              >
                Copy category ID
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/categories/${category.id}/edit`} data-testid="category-edit-link">
                  Edit category
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  if (!category.id) return
                  const res = await deleteCategoryAction(category.id)
                  if (res.ok) {
                    toast.success("Category deleted successfully")
                  } else {
                    toast.error(res.message)
                  }
                }}
                className="text-red-500"
              >
                Delete category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
  },
]
