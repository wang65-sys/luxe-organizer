import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import QuickAddButton from '../ui/quick-add-button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-0 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
          {children}
        </div>
      </main>

      <QuickAddButton />
    </div>
  );
}