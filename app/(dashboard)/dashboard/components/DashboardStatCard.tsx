import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardStatCardProps } from "@/types/app.types";
import { ArrowUpRightIcon } from "lucide-react";

export function DashboardStatCard({ title, value, description, icon: Icon, trend }: DashboardStatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                    <Icon className="size-5" />
                </div>

                {trend ? (
                    <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground">
                        <ArrowUpRightIcon className="size-3.5" />
                        {trend}
                    </div>
                ) : null}
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground">{title}</p>

                <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>

                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}