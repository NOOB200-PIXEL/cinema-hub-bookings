import { Movie } from '@/utils/mockData';
import { Button } from './ui/button';
import { Clock, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--cinema-red)/0.3)]">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 text-accent shrink-0">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{movie.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.language}</span>
          </div>
        </div>

        <Button
          variant="cinema"
          className="w-full"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          {movie.status === 'now-showing' ? 'Book Now' : 'View Details'}
        </Button>
      </div>

      {movie.status === 'coming-soon' && (
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
          Coming Soon
        </div>
      )}
    </div>
  );
};
