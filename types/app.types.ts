import { LucideIcon } from "lucide-react"

export type AuthUser = {
  id: number | string
  username: string
  role: string
}

export type DashboardStatCardProps = {
  title: string
  value: string
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
  username: string
  role: UserResponse["role"]
}

export type UserActionResult = | { ok: true; user: UserResponse } | { ok: false; message: string }
