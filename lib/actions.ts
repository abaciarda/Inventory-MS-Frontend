"use server"

import { CreateUserFormValues, EditUserFormValues } from "@/app/schemas/auth.schema"
import {
  CreateCategoryFormValues,
  EditCategoryFormValues,
} from "@/app/schemas/category.schema"
import { CreateProductFormValues, EditProductFormValues } from "@/app/schemas/product.schema"
import { api } from "@/lib/api"
import type {
  CategoryActionResult,
  ProductActionResult,
  UserActionResult,
} from "@/types/app.types"
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

export async function createCategoryAction(
  data: CreateCategoryFormValues
): Promise<CategoryActionResult> {
  try {
    const category = await api.createCategory(data)
    revalidatePath("/categories")
    return { ok: true, category }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Create failed"
    return { ok: false, message }
  }
}

export async function updateCategoryAction(
  data: EditCategoryFormValues
): Promise<CategoryActionResult> {
  try {
    const { id, ...rest } = data
    const category = await api.updateCategory(id, rest)
    revalidatePath("/categories")
    return { ok: true, category }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed"
    return { ok: false, message }
  }
}

export async function deleteCategoryAction(id: number): Promise<CategoryActionResult> {
  try {
    await api.deleteCategory(id)
    revalidatePath("/categories")
    return { ok: true }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Delete failed"
    return { ok: false, message }
  }
}
