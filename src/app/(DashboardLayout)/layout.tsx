import { ROLES } from '@/constants/roles';
import { getUser } from '@/services/auth';
import React from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { DashboardSidebar } from '@/components/modules/dashboard/dashboard-sidebar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const DashboardLayout = async({customer, provider, admin}: {customer: React.ReactNode, provider: React.ReactNode, admin: React.ReactNode}) => {
  const user = await getUser();
  return (
    <SidebarProvider>
      <DashboardSidebar user={{ role: user?.role }} />
      <SidebarInset className="bg-fh-cream">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-fh-cream-dark bg-white">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="hidden text-sm font-medium text-fh-green-muted sm:inline">
              {user?.role ? `${user.role.toLowerCase()} workspace` : "Dashboard"}
            </span>
          </div>
          <div className="px-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </header>
        {user?.role === ROLES.CUSTOMER && customer}
        {user?.role === ROLES.PROVIDER && provider}
        {user?.role === ROLES.ADMIN && admin}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
