import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { mockBookings, movies, halls, showtimes } from '@/utils/mockData';
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react';

const BookingHistory = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>

          {mockBookings.length > 0 ? (
            <div className="space-y-4">
              {mockBookings.map((booking) => {
                const movie = movies.find(m => m.id === booking.movieId);
                const hall = halls.find(h => h.id === booking.hallId);
                const showtime = showtimes.find(s => s.id === booking.showtimeId);

                return (
                  <div
                    key={booking.id}
                    className="p-6 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{movie?.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{hall?.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{showtime?.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{showtime?.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {booking.status}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Ticket className="h-5 w-5" />
                        <span>Seats: {booking.seats.join(', ')}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-xl font-bold text-primary">Rs. {booking.totalAmount}</p>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Booking ID: {booking.id} • Booked on {booking.bookingDate}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <Ticket className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <p className="text-xl text-muted-foreground">No bookings yet</p>
              <p className="text-muted-foreground">
                Start booking your favorite movies now!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingHistory;
