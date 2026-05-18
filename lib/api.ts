import { CreateUserFormValues } from "@/app/schemas/auth.schema"
import {
  CreateCategoryFormValues,
  EditCategoryFormValues,
} from "@/app/schemas/category.schema"
import { GenerateReportFormValues } from "@/app/schemas/report.schema"
import { CreateProductFormValues } from "@/app/schemas/product.schema"
import {
  StockMovementApiPayload,
  UpdateStockThresholdFormValues,
  toStockMovementPayload,
  type RecordStockMovementFormValues,
} from "@/app/schemas/stock.schema"
import type {
  ApiResponse,
  Category,
  CategoryProfitability,
  DashboardData,
  Product,
  ProductProfitability,
  ProfitabilitySummary,
  Stock,
  StockMovement,
  StoredReport,
  UserRequest,
  UserResponse,
} from "@/types/app.types"
import { cookies } from "next/headers"
import { env } from "./env"
import { parseContentDispositionFilename } from "./download-utils"

async function cookieHeader(): Promise<string> {
  const store = await cookies()
  return store
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")
}

function messageFromApiErrorBody(text: string): string {
  const raw = text.trim()
  if (!raw) return "Request failed"
  try {
    const data = JSON.parse(raw) as { message?: string }
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message
    }
  } catch { }
  return raw
}

