
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Button from '../ui-custom/Button';
import { toast } from 'sonner';
import { Event, EventService } from '@/services/eventService';

interface TicketBookingProps {
  event: Event;
  onClose: () => void;
}

const TicketBooking: React.FC<TicketBookingProps> = ({ event, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = event.price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (value > event.availableSeats) {
      setQuantity(event.availableSeats);
    } else {
      setQuantity(value);
    }
  };

  const handleBookTicket = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // In a real application, we would use the actual user ID
      // Here we're using a mock user ID 'u2' from our mock data
      await EventService.bookTicket(event.id, 'u2', quantity);
      
      setIsLoading(false);
      toast.success('Tickets booked successfully!');
      onClose();
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to book tickets. Please try again.');
      console.error('Booking error:', error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Tickets</DialogTitle>
          <DialogDescription>
            Enter your details to book tickets for {event.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Number of Tickets</Label>
            <Input 
              id="quantity" 
              type="number" 
              min={1} 
              max={event.availableSeats} 
              value={quantity} 
              onChange={handleQuantityChange} 
            />
            <p className="text-xs text-muted-foreground">
              {event.availableSeats} tickets available
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price per ticket:</span>
              <span>${event.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleBookTicket}
            isLoading={isLoading}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketBooking;
