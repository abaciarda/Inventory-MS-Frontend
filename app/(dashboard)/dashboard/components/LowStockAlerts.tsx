import { AlertTriangleIcon, PackageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const lowStockItems = [
    {
        id: 1,
        name: "USB-C Cable",
        sku: "PRD-003",
        currentQuantity: 4,
        minThreshold: 20,
    },
    {
        id: 2,
        name: "Wireless Mouse",
        sku: "PRD-001",
        currentQuantity: 8,
        minThreshold: 25,
    },
    {
        id: 3,
        name: "Laptop Stand",
        sku: "PRD-008",
        currentQuantity: 2,
        minThreshold: 10,
    },
];

export function LowStockAlerts() {
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
            <CardContent className="space-y-5 mt-3">
                {lowStockItems.map((item) => {
                    const percentage = Math.min(
                        Math.round((item.currentQuantity / item.minThreshold) * 100),
                        100
                    );
                    const isCritical = item.currentQuantity <= item.minThreshold * 0.3;
                    return (
                        <div key={item.id} className="rounded-md border p-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border">
                                        <PackageIcon className="size-4" />
                                    </div>
                                    <div className="flex flex-col flex-1 w-full gap-1">
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-medium leading-none">
                                                {item.name}
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                SKU: {item.sku}
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
                    );
                })}
            </CardContent>
        </Card>
    );
}