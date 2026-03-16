import { ROLES } from '@/constants/roles';
import { getUser } from '@/services/auth';
import React from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { DashboardSidebar } from '@/components/modules/dashboard/dashboard-sidebar';
import { Separator } from '@/components/ui/separator';

const DashboardLayout = async({customer, provider, admin}: {customer: React.ReactNode, provider: React.ReactNode, admin: React.ReactNode}) => {
  const user = await getUser();
  return (
    <SidebarProvider>
      <DashboardSidebar user={{ role: user?.role }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        {user?.role === ROLES.customer && customer}
        {user?.role === ROLES.provider && provider}
        {user?.role === ROLES.admin && admin}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;