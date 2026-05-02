import { appNavSections } from "@/lib/dashboard-nav"

export type BreadcrumbCrumb = {
  label: string
  href?: string
}

function humanizeSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getDashboardBreadcrumbs(
  pathname: string | null
): BreadcrumbCrumb[] {
  const path = pathname?.trim() || "/dashboard"

  for (const section of appNavSections) {
    const item = section.items.find((i) => i.href === path)
    if (item) {
      if (path === "/dashboard") {
        return [{ label: item.title }]
      }

      const crumbs: BreadcrumbCrumb[] = [
        { label: "Dashboard", href: "/dashboard" },
      ]

      const hub = section.breadcrumbHubHref
      if (hub && hub !== path) {
        crumbs.push({ label: section.label, href: hub })
      }

      crumbs.push({ label: item.title })
      return crumbs
    }
  }

  const parts = path.split("/").filter(Boolean)
  if (parts.length === 0) {
    return [{ label: "Dashboard" }]
  }

  const crumbs: BreadcrumbCrumb[] = [
    { label: "Dashboard", href: "/dashboard" },
  ]

  for (let i = 0; i < parts.length; i++) {
    const href = "/" + parts.slice(0, i + 1).join("/")
    const isLast = i === parts.length - 1
    if (isLast) {
      crumbs.push({ label: humanizeSegment(parts[i]) })
    } else {
      crumbs.push({ label: humanizeSegment(parts[i]), href })
    }
  }

  return crumbs
}
