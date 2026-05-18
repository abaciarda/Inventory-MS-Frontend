import { LucideIcon } from "lucide-react"

export type AuthUser = {
  id: number | string
  username: string
  role: string
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type DashboardStatCardProps = {
  title: string
  value: number
  description: string
  icon: LucideIcon
  trend?: string
}

export type UserResponse = {
  id: number
  username: string
  role: "SME_OWNER" | "SME_STAFF"
  createdAt: string
}

export type UserRequest = {
  id: number;
  username: string
  role: UserResponse["role"]
}

export type DashboardDataRequest = {
  totalProducts: number
  stockValue: number
  lowStockAmount: number
  movementCount: number
}

export type Product = {
  id: number
  name: string
  sku: string
  costPrice: number
  salesPrice: number
  categoryId: number
}

export type UserActionResult = | { ok: true; user: UserResponse } | { ok: false; message: string }

export type ProductActionResult = | { ok: true; product?: Omit<Product, "id"> } | { ok: false; message: string }

export type Category = {
  id: number
  name: string
  description: string
}

export type CategoryActionResult =
  | { ok: true; category?: Category }
  | { ok: false; message: string }