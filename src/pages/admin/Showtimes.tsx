import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { showtimes, movies, halls } from '@/utils/mockData';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Showtimes = () => {
  const handleDelete = (id: string) => {
    toast.success('Showtime deleted successfully (demo)');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Showtimes</h1>
              <p className="text-muted-foreground mt-1">Add, edit, or remove showtimes</p>
            </div>
            <Button variant="cinema" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Showtime
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {showtimes.map((showtime) => {
              const movie = movies.find(m => m.id === showtime.movieId);
              const hall = halls.find(h => h.id === showtime.hallId);

              return (
                <div
                  key={showtime.id}
                  className="p-6 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold">{movie?.title}</h3>
                        <span className="text-sm text-muted-foreground">at</span>
                        <h4 className="text-lg font-semibold text-primary">{hall?.name}</h4>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{showtime.date}</span>
                        </div>
                        <span>•</span>
                        <span>{showtime.time}</span>
                        <span>•</span>
                        <span className="font-semibold text-accent">Rs. {showtime.price}</span>
                        <span>•</span>
                        <span>{showtime.availableSeats} seats available</span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Location: {hall?.location}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleDelete(showtime.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Showtimes;
