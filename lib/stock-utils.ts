import type { LowStockRow, Product, StockMovement, StockMovementRow } from "@/types/app.types"

export function formatStockTimestamp(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function enrichMovements(
  movements: StockMovement[],
  products: Product[]
): StockMovementRow[] {
  const productMap = new Map(products.map((product) => [product.id, product]))

  return movements.map((movement) => {
    const product = productMap.get(movement.productId)
    return {
      ...movement,
      productName: product?.name,
      productSku: product?.sku,
    }
  })
}

export function buildLowStockRows(
  stocks: { id: number; currentQuantity: number; minThreshold: number; lastUpdated: string; productId: number }[],
  products: Product[]
): LowStockRow[] {
  const productMap = new Map(products.map((product) => [product.id, product]))

  return stocks
    .filter((stock) => stock.currentQuantity <= stock.minThreshold)
    .map((stock) => {
      const product = productMap.get(stock.productId)
      return {
        ...stock,
        productName: product?.name ?? `Product #${stock.productId}`,
        productSku: product?.sku ?? "—",
      }
    })
}
