export interface Movie {
  id: string;
  title: string;
  genre: string[];
  duration: number;
  rating: number;
  language: string;
  releaseDate: string;
  status: 'now-showing' | 'coming-soon';
  description: string;
  posterUrl: string;
  bannerUrl: string;
  cast: string[];
  director: string;
}

export interface Hall {
  id: string;
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
  address: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  hallId: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip';
  status: 'available' | 'booked' | 'selected';
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  hallId: string;
  showtimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

export const locations = ['Dharan', 'Itahari', 'Biratnagar'];

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Quantum Paradox',
    genre: ['Sci-Fi', 'Thriller'],
    duration: 148,
    rating: 8.5,
    language: 'English',
    releaseDate: '2024-12-01',
    status: 'now-showing',
    description: 'A mind-bending journey through parallel universes where reality is not what it seems.',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200',
    cast: ['John Doe', 'Jane Smith', 'Robert Johnson'],
    director: 'Christopher Nolan',
  },
  {
    id: '2',
    title: 'Echoes of Eternity',
    genre: ['Drama', 'Romance'],
    duration: 132,
    rating: 7.8,
    language: 'English',
    releaseDate: '2024-11-15',
    status: 'now-showing',
    description: 'A timeless love story that transcends generations and challenges destiny itself.',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200',
    cast: ['Emily Watson', 'Michael Brown'],
    director: 'Greta Gerwig',
  },
  {
    id: '3',
    title: 'Shadow Protocol',
    genre: ['Action', 'Thriller'],
    duration: 125,
    rating: 8.2,
    language: 'English',
    releaseDate: '2024-12-10',
    status: 'now-showing',
    description: 'An elite agent must uncover a global conspiracy before time runs out.',
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200',
    cast: ['Tom Hardy', 'Charlize Theron'],
    director: 'Denis Villeneuve',
  },
  {
    id: '4',
    title: 'The Last Kingdom',
    genre: ['Fantasy', 'Adventure'],
    duration: 165,
    rating: 9.1,
    language: 'English',
    releaseDate: '2025-01-05',
    status: 'coming-soon',
    description: 'An epic tale of magic, betrayal, and the quest to save a dying kingdom.',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200',
    cast: ['Henry Cavill', 'Anya Taylor-Joy'],
    director: 'Peter Jackson',
  },
  {
    id: '5',
    title: 'Midnight in Mumbai',
    genre: ['Comedy', 'Drama'],
    duration: 118,
    rating: 7.5,
    language: 'Hindi',
    releaseDate: '2025-01-12',
    status: 'coming-soon',
    description: 'A hilarious journey through the streets of Mumbai following an unlikely friendship.',
    posterUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200',
    cast: ['Rajkummar Rao', 'Kriti Sanon'],
    director: 'Rajkumar Hirani',
  },
];

export const halls: Hall[] = [
  {
    id: '1',
    name: 'Dharan Cineplex',
    location: 'Dharan',
    capacity: 200,
    facilities: ['3D', 'Dolby Atmos', 'Recliner Seats'],
    address: 'Main Road, Dharan',
  },
  {
    id: '2',
    name: 'Royal Cinema Dharan',
    location: 'Dharan',
    capacity: 150,
    facilities: ['2D', '3D', 'Food Court'],
    address: 'City Center, Dharan',
  },
  {
    id: '3',
    name: 'Itahari Multiplex',
    location: 'Itahari',
    capacity: 180,
    facilities: ['3D', 'IMAX', 'VIP Lounge'],
    address: 'Shopping Complex, Itahari',
  },
  {
    id: '4',
    name: 'Star Cinema Itahari',
    location: 'Itahari',
    capacity: 120,
    facilities: ['2D', '3D', 'Parking'],
    address: 'Highway Road, Itahari',
  },
  {
    id: '5',
    name: 'Biratnagar Grand',
    location: 'Biratnagar',
    capacity: 250,
    facilities: ['3D', 'IMAX', 'Dolby Atmos', 'Premium Seats'],
    address: 'Main Plaza, Biratnagar',
  },
  {
    id: '6',
    name: 'Metro Cinema Biratnagar',
    location: 'Biratnagar',
    capacity: 140,
    facilities: ['2D', '3D', 'Snack Bar'],
    address: 'City Square, Biratnagar',
  },
];

export const showtimes: Showtime[] = [
  // The Quantum Paradox
  { id: '1', movieId: '1', hallId: '1', date: '2024-12-15', time: '10:00 AM', price: 350, availableSeats: 45 },
  { id: '2', movieId: '1', hallId: '1', date: '2024-12-15', time: '02:00 PM', price: 400, availableSeats: 32 },
  { id: '3', movieId: '1', hallId: '1', date: '2024-12-15', time: '06:00 PM', price: 450, availableSeats: 18 },
  { id: '4', movieId: '1', hallId: '2', date: '2024-12-15', time: '11:00 AM', price: 300, availableSeats: 56 },
  { id: '5', movieId: '1', hallId: '3', date: '2024-12-15', time: '03:00 PM', price: 380, availableSeats: 41 },
  { id: '6', movieId: '1', hallId: '5', date: '2024-12-15', time: '07:00 PM', price: 500, availableSeats: 25 },
  
  // Echoes of Eternity
  { id: '7', movieId: '2', hallId: '2', date: '2024-12-15', time: '09:30 AM', price: 280, availableSeats: 67 },
  { id: '8', movieId: '2', hallId: '3', date: '2024-12-15', time: '01:00 PM', price: 350, availableSeats: 44 },
  { id: '9', movieId: '2', hallId: '4', date: '2024-12-15', time: '05:00 PM', price: 320, availableSeats: 38 },
  { id: '10', movieId: '2', hallId: '6', date: '2024-12-15', time: '08:00 PM', price: 400, availableSeats: 29 },
  
  // Shadow Protocol
  { id: '11', movieId: '3', hallId: '1', date: '2024-12-15', time: '12:00 PM', price: 420, availableSeats: 51 },
  { id: '12', movieId: '3', hallId: '4', date: '2024-12-15', time: '04:00 PM', price: 380, availableSeats: 35 },
  { id: '13', movieId: '3', hallId: '5', date: '2024-12-15', time: '09:00 PM', price: 480, availableSeats: 22 },
];

export const generateSeats = (hallCapacity: number): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = Math.ceil(hallCapacity / rows.length);
  
  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      let type: 'regular' | 'premium' | 'vip' = 'regular';
      if (rowIndex >= 7) type = 'vip';
      else if (rowIndex >= 4) type = 'premium';
      
      // Randomly mark some seats as booked for realism
      const isBooked = Math.random() > 0.7;
      
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        type,
        status: isBooked ? 'booked' : 'available',
      });
    }
  });
  
  return seats;
};

export const mockBookings: Booking[] = [
  {
    id: 'B001',
    userId: 'user1',
    movieId: '1',
    hallId: '1',
    showtimeId: '2',
    seats: ['E5', 'E6'],
    totalAmount: 800,
    bookingDate: '2024-12-10',
    status: 'confirmed',
  },
  {
    id: 'B002',
    userId: 'user1',
    movieId: '2',
    hallId: '3',
    showtimeId: '8',
    seats: ['F3', 'F4', 'F5'],
    totalAmount: 1050,
    bookingDate: '2024-12-08',
    status: 'confirmed',
  },
];
