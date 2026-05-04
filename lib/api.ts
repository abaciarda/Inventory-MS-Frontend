import { CreateUserFormValues } from "@/app/schemas/auth.schema"
import type { ApiResponse, UserRequest, UserResponse } from "@/types/app.types"
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
  } catch {
  }
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
    } catch(error) {
      console.error("API ERROR:", error)
      return []
    }
  },

  updateUser: async (id: number, body: UserRequest): Promise<UserResponse> => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
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

    const response = await res.json() as ApiResponse<UserResponse>
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

    const response = await res.json() as ApiResponse<UserResponse>
    return response.data
  },
}