import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { movies, halls, showtimes, mockBookings } from '@/utils/mockData';
import { Film, Building2, Clock, Users, Ticket, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const stats = [
    {
      label: 'Total Movies',
      value: movies.length,
      icon: Film,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      label: 'Total Halls',
      value: halls.length,
      icon: Building2,
      color: 'text-accent',
      bgColor: 'bg-accent/20',
    },
    {
      label: 'Showtimes',
      value: showtimes.length,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
    },
    {
      label: 'Total Bookings',
      value: mockBookings.length,
      icon: Ticket,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
    },
  ];

  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage your cinema operations</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-6 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Revenue Card */}
          <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">Rs. {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-xl border border-border space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                Recent Movies
              </h2>
              <div className="space-y-3">
                {movies.slice(0, 5).map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">{movie.genre.join(', ')}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      movie.status === 'now-showing'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {movie.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Halls by Location
              </h2>
              <div className="space-y-3">
                {['Dharan', 'Itahari', 'Biratnagar'].map((location) => {
                  const locationHalls = halls.filter(h => h.location === location);
                  return (
                    <div
                      key={location}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <p className="font-semibold">{location}</p>
                      <span className="text-primary font-bold">{locationHalls.length} halls</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
