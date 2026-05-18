import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatPercent } from "@/lib/format-utils"
import type { ProductProfitability } from "@/types/app.types"

type TopProductsTableProps = {
  products: ProductProfitability[]
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Profitable Products</CardTitle>
        <CardDescription>
          Top 5 products by potential profit on current stock.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Margin</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length ? (
              products.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell className="font-medium">
                    {product.productName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(product.costPrice)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(product.salesPrice)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(product.potentialProfit)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercent(product.profitMargin)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No product profitability data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
