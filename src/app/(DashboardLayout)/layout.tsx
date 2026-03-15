import { ROLES } from '@/constants/roles';
import { getUser } from '@/services/auth';
import React from 'react';
import {SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from '@/components/modules/dashboard/dashboard-sidebar';

const DashboardLayout = async({customer, provider, admin}: {customer: React.ReactNode, provider: React.ReactNode, admin: React.ReactNode}) => {
  const user = await getUser();
  return (
    <SidebarProvider>
      <DashboardSidebar user={{role: user?.role}}/>
      {user?.role === ROLES.customer && customer}
      {user?.role === ROLES.provider && provider}
      {user?.role === ROLES.admin && admin}
    </SidebarProvider>
  );
};

export default DashboardLayout;