export const api = {
  getAllUsers: async (): Promise<UserResponse[]> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("API ERROR:", res.status, text)
        throw new Error("Failed to fetch users")
      }

      const response: ApiResponse<UserResponse[]> = await res.json()
      return response.data
    } catch (error) {
      console.error("API ERROR:", error)
      return []
    }
  },

  updateUser: async (body: UserRequest): Promise<UserResponse> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users/${body.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to update user")
    }

    const response = (await res.json()) as ApiResponse<UserResponse>
    return response.data
  },

  createUser: async (body: CreateUserFormValues): Promise<UserResponse> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to create user")
    }

    const response = (await res.json()) as ApiResponse<UserResponse>
    return response.data
  },

  getDashboardData: async (): Promise<DashboardData | null> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("API ERROR:", res.status, text)
        throw new Error("Failed to fetch dashboard data")
      }

      const response: ApiResponse<DashboardData> = await res.json()
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return null
    }
  },

  getProducts: async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("API ERROR:", res.status, text)
        throw new Error("Failed to fetch products")
      }

      const response: ApiResponse<Product[]> = await res.json()
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  createProduct: async (body: CreateProductFormValues): Promise<Product> => {
    const payload = {
      name: body.name,
      sku: body.sku,
      categoryId: Number(body.categoryId),
      costPrice: Number(body.costPrice),
      salesPrice: Number(body.salesPrice),
      initialStockQuantity: Number(body.initialStockQuantity),
    }

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to create product")
    }

    const response = (await res.json()) as ApiResponse<Product>
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to fetch product")
    }

    const response = (await res.json()) as ApiResponse<Product>
    return response.data
  },

  updateProduct: async (
    id: number,
    body: Omit<CreateProductFormValues, "initialStockQuantity">
  ): Promise<Product> => {
    const payload = {
      name: body.name,
      sku: body.sku,
      categoryId: Number(body.categoryId),
      costPrice: Number(body.costPrice),
      salesPrice: Number(body.salesPrice),
    }

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to update product")
    }

    const response = (await res.json()) as ApiResponse<Product>
    return response.data
  },

  deleteProduct: async (id: number): Promise<void> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to delete product")
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("API ERROR:", res.status, text)
        throw new Error("Failed to fetch categories")
      }

      const response: ApiResponse<Category[]> = await res.json()
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to fetch category")
    }

    const response = (await res.json()) as ApiResponse<Category>
    return response.data
  },

  createCategory: async (body: CreateCategoryFormValues): Promise<Category> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to create category")
    }

    const response = (await res.json()) as ApiResponse<Category>
    return response.data
  },

  updateCategory: async (
    id: number,
    body: Omit<EditCategoryFormValues, "id">
  ): Promise<Category> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to update category")
    }

    const response = (await res.json()) as ApiResponse<Category>
    return response.data
  },

  deleteCategory: async (id: number): Promise<void> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to delete category")
    }
  },

  getStocks: async (): Promise<Stock[]> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/stocks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("API ERROR:", res.status, text)
        throw new Error("Failed to fetch stocks")
      }

      const response: ApiResponse<Stock[]> = await res.json()
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  getStockByProductId: async (productId: number): Promise<Stock | null> => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/stocks/product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: await cookieHeader(),
          },
        }
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(messageFromApiErrorBody(text) || "Failed to fetch stock")
      }

      const response = (await res.json()) as ApiResponse<Stock>
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return null
    }
  },

  updateStockThreshold: async (
    productId: number,
    body: Pick<UpdateStockThresholdFormValues, "minThreshold">
  ): Promise<Stock> => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/stocks/product/${productId}/threshold`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
        body: JSON.stringify({ minThreshold: Number(body.minThreshold) }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        messageFromApiErrorBody(text) || "Failed to update stock threshold"
      )
    }

    const response = (await res.json()) as ApiResponse<Stock>
    return response.data
  },

  getStockMovements: async (): Promise<StockMovement[]> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/stock-movements`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("API ERROR:", res.status, text)
        throw new Error("Failed to fetch stock movements")
      }

      const response: ApiResponse<StockMovement[]> = await res.json()
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  getStockMovementsByProductId: async (
    productId: number
  ): Promise<StockMovement[]> => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/stock-movements/product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: await cookieHeader(),
          },
        }
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(
          messageFromApiErrorBody(text) || "Failed to fetch stock movements"
        )
      }

      const response = (await res.json()) as ApiResponse<StockMovement[]>
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  recordStockMovement: async (
    body: RecordStockMovementFormValues
  ): Promise<StockMovement> => {
    const payload: StockMovementApiPayload = toStockMovementPayload(body)

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/stock-movements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        messageFromApiErrorBody(text) || "Failed to record stock movement"
      )
    }

    const response = (await res.json()) as ApiResponse<StockMovement>
    return response.data
  },

  getProfitabilitySummary: async (): Promise<ProfitabilitySummary | null> => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/profitability/summary`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: await cookieHeader(),
          },
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch profitability summary")
      }

      const response = (await res.json()) as ApiResponse<ProfitabilitySummary>
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return null
    }
  },

  getCategoryProfitability: async (): Promise<CategoryProfitability[]> => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/profitability/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: await cookieHeader(),
          },
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch category profitability")
      }

      const response = (await res.json()) as ApiResponse<CategoryProfitability[]>
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  getTopProductsByProfit: async (): Promise<ProductProfitability[]> => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/profitability/products/top`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: await cookieHeader(),
          },
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch top products")
      }

      const response = (await res.json()) as ApiResponse<ProductProfitability[]>
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  getStoredReports: async (): Promise<StoredReport[]> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/reports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch stored reports")
      }

      const response = (await res.json()) as ApiResponse<StoredReport[]>
      return response.data
    } catch (error) {
      console.error("API Error: ", error)
      return []
    }
  },

  generateReport: async (body: GenerateReportFormValues): Promise<StoredReport> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/reports/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Failed to generate report")
    }

    const response = (await res.json()) as ApiResponse<StoredReport>
    return response.data
  },

  downloadStoredReport: async (
    id: number
  ): Promise<{ data: ArrayBuffer; contentType: string; filename: string }> => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/reports/${id}/download`,
      {
        method: "GET",
        headers: {
          Cookie: await cookieHeader(),
        },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(messageFromApiErrorBody(text) || "Download failed")
    }

    const filename = parseContentDispositionFilename(
      res.headers.get("content-disposition"),
      `report_${id}`
    )

    return {
      data: await res.arrayBuffer(),
      contentType:
        res.headers.get("content-type") ?? "application/octet-stream",
      filename,
    }
  },
}
