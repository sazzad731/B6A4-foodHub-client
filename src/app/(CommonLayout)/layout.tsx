import Footer from '@/components/modules/home/Footer';
import { Navbar } from '@/components/shared/Navbar';
import React from 'react';

const CommonLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;