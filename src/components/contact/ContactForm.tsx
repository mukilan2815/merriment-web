
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Button from '../ui-custom/Button';
import { toast } from 'sonner';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <p className="text-muted-foreground mb-8">
          Have questions about our events or need assistance? Fill out the form and our team will get back to you as soon as possible.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Our Location</h3>
              <p className="text-muted-foreground">123 Event Street, San Francisco, CA 94103</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Email Us</h3>
              <p className="text-muted-foreground">info@eventify.com</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Call Us</h3>
              <p className="text-muted-foreground">+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select
              value={formData.subject}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                <SelectItem value="Event Information">Event Information</SelectItem>
                <SelectItem value="Ticket Support">Ticket Support</SelectItem>
                <SelectItem value="Partnership Opportunities">Partnership Opportunities</SelectItem>
                <SelectItem value="Feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            isLoading={isLoading}
            icon={<Send className="w-4 h-4" />}
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
