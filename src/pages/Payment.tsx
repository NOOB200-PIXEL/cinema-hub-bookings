import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Payment = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedHall, selectedShowtime, selectedSeats, totalAmount, clearBooking } = useBooking();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (method: string) => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Payment successful!');
    navigate('/confirmation');
    setProcessing(false);
  };

  if (!selectedMovie || !selectedHall || !selectedShowtime || selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Booking Summary</h2>
              
              <div className="space-y-4 p-6 bg-card rounded-xl border border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Movie</p>
                  <p className="font-semibold text-lg">{selectedMovie.title}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Hall</p>
                  <p className="font-semibold">{selectedHall.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Showtime</p>
                  <p className="font-semibold">{selectedShowtime.date} at {selectedShowtime.time}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Seats</p>
                  <p className="font-semibold">{selectedSeats.map(s => s.id).join(', ')}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Price per seat</span>
                    <span>Rs. {selectedShowtime.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Number of seats</span>
                    <span>{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
                    <span>Total Amount</span>
                    <span className="text-primary">Rs. {totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Payment Method</h2>
              
              <Tabs defaultValue="khalti" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="khalti">
                    <Wallet className="h-4 w-4 mr-2" />
                    Khalti
                  </TabsTrigger>
                  <TabsTrigger value="esewa">
                    <Wallet className="h-4 w-4 mr-2" />
                    eSewa
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="khalti" className="space-y-4 mt-6">
                  <div className="p-6 bg-card rounded-xl border border-border space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Khalti Digital Wallet</p>
                        <p className="text-sm text-muted-foreground">Pay with Khalti</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="khalti-mobile">Mobile Number</Label>
                        <Input id="khalti-mobile" placeholder="98XXXXXXXX" />
                      </div>
                      <div>
                        <Label htmlFor="khalti-pin">Khalti PIN</Label>
                        <Input id="khalti-pin" type="password" placeholder="Enter PIN" />
                      </div>
                    </div>

                    <Button
                      variant="cinema"
                      className="w-full"
                      size="lg"
                      onClick={() => handlePayment('khalti')}
                      disabled={processing}
                    >
                      {processing ? 'Processing...' : `Pay Rs. ${totalAmount} with Khalti`}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="esewa" className="space-y-4 mt-6">
                  <div className="p-6 bg-card rounded-xl border border-border space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">eSewa Digital Wallet</p>
                        <p className="text-sm text-muted-foreground">Pay with eSewa</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="esewa-id">eSewa ID</Label>
                        <Input id="esewa-id" placeholder="eSewa ID or Mobile" />
                      </div>
                      <div>
                        <Label htmlFor="esewa-password">Password</Label>
                        <Input id="esewa-password" type="password" placeholder="Enter Password" />
                      </div>
                    </div>

                    <Button
                      variant="cinema"
                      className="w-full"
                      size="lg"
                      onClick={() => handlePayment('esewa')}
                      disabled={processing}
                    >
                      {processing ? 'Processing...' : `Pay Rs. ${totalAmount} with eSewa`}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground text-center">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
