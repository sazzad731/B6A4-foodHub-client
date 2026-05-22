"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logo from "@/components/shared/Logo"
import { Route } from "@/types";
import { adminRoute } from "@/routes/admin.routes";
import { providerRoute } from "@/routes/provider.routes";
import { customerRoute } from "@/routes/customer.routes";
import { ROLES } from "@/constants/roles";
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


export function DashboardSidebar({
  user,
  ...props
}: { user: { role?: string | null } } & React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  let routes: Route[] = [];

  switch (user.role) {
    case ROLES.ADMIN:
      routes = adminRoute;
      break;
    case ROLES.PROVIDER:
      routes = providerRoute;
      break;
    case ROLES.CUSTOMER:
      routes = customerRoute;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {routes.map((item) => (
              <SidebarMenuItem key={item.title} className="mb-3 mx-3">
                <SidebarMenuButton
                  className={cn(
                    "cursor-pointer font-medium",
                    pathName === item.url ||
                      (item.url !== "/dashboard" && pathName.startsWith(item.url))
                      ? "bg-fh-coral text-white hover:bg-fh-coral-hover hover:text-white"
                      : "bg-secondary text-fh-green-muted hover:text-fh-green-deep",
                  )}
                >
                  <Link href={item.url} className="w-full">{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
