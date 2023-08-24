import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-screen px-4 pt-8 pb-16">
      <div className="flex-grow">
        <Header />
        <main className="my-0 py-16">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
