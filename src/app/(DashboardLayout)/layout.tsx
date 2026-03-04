import { getUser } from '@/services/auth';
import React from 'react';

const DashboardLayout = async({customer, provider, admin}: {customer: React.ReactNode, provider: React.ReactNode, admin: React.ReactNode}) => {
  const user = await getUser();
  return (
    <>
      {user?.role === 'CUSTOMER' && customer}
      {user?.role === 'PROVIDER' && provider}
      {user?.role === 'ADMIN' && admin}
    </>
  );
};

export default DashboardLayout;