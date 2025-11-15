import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { halls } from '@/utils/mockData';
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Halls = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHalls = halls.filter(hall =>
    hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hall.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    toast.success('Hall deleted successfully (demo)');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Halls</h1>
              <p className="text-muted-foreground mt-1">Add, edit, or remove cinema halls</p>
            </div>
            <Button variant="cinema" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Hall
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search halls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHalls.map((hall) => (
              <div
                key={hall.id}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{hall.name}</h3>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{hall.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-semibold">{hall.capacity} seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-semibold">{hall.address}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Facilities:</p>
                  <div className="flex flex-wrap gap-2">
                    {hall.facilities.map(facility => (
                      <span
                        key={facility}
                        className="text-xs px-2 py-1 rounded-full bg-secondary"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDelete(hall.id)}
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

export default Halls;
