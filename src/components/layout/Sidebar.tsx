import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Target, 
  Archive, 
  Settings,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Archive', href: '/archive', icon: Archive },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-40 h-full bg-card border-r border-card-border
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
        w-72 flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-card-border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Planner</h1>
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-secondary-hover rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'nav-item-active' : ''}`
                }
                onClick={onClose}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t border-card-border">
          <div className="text-xs text-muted-foreground text-center">
            v1.0.0 • Clean & Modern
          </div>
        </div>
      </div>
    </>
  );
}