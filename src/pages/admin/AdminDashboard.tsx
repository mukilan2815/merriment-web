import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventApi } from '@/services/apiService';
import { useUserContext } from '@/context/UserContext';
import { 
  Calendar, 
  Users, 
  Ticket, 
  TrendingUp,
  ArrowUpRight,
  ImageIcon
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useUserContext();
  
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: EventApi.getEvents
  });
  
  const { data: speakers, isLoading: speakersLoading } = useQuery({
    queryKey: ['speakers'],
    queryFn: EventApi.getSpeakers
  });
  
  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['admin-tickets'],
    queryFn: EventApi.getAllTickets
  });
  
  const stats = [
    {
      title: 'Total Events',
      value: events?.length || 0,
      icon: <Calendar className="h-8 w-8 text-primary" />,
      loading: eventsLoading,
      path: '/admin/events'
    },
    {
      title: 'Total Speakers',
      value: speakers?.length || 0,
      icon: <Users className="h-8 w-8 text-primary" />,
      loading: speakersLoading,
      path: '/admin/speakers'
    },
    {
      title: 'Tickets Sold',
      value: tickets?.length || 0,
      icon: <Ticket className="h-8 w-8 text-primary" />,
      loading: ticketsLoading,
      path: '/admin/tickets'
    },
    {
      title: 'Featured Events',
      value: events?.filter(e => e.featured)?.length || 0,
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      loading: eventsLoading,
      path: '/admin/events'
    }
  ];
  
  const upcomingEvents = events
    ?.filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  {stat.loading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  )}
                </div>
                {stat.icon}
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full justify-between" asChild>
                <Link to={stat.path}>
                  <span>View Details</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upcoming Events</h3>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/events">View All</Link>
              </Button>
            </div>
            {eventsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-14 w-14 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(event.date);
                  return (
                    <div key={event.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {eventDate.toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${event.price}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.availableSeats} seats left
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming events
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link to="/admin/events/create">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add New Event
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/admin/speakers/create">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Speaker
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/admin/gallery/upload">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload Gallery Image
                </Link>
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-4">System Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">API Status</span>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  Connected
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
