import type { UserRequest, UserResponse } from "@/types/app.types"
import { env } from "./env"
import { cookies } from "next/headers"
import { CreateUserFormValues } from "@/app/schemas/auth.schema"

async function cookieHeader(): Promise<string> {
  const store = await cookies()
  return store
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")
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

      const data: UserResponse[] = await res.json()
      return data
    } catch(error) {
      console.error("API ERROR:", error)
      return []
    }
  },

  updateUser: async (id: number, body: UserRequest): Promise<UserResponse> => {
    try {
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
        throw new Error(text || "Failed to update user")
      }

      return res.json() as Promise<UserResponse>
    } catch(error) {
      console.error("API ERROR:", error)
      return null as unknown as UserResponse
    }
  },

  createUser: async (body: CreateUserFormValues): Promise<UserResponse> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookieHeader(),
        },
        body: JSON.stringify(body),
      })
  
      if(!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create user");
      }
      
      return res.json() as Promise<UserResponse>;
    } catch(error) {
      console.error("API ERROR:", error)
      return null as unknown as UserResponse
    }
  }
}