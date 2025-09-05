import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-card-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-secondary-hover rounded-md transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo/Title for desktop */}
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Planner</h1>
        </div>

        {/* Time and Date */}
        <div className="flex flex-col items-end text-right">
          <div className="text-sm font-medium text-foreground">
            {formatTime(currentTime)}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </header>
  );
}