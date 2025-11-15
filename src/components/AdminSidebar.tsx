import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Film, Building2, Clock, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/movies', icon: Film, label: 'Movies' },
  { to: '/admin/halls', icon: Building2, label: 'Halls' },
  { to: '/admin/showtimes', icon: Clock, label: 'Showtimes' },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-card border-r border-border p-6 space-y-8">
      <Link to="/" className="flex items-center gap-2 group mb-8">
        <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
          <Film className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CinemaHub
        </span>
      </Link>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary text-muted-foreground hover:text-foreground mt-8"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </nav>
    </div>
  );
};
