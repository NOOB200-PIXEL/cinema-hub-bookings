import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { movies, halls, showtimes } from '@/utils/mockData';
import { Clock, Star, Calendar, MapPin } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedHall, setSelectedShowtime, selectedLocation, setSelectedLocation } = useBooking();
  
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const movieShowtimes = showtimes.filter(s => s.movieId === movie.id);
  const availableHalls = halls.filter(h => 
    movieShowtimes.some(s => s.hallId === h.id) && h.location === selectedLocation
  );

  const handleShowtimeSelect = (showtimeId: string) => {
    const showtime = showtimes.find(s => s.id === showtimeId);
    const hall = halls.find(h => h.id === showtime?.hallId);
    
    if (showtime && hall) {
      setSelectedMovie(movie);
      setSelectedHall(hall);
      setSelectedShowtime(showtime);
      toast.success('Showtime selected!');
      navigate('/seats');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Banner */}
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={movie.bannerUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl border-2 border-border"
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                  <div className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-xl font-bold">{movie.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.genre.map(g => (
                    <span key={g} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{movie.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{movie.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Release: {new Date(movie.releaseDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Director:</span> {movie.director}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Cast:</span> {movie.cast.join(', ')}
                  </p>
                </div>
              </div>

              {movie.status === 'now-showing' && (
                <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
                  <h2 className="text-2xl font-bold">Book Tickets</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dharan">Dharan</SelectItem>
                          <SelectItem value="Itahari">Itahari</SelectItem>
                          <SelectItem value="Biratnagar">Biratnagar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {availableHalls.length > 0 ? (
                      <div className="space-y-4">
                        {availableHalls.map(hall => {
                          const hallShowtimes = movieShowtimes.filter(s => s.hallId === hall.id);
                          return (
                            <div key={hall.id} className="space-y-3 p-4 bg-secondary/50 rounded-lg">
                              <div>
                                <h3 className="font-semibold text-lg">{hall.name}</h3>
                                <p className="text-sm text-muted-foreground">{hall.address}</p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {hallShowtimes.map(showtime => (
                                  <Button
                                    key={showtime.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleShowtimeSelect(showtime.id)}
                                    className="hover:bg-primary hover:text-primary-foreground"
                                  >
                                    <span>{showtime.time}</span>
                                    <span className="text-xs ml-2 text-muted-foreground">
                                      Rs. {showtime.price}
                                    </span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No shows available in {selectedLocation}. Try another location.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {movie.status === 'coming-soon' && (
                <div className="p-6 bg-card rounded-xl border border-border text-center">
                  <p className="text-lg text-muted-foreground">
                    This movie is coming soon! Check back later for showtimes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetails;
