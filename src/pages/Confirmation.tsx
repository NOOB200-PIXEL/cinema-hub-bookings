import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { CheckCircle, Download, Home } from 'lucide-react';

const Confirmation = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedHall, selectedShowtime, selectedSeats, totalAmount, clearBooking } = useBooking();

  useEffect(() => {
    if (!selectedMovie) {
      navigate('/');
    }
  }, [selectedMovie, navigate]);

  const bookingId = `CIN${Date.now().toString().slice(-8)}`;

  const handleDownloadTicket = () => {
    // In production, this would generate and download a PDF ticket
    alert('Ticket download feature coming soon!');
  };

  const handleGoHome = () => {
    clearBooking();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Booking Confirmed!</h1>
              <p className="text-lg text-muted-foreground">
                Your tickets have been booked successfully
              </p>
            </div>

            {/* Booking Details */}
            <div className="p-8 bg-card rounded-xl border-2 border-primary space-y-6 text-left shadow-2xl">
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="text-2xl font-bold text-primary">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="text-2xl font-bold">Rs. {totalAmount}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Movie</p>
                  <p className="font-semibold text-lg">{selectedMovie?.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Hall</p>
                    <p className="font-semibold">{selectedHall?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{selectedHall?.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{selectedShowtime?.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{selectedShowtime?.time}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Seats</p>
                  <p className="font-semibold text-lg">
                    {selectedSeats?.map(s => s.id).join(', ')}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Please show this booking ID at the hall counter
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={handleDownloadTicket}
              >
                <Download className="h-5 w-5" />
                Download Ticket
              </Button>
              <Button
                variant="cinema"
                size="lg"
                className="gap-2"
                onClick={handleGoHome}
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Button>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent">
              <p className="text-sm text-foreground">
                📧 A confirmation email has been sent to your registered email address
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
