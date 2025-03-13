
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  price: number;
  category: string;
  featured?: boolean;
  availableSeats: number;
  organizer: string;
  speakers: Speaker[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    instagram?: string;
  };
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  event: string;
  date: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}
