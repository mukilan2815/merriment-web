
// This is a mock service that would be replaced with real API calls in a production application

// Types
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

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
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

// Mock Data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2023',
    date: '2023-11-15',
    location: 'San Francisco Convention Center',
    description: 'Join us for the largest tech innovation summit of the year, featuring keynotes from industry leaders, workshops, and networking opportunities. Discover the latest trends and advancements in technology that are shaping our future.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    price: 299,
    category: 'Technology',
    featured: true,
    availableSeats: 500,
    organizer: 'Tech Innovations Inc.',
    speakers: [
      {
        id: '101',
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'Future Technologies',
        bio: 'Sarah is a visionary leader in AI and machine learning with over 15 years of experience in the tech industry.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          twitter: 'https://twitter.com/sarahjohnson',
          linkedin: 'https://linkedin.com/in/sarahjohnson',
        },
        featured: true,
      },
      {
        id: '102',
        name: 'David Chen',
        role: 'CEO',
        company: 'InnovateTech',
        bio: 'David leads one of the fastest-growing tech startups, focusing on sustainable technology solutions.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          twitter: 'https://twitter.com/davidchen',
          linkedin: 'https://linkedin.com/in/davidchen',
          website: 'https://davidchen.com',
        },
      },
    ],
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    date: '2023-12-05',
    location: 'Online - Virtual Event',
    description: 'An intensive masterclass for digital marketing professionals. Learn cutting-edge strategies in SEO, content marketing, social media, and paid advertising from top marketing experts.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
    price: 149,
    category: 'Marketing',
    availableSeats: 200,
    organizer: 'Digital Marketing Institute',
    speakers: [
      {
        id: '201',
        name: 'Emma Roberts',
        role: 'Marketing Director',
        company: 'Global Marketing Solutions',
        bio: 'Emma has led marketing campaigns for Fortune 500 companies and specializes in digital transformation.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          twitter: 'https://twitter.com/emmaroberts',
          linkedin: 'https://linkedin.com/in/emmaroberts',
        },
      },
    ],
  },
  {
    id: '3',
    title: 'Sustainable Design Conference',
    date: '2024-01-20',
    location: 'Chicago Design Center',
    description: 'A premier conference focusing on sustainable design practices, eco-friendly materials, and how design can address environmental challenges. Features exhibitions, workshops, and panel discussions.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
    price: 199,
    category: 'Design',
    featured: true,
    availableSeats: 300,
    organizer: 'Sustainable Design Association',
    speakers: [
      {
        id: '301',
        name: 'Michael Torres',
        role: 'Principal Designer',
        company: 'EcoDesign Studio',
        bio: 'Michael is an award-winning designer known for his innovative approaches to sustainable architecture and product design.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/michaeltorres',
          website: 'https://michaeltorres-design.com',
        },
      },
      {
        id: '302',
        name: 'Amara Lee',
        role: 'Sustainability Director',
        company: 'Global Design Initiatives',
        bio: 'Amara specializes in circular economy principles and has consulted for major brands on sustainable packaging and product lifecycle.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          twitter: 'https://twitter.com/amaralee',
          linkedin: 'https://linkedin.com/in/amaralee',
        },
        featured: true,
      },
    ],
  },
  {
    id: '4',
    title: 'Global Finance Forum',
    date: '2024-02-10',
    location: 'New York Financial District',
    description: 'The premier gathering for financial professionals, featuring discussions on global market trends, investment strategies, fintech innovations, and regulatory developments.',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=1000',
    price: 499,
    category: 'Finance',
    availableSeats: 250,
    organizer: 'World Finance Association',
    speakers: [
      {
        id: '401',
        name: 'Robert Zhao',
        role: 'Chief Economist',
        company: 'Global Banking Group',
        bio: 'Robert is a renowned economist who has advised governments and financial institutions on monetary policy and economic forecasting.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/robertzhao',
        },
      },
    ],
  },
  {
    id: '5',
    title: 'Health & Wellness Expo',
    date: '2024-03-15',
    location: 'Los Angeles Convention Center',
    description: 'A comprehensive expo featuring the latest in health technologies, nutrition, fitness routines, mental wellness practices, and preventative healthcare. Includes demonstrations, fitness classes, and health screenings.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000',
    price: 49,
    category: 'Health',
    availableSeats: 1000,
    organizer: 'Wellness Life Organization',
    speakers: [
      {
        id: '501',
        name: 'Dr. James Wilson',
        role: 'Cardiologist',
        company: 'Heart Health Institute',
        bio: 'Dr. Wilson is a leading cardiologist specializing in preventative heart care and lifestyle medicine.',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          twitter: 'https://twitter.com/drjameswilson',
          website: 'https://drjameswilson.com',
        },
      },
      {
        id: '502',
        name: 'Sophia Patel',
        role: 'Nutritionist',
        company: 'Nourish & Thrive',
        bio: 'Sophia is a registered nutritionist with expertise in plant-based nutrition and holistic wellness approaches.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          instagram: 'https://instagram.com/sophiapatel',
          website: 'https://nourishandthrive.com',
        },
        featured: true,
      },
    ],
  },
  {
    id: '6',
    title: 'Creative Arts Festival',
    date: '2024-04-22',
    location: 'Portland Arts District',
    description: 'A vibrant festival celebrating all forms of creative expression including visual arts, music, theater, and digital media. Features performances, exhibitions, workshops, and interactive installations.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1000',
    price: 75,
    category: 'Arts',
    featured: true,
    availableSeats: 800,
    organizer: 'Portland Creative Collective',
    speakers: [
      {
        id: '601',
        name: 'Isabella Morales',
        role: 'Artistic Director',
        company: 'Contemporary Arts Foundation',
        bio: 'Isabella has curated exhibitions at prestigious galleries worldwide and advocates for emerging artists in digital and traditional mediums.',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
        socialLinks: {
          instagram: 'https://instagram.com/isabellamorales',
          website: 'https://isabellamorales.art',
        },
      },
    ],
  },
];

