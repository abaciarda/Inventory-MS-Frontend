"use client"

import { CheckIcon, SearchIcon } from "lucide-react"
import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/app.types"

const RESULT_LIMIT = 50

type ProductSearchPickerProps = {
  products: Product[]
  value: string
  onChange: (productId: string) => void
  disabled?: boolean
}

export function ProductSearchPicker({
  products,
  value,
  onChange,
  disabled = false,
}: ProductSearchPickerProps) {
  const [search, setSearch] = useState("")

  const selectedProduct = products.find(
    (product) => String(product.id) === value
  )

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return []
    }

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          String(product.id).includes(query)
      )
      .slice(0, RESULT_LIMIT)
  }, [products, search])

  function handleSelect(product: Product) {
    onChange(String(product.id))
    setSearch("")
  }

  if (disabled && selectedProduct) {
    return (
      <div className="rounded-md border bg-muted/40 px-3 py-2.5 text-sm">
        <p className="font-medium">{selectedProduct.name}</p>
        <p className="text-muted-foreground">{selectedProduct.sku}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {selectedProduct && (
        <div className="flex items-start justify-between gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{selectedProduct.name}</p>
            <p className="text-xs text-muted-foreground">{selectedProduct.sku}</p>
          </div>
          {!disabled && (
            <button
              type="button"
              className="shrink-0 text-xs text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => onChange("")}
            >
              Clear
            </button>
          )}
        </div>
      )}

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, SKU, or ID..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          disabled={disabled}
          className="h-11 pl-9"
          autoComplete="off"
        />
      </div>

      {!search.trim() ? (
        <p className="text-xs text-muted-foreground">
          Type to search from {products.length} product(s). Showing up to{" "}
          {RESULT_LIMIT} matches.
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products match your search.</p>
      ) : (
        <ul
          className="max-h-56 overflow-y-auto rounded-md border"
          role="listbox"
          aria-label="Product search results"
        >
          {filteredProducts.map((product) => {
            const isSelected = String(product.id) === value

            return (
              <li key={product.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/60",
                    isSelected && "bg-muted"
                  )}
                  onClick={() => handleSelect(product)}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{product.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {product.sku}
                    </span>
                  </span>
                  {isSelected && (
                    <CheckIcon className="size-4 shrink-0 text-primary" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
