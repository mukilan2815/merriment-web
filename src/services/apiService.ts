
import axios from 'axios';
import { Event, Speaker, GalleryImage, Ticket } from './types';

const API_URL = 'http://localhost:5000/api';

export const EventApi = {
  // Events
  getEvents: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  },
  
  getFeaturedEvents: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_URL}/events/featured`);
    return response.data;
  },
  
  getEventById: async (id: string): Promise<Event> => {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  },
  
  searchEvents: async (query: string): Promise<Event[]> => {
    const response = await axios.get(`${API_URL}/events/search/${query}`);
    return response.data;
  },
  
  createEvent: async (event: Omit<Event, 'id'>): Promise<Event> => {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  },
  
  updateEvent: async (event: Event): Promise<Event> => {
    const response = await axios.put(`${API_URL}/events/${event.id}`, event);
    return response.data;
  },
  
  deleteEvent: async (id: string): Promise<boolean> => {
    await axios.delete(`${API_URL}/events/${id}`);
    return true;
  },
  
  // Speakers
  getSpeakers: async (): Promise<Speaker[]> => {
    const response = await axios.get(`${API_URL}/speakers`);
    return response.data;
  },
  
  getFeaturedSpeakers: async (): Promise<Speaker[]> => {
    const response = await axios.get(`${API_URL}/speakers/featured`);
    return response.data;
  },
  
  getSpeakerById: async (id: string): Promise<Speaker> => {
    const response = await axios.get(`${API_URL}/speakers/${id}`);
    return response.data;
  },
  
  createSpeaker: async (speaker: Omit<Speaker, 'id'>): Promise<Speaker> => {
    const response = await axios.post(`${API_URL}/speakers`, speaker);
    return response.data;
  },
  
  updateSpeaker: async (speaker: Speaker): Promise<Speaker> => {
    const response = await axios.put(`${API_URL}/speakers/${speaker.id}`, speaker);
    return response.data;
  },
  
  deleteSpeaker: async (id: string): Promise<boolean> => {
    await axios.delete(`${API_URL}/speakers/${id}`);
    return true;
  },
  
  // Tickets
  bookTicket: async (eventId: string, quantity: number): Promise<Ticket> => {
    const response = await axios.post(`${API_URL}/tickets`, { eventId, quantity });
    return response.data;
  },
  
  getUserTickets: async (): Promise<Ticket[]> => {
    const response = await axios.get(`${API_URL}/tickets/my-tickets`);
    return response.data;
  },
  
  cancelTicket: async (id: string): Promise<Ticket> => {
    const response = await axios.put(`${API_URL}/tickets/cancel/${id}`);
    return response.data;
  },
  
  // Admin
  getAllTickets: async (): Promise<Ticket[]> => {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
  },
  
  getTicketsByEvent: async (eventId: string): Promise<Ticket[]> => {
    const response = await axios.get(`${API_URL}/tickets/event/${eventId}`);
    return response.data;
  }
};
