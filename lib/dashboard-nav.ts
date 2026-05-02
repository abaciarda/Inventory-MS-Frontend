import type { LucideIcon } from "lucide-react"
import {
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  FileBarChartIcon,
  FolderPlusIcon,
  FoldersIcon,
  LayoutDashboardIcon,
  ListIcon,
  PlusIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

export type AppNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export type AppNavSection = {
  label: string
  breadcrumbHubHref?: string
  items: AppNavItem[]
}

export const appNavSections: AppNavSection[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    label: "Products",
    breadcrumbHubHref: "/products",
    items: [
      {
        title: "Add Product",
        href: "/products/new",
        icon: PlusIcon,
      },
      {
        title: "Product List",
        href: "/products",
        icon: ListIcon,
      },
    ],
  },
  {
    label: "Categories",
    breadcrumbHubHref: "/categories",
    items: [
      {
        title: "Add Category",
        href: "/categories/new",
        icon: FolderPlusIcon,
      },
      {
        title: "Category List",
        href: "/categories",
        icon: FoldersIcon,
      },
    ],
  },
  {
    label: "Stock",
    breadcrumbHubHref: "/stock",
    items: [
      {
        title: "Stock Movements",
        href: "/stock",
        icon: ArrowLeftRightIcon,
      },
      {
        title: "Low Stock Alerts",
        href: "/stock/alerts",
        icon: AlertTriangleIcon,
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      {
        title: "Reports",
        href: "/analytics/reports",
        icon: FileBarChartIcon,
      },
      {
        title: "Profitability",
        href: "/analytics/profitability",
        icon: TrendingUpIcon,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Users",
        href: "/users",
        icon: UsersIcon,
      },
    ],
  },
]
