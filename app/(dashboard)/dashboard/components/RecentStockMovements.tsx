import { Badge } from "@/components/ui/badge"
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
import { formatStockTimestamp } from "@/lib/stock-utils"
import type { MovementType, StockMovementRow } from "@/types/app.types"

function movementBadgeVariant(type: MovementType) {
  if (type === "IN") return "default" as const
  if (type === "OUT") return "secondary" as const
  return "outline" as const
}

function quantityPrefix(type: MovementType) {
  if (type === "IN") return "+"
  if (type === "OUT") return "-"
  return ""
}

type RecentStockMovementsProps = {
  movements: StockMovementRow[]
}

export function RecentStockMovements({ movements }: RecentStockMovementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Stock Movements</CardTitle>
        <CardDescription>
          Latest stock transactions recorded in the system.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {movements.length ? (
              movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-medium">
                    {movement.productName ?? `Product #${movement.productId}`}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {movement.productSku ?? "—"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className="min-w-10"
                      variant={movementBadgeVariant(movement.type)}
                    >
                      {movement.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    {quantityPrefix(movement.type)}
                    {movement.quantity}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {movement.username}
                  </TableCell>

                  <TableCell className="text-right text-muted-foreground">
                    {formatStockTimestamp(movement.timestamp)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No recent movements.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
