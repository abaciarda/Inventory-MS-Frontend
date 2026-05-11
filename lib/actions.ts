"use server"

import { CreateUserFormValues, EditUserFormValues } from "@/app/schemas/auth.schema"
import { CreateProductFormValues, EditProductFormValues } from "@/app/schemas/product.schema"
import { api } from "@/lib/api"
import type { ProductActionResult, UserActionResult } from "@/types/app.types"
import { revalidatePath } from "next/cache"

export async function updateUserAction({ id, username, role }: EditUserFormValues): Promise<UserActionResult> {
  try {
    const user = await api.updateUser({ id, username, role })
    revalidatePath("/users")
    return { ok: true, user }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed"
    return { ok: false, message }
  }
}

export async function createUserAction({ username, password, role }: CreateUserFormValues): Promise<UserActionResult> {
  try {
    const user = await api.createUser({ username, password, role })
    revalidatePath("/users")
    return { ok: true, user }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Create failed"
    return { ok: false, message }
  }
}

export async function createProductAction(data: CreateProductFormValues): Promise<ProductActionResult> {
  try {
    const product = await api.createProduct(data);
    revalidatePath("/products")
    return { ok: true, product }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Create failed"
    return { ok: false, message }
  }
}

export async function updateProductAction(data: EditProductFormValues): Promise<ProductActionResult> {
  try {
    const { id, ...rest } = data;
    const product = await api.updateProduct(id, rest);
    revalidatePath("/products")
    return { ok: true, product }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed"
    return { ok: false, message }
  }
}

export async function deleteProductAction(id: number): Promise<ProductActionResult> {
  try {
    await api.deleteProduct(id);
    revalidatePath("/products")
    return { ok: true }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Delete failed"
    return { ok: false, message }
  }
}
