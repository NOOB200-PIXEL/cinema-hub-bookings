import { Link, useNavigate } from 'react-router-dom';
import { Film, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cinema-darker/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg group-hover:shadow-[0_0_20px_hsl(var(--cinema-red)/0.5)] transition-all duration-300">
            <Film className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CinemaHub
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  className="gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate('/bookings')}
                className="gap-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button
              variant="cinema"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
