import { AlertTriangleIcon, PackageIcon } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { DashboardLowStockAlert } from "@/types/app.types"

type LowStockAlertsProps = {
  items: DashboardLowStockAlert[]
}

export function LowStockAlerts({ items }: LowStockAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>
              Products below the minimum threshold.
            </CardDescription>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
            <AlertTriangleIcon className="size-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-3 space-y-5">
        {items.length ? (
          items.map((item) => {
            const percentage =
              item.minThreshold > 0
                ? Math.min(
                    Math.round((item.currentQuantity / item.minThreshold) * 100),
                    100
                  )
                : 0
            const isCritical =
              item.minThreshold > 0 &&
              item.currentQuantity <= item.minThreshold * 0.3

            return (
              <div key={item.id} className="rounded-md border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-1 items-start gap-3">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border">
                      <PackageIcon className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-sm font-medium leading-none">
                          {item.productName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SKU: {item.productSku}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Current: {item.currentQuantity}</span>
                          <span>Threshold: {item.minThreshold}</span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    </div>
                  </div>
                  <Badge variant={isCritical ? "destructive" : "secondary"}>
                    {isCritical ? "Critical" : "Low"}
                  </Badge>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-sm text-muted-foreground">
            No low stock alerts right now.
          </p>
        )}

        <Button variant="outline" className="w-full" asChild>
          <Link href="/stock/alerts">View all alerts</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
