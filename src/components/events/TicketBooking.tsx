
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Button from '../ui-custom/Button';
import { toast } from 'sonner';
import { EventApi } from '@/services/apiService';
import { Event } from '@/services/types';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

interface TicketBookingProps {
  event: Event;
  onClose: () => void;
}

const TicketBooking: React.FC<TicketBookingProps> = ({ event, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

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
    if (!user) {
      toast.error('Please log in to book tickets');
      onClose();
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      await EventApi.bookTicket(event.id, quantity);
      
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
