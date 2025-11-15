import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { generateSeats, Seat } from '@/utils/mockData';
import { toast } from 'sonner';
import { ArrowLeft, Armchair } from 'lucide-react';

const SeatSelection = () => {
  const navigate = useNavigate();
  const {
    selectedMovie,
    selectedHall,
    selectedShowtime,
    selectedSeats,
    setSelectedSeats,
    totalAmount,
  } = useBooking();

  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (!selectedMovie || !selectedHall || !selectedShowtime) {
      toast.error('Please select a movie and showtime first');
      navigate('/');
      return;
    }
    setSeats(generateSeats(selectedHall.capacity));
  }, [selectedHall, selectedMovie, selectedShowtime, navigate]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
      setSeats(seats.map(s => s.id === seat.id ? { ...s, status: 'available' } : s));
    } else {
      if (selectedSeats.length >= 10) {
        toast.error('Maximum 10 seats can be selected');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
      setSeats(seats.map(s => s.id === seat.id ? { ...s, status: 'selected' } : s));
    }
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    navigate('/payment');
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'booked') return 'bg-muted text-muted-foreground cursor-not-allowed';
    if (seat.status === 'selected') return 'bg-primary text-primary-foreground';
    if (seat.type === 'vip') return 'bg-accent/20 border-accent hover:bg-accent hover:text-accent-foreground';
    if (seat.type === 'premium') return 'bg-secondary border-border hover:bg-primary hover:text-primary-foreground';
    return 'bg-card border-border hover:bg-primary hover:text-primary-foreground';
  };

  const rows = Array.from(new Set(seats.map(s => s.row)));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{selectedMovie?.title}</h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <span>{selectedHall?.name}</span>
              <span>•</span>
              <span>{selectedShowtime?.date} at {selectedShowtime?.time}</span>
            </div>
          </div>

          {/* Screen */}
          <div className="space-y-8">
            <div className="relative">
              <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50" />
              <p className="text-center mt-2 text-sm text-muted-foreground">SCREEN</p>
            </div>

            {/* Seats Grid */}
            <div className="space-y-4 overflow-x-auto pb-4">
              {rows.map(row => (
                <div key={row} className="flex items-center gap-2 justify-center">
                  <span className="w-8 text-center font-semibold text-muted-foreground">{row}</span>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {seats
                      .filter(s => s.row === row)
                      .map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === 'booked'}
                          className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${getSeatColor(seat)}`}
                          title={`${seat.id} - ${seat.type} - Rs. ${selectedShowtime?.price}`}
                        >
                          <Armchair className="h-5 w-5" />
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 justify-center items-center p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-card border-2 border-border flex items-center justify-center">
                  <Armchair className="h-4 w-4" />
                </div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Armchair className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Armchair className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <Armchair className="h-4 w-4" />
                </div>
                <span className="text-sm">VIP</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedSeats.length > 0 && (
            <div className="sticky bottom-4 p-6 bg-card rounded-xl border-2 border-primary shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Seats</p>
                  <p className="font-semibold text-lg">
                    {selectedSeats.map(s => s.id).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-2xl text-primary">Rs. {totalAmount}</p>
                </div>
              </div>
              <Button
                variant="cinema"
                className="w-full"
                size="lg"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeatSelection;
