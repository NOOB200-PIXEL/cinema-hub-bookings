import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { movies } from '@/utils/mockData';
import { Search, Filter, Film, Ticket, Users, MessageCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'now-showing' | 'coming-soon'>('all');
  const navigate = useNavigate();

  const allGenres = Array.from(new Set(movies.flatMap(m => m.genre)));

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    const matchesStatus = selectedStatus === 'all' || movie.status === selectedStatus;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cinema-darker to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Experience Cinema<br />Like Never Before
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book tickets for the latest movies at your favorite halls. Simple, fast, and secure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="cinema" size="lg" className="gap-2" onClick={() => navigate('/chat')}>
                <MessageCircle className="h-5 w-5" />
                Live Support
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Ticket className="h-5 w-5" />
                Explore Movies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Latest Movies</h3>
              <p className="text-muted-foreground">Browse the newest releases and upcoming blockbusters</p>
            </div>
            <div className="text-center space-y-3 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                <Ticket className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Easy Booking</h3>
              <p className="text-muted-foreground">Select seats and book tickets in just a few clicks</p>
            </div>
            <div className="text-center space-y-3 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Multiple Locations</h3>
              <p className="text-muted-foreground">Find halls in Dharan, Itahari, and Biratnagar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto space-y-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">Browse Movies</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={(v: any) => setSelectedStatus(v)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Movies</SelectItem>
                  <SelectItem value="now-showing">Now Showing</SelectItem>
                  <SelectItem value="coming-soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Movie Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Film className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No movies found</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
