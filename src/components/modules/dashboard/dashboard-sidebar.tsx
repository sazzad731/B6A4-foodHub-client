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
import { Route } from "@/types/routes.types";
import { adminRoute } from "@/routes/admin.routes";
import { providerRoute } from "@/routes/provider.routes";
import { customerRoute } from "@/routes/customer.routes";
import { ROLES } from "@/constants/roles";
import { usePathname } from "next/navigation"


export function DashboardSidebar({user, ...props }: {user: {role: string} & React.ComponentProps<typeof Sidebar>}) {
  const pathName = usePathname();
  let routes: Route[] = [];

  switch (user.role) {
    case ROLES.admin:
      routes = adminRoute;
      break;
    case ROLES.provider:
      routes = providerRoute;
      break;
    case ROLES.customer:
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
                <SidebarMenuButton className={`${pathName === item.url ? "" : "bg-secondary"} cursor-pointer font-medium`}>
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