// Additional speakers for the speaker page
const additionalSpeakers: Speaker[] = [
  {
    id: '701',
    name: 'Jonathan Parker',
    role: 'Blockchain Expert',
    company: 'Blockchain Innovations',
    bio: 'Jonathan has pioneered several blockchain solutions for enterprise applications and is a frequent speaker on cryptocurrency trends.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    socialLinks: {
      twitter: 'https://twitter.com/jonathanparker',
      linkedin: 'https://linkedin.com/in/jonathanparker',
    },
    featured: true,
  },
  {
    id: '702',
    name: 'Olivia Chen',
    role: 'UX Research Director',
    company: 'UserFirst Design',
    bio: 'Olivia leads user experience research at a leading design agency, focusing on accessible and inclusive digital experiences.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/oliviachen',
      website: 'https://oliviachen-ux.com',
    },
    featured: true,
  },
  {
    id: '703',
    name: 'Marcus Johnson',
    role: 'AI Ethics Researcher',
    company: 'Institute for Responsible Technology',
    bio: 'Marcus studies the ethical implications of artificial intelligence and advocates for responsible AI development practices.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    socialLinks: {
      twitter: 'https://twitter.com/marcusjohnson',
      linkedin: 'https://linkedin.com/in/marcusjohnson',
    },
  },
  {
    id: '704',
    name: 'Priya Sharma',
    role: 'Sustainable Energy Expert',
    company: 'Clean Energy Solutions',
    bio: 'Priya works on implementing renewable energy solutions in developing countries and consults on corporate sustainability initiatives.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/priyasharma',
      website: 'https://priyasharma.org',
    },
  },
];

// Mock gallery images
const mockGalleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
    alt: 'Tech Summit 2022 Keynote',
    event: 'Tech Innovation Summit',
    date: '2022-11-10',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    alt: 'Marketing Conference Workshop',
    event: 'Digital Marketing Masterclass',
    date: '2022-12-05',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000',
    alt: 'Design Exhibition',
    event: 'Sustainable Design Conference',
    date: '2023-01-20',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000',
    alt: 'Finance Panel Discussion',
    event: 'Global Finance Forum',
    date: '2023-02-10',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1472653431158-6364773b2fbc?auto=format&fit=crop&q=80&w=1000',
    alt: 'Wellness Workshop',
    event: 'Health & Wellness Expo',
    date: '2023-03-15',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1000',
    alt: 'Art Performance',
    event: 'Creative Arts Festival',
    date: '2023-04-22',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
    alt: 'Technology Exhibition',
    event: 'Tech Innovation Summit',
    date: '2022-11-11',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1000',
    alt: 'Networking Event',
    event: 'Digital Marketing Masterclass',
    date: '2022-12-06',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    alt: 'Conference Audience',
    event: 'Sustainable Design Conference',
    date: '2023-01-21',
  },
];

