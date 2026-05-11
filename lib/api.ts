import { CreateUserFormValues } from "@/app/schemas/auth.schema"
import { CreateProductFormValues } from "@/app/schemas/product.schema"
import type {
  ApiResponse,
  DashboardDataRequest,
  Product,
  UserRequest,
  UserResponse,
} from "@/types/app.types"
import { cookies } from "next/headers"
import { env } from "./env"

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

  getDashboardData: async (): Promise<DashboardDataRequest | null> => {
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
        throw new Error("Failed to fetch dashboard data")
      }

      const response: ApiResponse<DashboardDataRequest> = await res.json()
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
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body)
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

  updateProduct: async (id: number, body: Omit<Product, "id"> | any): Promise<Product> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: await cookieHeader(),
      },
      body: JSON.stringify(body)
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
  }
}
