
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EventApi } from '@/services/apiService';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Calendar, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminEventsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: events, isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: EventApi.getEvents
  });
  
  const deleteEventMutation = useMutation({
    mutationFn: EventApi.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      toast.success('Event deleted successfully');
      setDeleteEventId(null);
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  });
  
  const handleDeleteEvent = () => {
    if (deleteEventId) {
      deleteEventMutation.mutate(deleteEventId);
    }
  };
  
  // Get unique categories from events
  const categories = events ? 
    ['all', ...new Set(events.map(event => event.category))] : 
    ['all'];
  
  // Filter events based on search query and category
  const filteredEvents = events?.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/events/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : filteredEvents && filteredEvents.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => {
                const eventDate = new Date(event.date);
                const isPastEvent = eventDate < new Date();
                
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {eventDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      {isPastEvent && (
                        <Badge variant="secondary" className="mt-1">Past Event</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.category}</Badge>
                    </TableCell>
                    <TableCell>${event.price}</TableCell>
                    <TableCell>{event.availableSeats}</TableCell>
                    <TableCell>
                      {event.featured ? (
                        <Badge variant="default" className="bg-primary">Featured</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/events/${event.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/events/edit/${event.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteEventId(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            {searchQuery || categoryFilter !== 'all' 
              ? 'Try adjusting your search filters' 
              : 'Get started by creating your first event'
            }
          </p>
          <Button asChild>
            <Link to="/admin/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Link>
          </Button>
        </div>
      )}
      
      <Dialog open={!!deleteEventId} onOpenChange={(open) => !open && setDeleteEventId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteEventId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteEvent}
              disabled={deleteEventMutation.isPending}
            >
              {deleteEventMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Event'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventsPage;