// Mock users for admin panel
const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@eventify.com',
    role: 'admin',
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: 'u3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
  },
];

// Mock tickets for admin panel
const mockTickets: Ticket[] = [
  {
    id: 't1',
    eventId: '1',
    userId: 'u2',
    quantity: 2,
    totalPrice: 598,
    purchaseDate: '2023-10-15',
    status: 'confirmed',
  },
  {
    id: 't2',
    eventId: '3',
    userId: 'u3',
    quantity: 1,
    totalPrice: 199,
    purchaseDate: '2023-10-18',
    status: 'confirmed',
  },
  {
    id: 't3',
    eventId: '2',
    userId: 'u2',
    quantity: 1,
    totalPrice: 149,
    purchaseDate: '2023-10-20',
    status: 'pending',
  },
];

// Service functions
export const EventService = {
  // Events
  getEvents: () => Promise.resolve(mockEvents),
  getFeaturedEvents: () => Promise.resolve(mockEvents.filter(e => e.featured)),
  getEventById: (id: string) => Promise.resolve(mockEvents.find(e => e.id === id)),
  searchEvents: (query: string) => Promise.resolve(
    mockEvents.filter(e => 
      e.title.toLowerCase().includes(query.toLowerCase()) || 
      e.description.toLowerCase().includes(query.toLowerCase()) ||
      e.category.toLowerCase().includes(query.toLowerCase())
    )
  ),
  createEvent: (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: `${mockEvents.length + 1}` };
    mockEvents.push(newEvent);
    return Promise.resolve(newEvent);
  },
  updateEvent: (event: Event) => {
    const index = mockEvents.findIndex(e => e.id === event.id);
    if (index >= 0) {
      mockEvents[index] = event;
      return Promise.resolve(event);
    }
    return Promise.reject(new Error('Event not found'));
  },
  deleteEvent: (id: string) => {
    const index = mockEvents.findIndex(e => e.id === id);
    if (index >= 0) {
      mockEvents.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Event not found'));
  },

  // Speakers
  getSpeakers: () => {
    // Combine all speakers from events with additional speakers
    const eventSpeakers = mockEvents.flatMap(e => e.speakers);
    const allSpeakers = [...eventSpeakers, ...additionalSpeakers];
    
    // Remove duplicates by ID
    const uniqueSpeakers = Array.from(
      new Map(allSpeakers.map(speaker => [speaker.id, speaker])).values()
    );
    
    return Promise.resolve(uniqueSpeakers);
  },
  getFeaturedSpeakers: () => {
    // Get all speakers first
    const allSpeakers = [...mockEvents.flatMap(e => e.speakers), ...additionalSpeakers];
    
    // Filter featured speakers and remove duplicates
    return Promise.resolve(
      Array.from(
        new Map(
          allSpeakers.filter(s => s.featured).map(speaker => [speaker.id, speaker])
        ).values()
      )
    );
  },
  getSpeakerById: (id: string) => {
    const allSpeakers = [...mockEvents.flatMap(e => e.speakers), ...additionalSpeakers];
    return Promise.resolve(allSpeakers.find(s => s.id === id));
  },

  // Gallery
  getGalleryImages: () => Promise.resolve(mockGalleryImages),
  
  // Tickets
  bookTicket: (eventId: string, userId: string, quantity: number) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return Promise.reject(new Error('Event not found'));
    
    if (event.availableSeats < quantity) {
      return Promise.reject(new Error('Not enough available seats'));
    }
    
    const ticket: Ticket = {
      id: `t${mockTickets.length + 1}`,
      eventId,
      userId,
      quantity,
      totalPrice: event.price * quantity,
      purchaseDate: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };
    
    // Update available seats
    event.availableSeats -= quantity;
    
    mockTickets.push(ticket);
    return Promise.resolve(ticket);
  },
  
  // Admin functions
  getAllUsers: () => Promise.resolve(mockUsers),
  getAllTickets: () => Promise.resolve(mockTickets),
  getTicketsByUserId: (userId: string) => Promise.resolve(mockTickets.filter(t => t.userId === userId)),
  getTicketsByEventId: (eventId: string) => Promise.resolve(mockTickets.filter(t => t.eventId === eventId)),
};
