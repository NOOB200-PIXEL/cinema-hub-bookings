import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { movies } from '@/utils/mockData';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    toast.success('Movie deleted successfully (demo)');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Movies</h1>
              <p className="text-muted-foreground mt-1">Add, edit, or remove movies</p>
            </div>
            <Button variant="cinema" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Movie
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300 flex items-center gap-6"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{movie.title}</h3>
                      <div className="flex gap-2 mt-1">
                        {movie.genre.map(g => (
                          <span key={g} className="text-xs px-2 py-1 rounded-full bg-secondary">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      movie.status === 'now-showing'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {movie.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Duration: {movie.duration} min</span>
                    <span>•</span>
                    <span>Rating: {movie.rating}/10</span>
                    <span>•</span>
                    <span>Language: {movie.language}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {movie.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDelete(movie.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Movies;
