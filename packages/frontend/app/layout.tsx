import React, { ReactNode } from 'react';
import './globals.css';

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'Airplane',
  description: 'manage mock api servers',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
