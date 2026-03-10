import { ROLES } from '@/constants/roles';
import { getUser } from '@/services/auth';
import React from 'react';

const DashboardLayout = async({customer, provider, admin}: {customer: React.ReactNode, provider: React.ReactNode, admin: React.ReactNode}) => {
  const user = await getUser();
  return (
    <>
      {user?.role === ROLES.customer && customer}
      {user?.role === ROLES.provider && provider}
      {user?.role === ROLES.admin && admin}
    </>
  );
};

export default DashboardLayout;