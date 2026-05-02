"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getDashboardBreadcrumbs } from "@/lib/dashboard-breadcrumbs"

export function DashboardHeader() {
  const pathname = usePathname()
  const crumbs = getDashboardBreadcrumbs(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex min-w-0 flex-1 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <Separator
          orientation="vertical"
          className="mr-2 shrink-0 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb className="min-w-0">
          <BreadcrumbList className="flex-nowrap">
            {crumbs.flatMap((crumb, index) => {
              const isLast = index === crumbs.length - 1
              const item = (
                <BreadcrumbItem key={`crumb-${index}`} className="min-w-0 shrink">
                  {isLast || !crumb.href ? (
                    <BreadcrumbPage className="truncate">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href} className="truncate">
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              )
              if (index === 0) {
                return [item]
              }
              return [
                <BreadcrumbSeparator key={`sep-${index}`} />,
                item,
              ]
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
