import { LucideIcon } from "lucide-react";

export type DashboardStatCardProps = {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    trend?: string;
}