"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useAuth } from "@/components/auth-provider"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { appNavSections } from "@/lib/dashboard-nav"

function isNavActive(pathname: string, href: string) {
  return pathname === href
}

export function NavMain() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <>
      {appNavSections.map((section) => {
        const visibleItems = section.items.filter(
          (item) => !item.isAdmin || user?.role === "SME_OWNER"
        )
        if (visibleItems.length === 0) return null

        return (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarMenu>
              {visibleItems.map((item) => {
                const Icon = item.icon
                const active = isNavActive(pathname, item.href)

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        )
      })}
    </>
  )
}