"use server"

import { revalidatePath } from "next/cache"
import { api } from "@/lib/api"
import type { UserActionResult, UserResponse } from "@/types/app.types"
import { CreateUserFormValues } from "@/app/schemas/auth.schema"

export async function updateUserAction(id: number, username: string, role: UserResponse["role"]): Promise<UserActionResult> {
  try {
    const user = await api.updateUser(id, { username, role })
    revalidatePath("/users")
    return { ok: true, user }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed"
    return { ok: false, message }
  }
}

export async function createUserAction({ username, password, role } : CreateUserFormValues): Promise<UserActionResult> {
  try {
    const user = await api.createUser({ username, password, role});
    revalidatePath("/users")
    return { ok: true, user }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed"
    return { ok: false, message }
  }
}
