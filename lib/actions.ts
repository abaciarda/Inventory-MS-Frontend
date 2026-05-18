"use server"

import { CreateUserFormValues, EditUserFormValues } from "@/app/schemas/auth.schema"
import {
  CreateCategoryFormValues,
  EditCategoryFormValues,
} from "@/app/schemas/category.schema"
import { GenerateReportFormValues } from "@/app/schemas/report.schema"
import { CreateProductFormValues, EditProductFormValues } from "@/app/schemas/product.schema"
import {
  RecordStockMovementFormValues,
  UpdateStockThresholdFormValues,
  normalizeStockMovementInput,
} from "@/app/schemas/stock.schema"
import { api } from "@/lib/api"
import type {
  CategoryActionResult,
  ProductActionResult,
  ReportDownloadResult,
  StoredReportActionResult,
  StockActionResult,
  StockMovementActionResult,
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
    revalidatePath("/stock")
    revalidatePath("/stock/alerts")
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

export async function recordStockMovementAction(
  data: RecordStockMovementFormValues | RecordStockMovementFormValues[]
): Promise<StockMovementActionResult> {
  try {
    const values = normalizeStockMovementInput(data)
    const movement = await api.recordStockMovement(values)
    revalidatePath("/stock")
    revalidatePath("/stock/alerts")
    revalidatePath("/products")
    revalidatePath(`/products/${values.productId}/edit`)
    return { ok: true, movement }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Movement failed"
    return { ok: false, message }
  }
}

export async function updateStockThresholdAction(
  data: UpdateStockThresholdFormValues
): Promise<StockActionResult> {
  try {
    const stock = await api.updateStockThreshold(data.productId, {
      minThreshold: data.minThreshold,
    })
    revalidatePath("/stock/alerts")
    revalidatePath(`/products/${data.productId}/edit`)
    return { ok: true, stock }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed"
    return { ok: false, message }
  }
}

export async function generateReportAction(
  data: GenerateReportFormValues
): Promise<StoredReportActionResult> {
  try {
    const report = await api.generateReport(data)
    revalidatePath("/analytics/reports")
    return { ok: true, report }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Generate failed"
    return { ok: false, message }
  }
}

export async function downloadStoredReportAction(
  id: number
): Promise<ReportDownloadResult> {
  try {
    const file = await api.downloadStoredReport(id)
    return {
      ok: true,
      data: Buffer.from(file.data).toString("base64"),
      contentType: file.contentType,
      filename: file.filename,
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Download failed"
    return { ok: false, message }
  }
}
