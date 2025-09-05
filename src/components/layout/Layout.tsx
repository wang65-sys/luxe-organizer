import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import QuickAddButton from '../ui/quick-add-button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="flex-1 min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="container mx-auto px-3 md:px-8 py-4 md:py-8 max-w-7xl">
          {children}
        </div>
      </main>

      <QuickAddButton />
    </div>
  );
}