import React, { createContext, useContext, useState } from 'react';
import { Movie, Hall, Showtime, Seat } from '@/utils/mockData';

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedHall: Hall | null;
  selectedShowtime: Showtime | null;
  selectedSeats: Seat[];
  selectedLocation: string;
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedHall: (hall: Hall | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  setSelectedLocation: (location: string) => void;
  clearBooking: () => void;
  totalAmount: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('Dharan');

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedHall(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const totalAmount = selectedShowtime ? selectedShowtime.price * selectedSeats.length : 0;

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        selectedHall,
        selectedShowtime,
        selectedSeats,
        selectedLocation,
        setSelectedMovie,
        setSelectedHall,
        setSelectedShowtime,
        setSelectedSeats,
        setSelectedLocation,
        clearBooking,
        totalAmount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
