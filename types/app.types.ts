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
  value: number | string
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

export type CategoryDistribution = {
  category: string
  products: number
  lowStock: number
}

export type DashboardLowStockAlert = {
  id: number
  currentQuantity: number
  minThreshold: number
  lastUpdated: string
  productId: number
  productName: string
  productSku: string
}

export type DashboardData = {
  totalProducts: number
  stockValue: number
  lowStockAmount: number
  movementCount: number
  recentMovements: StockMovement[]
  lowStockAlerts: DashboardLowStockAlert[]
  inventorySnapshot: CategoryDistribution[]
}

export type DashboardDataRequest = DashboardData

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

export type MovementType = "IN" | "OUT" | "ADJUSTMENT"

export type Stock = {
  id: number
  currentQuantity: number
  minThreshold: number
  lastUpdated: string
  productId: number
}

export type StockMovement = {
  id: number
  type: MovementType
  quantity: number
  timestamp: string
  reason: string
  productId: number
  userId: number
  username: string
}

export type StockMovementRow = StockMovement & {
  productName?: string
  productSku?: string
}

export type LowStockRow = Stock & {
  productName: string
  productSku: string
}

export type StockMovementActionResult =
  | { ok: true; movement?: StockMovement }
  | { ok: false; message: string }

export type StockActionResult =
  | { ok: true; stock?: Stock }
  | { ok: false; message: string }

export type ProfitabilitySummary = {
  totalCostValue: number
  totalRetailValue: number
  potentialProfit: number
  averageProfitMargin: number
}

export type CategoryProfitability = {
  categoryName: string
  costValue: number
  retailValue: number
  potentialProfit: number
  profitMargin: number
}

export type ProductProfitability = {
  productId: number
  productName: string
  sku: string
  costPrice: number
  salesPrice: number
  quantity: number
  potentialProfit: number
  profitMargin: number
}

export type ReportFileFormat = "CSV" | "PDF" | "EXCEL"

export type StoredReport = {
  id: number
  name: string
  format: ReportFileFormat | string
  generatedAt: string
  generatedBy: string
}

export type StoredReportActionResult =
  | { ok: true; report?: StoredReport }
  | { ok: false; message: string }

export type ReportDownloadResult =
  | {
      ok: true
      data: string
      contentType: string
      filename: string
    }
  | { ok: false; message: string }