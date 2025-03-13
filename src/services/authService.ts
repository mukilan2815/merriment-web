
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Set auth token for subsequent requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize token from local storage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export const AuthService = {
  // Register a new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, credentials);
    setAuthToken(response.data.token);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    setAuthToken(response.data.token);
    return response.data;
  },

  // Logout user
  logout: () => {
    setAuthToken(null);
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    if (!localStorage.getItem('token')) {
      throw new Error('No token found');
    }
    const response = await axios.get<{ user: User }>(`${API_URL}/auth/me`);
    return response.data.user;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Check if user is admin
  isAdmin: async (): Promise<boolean> => {
    try {
      const user = await AuthService.getCurrentUser();
      return user.role === 'admin';
    } catch (error) {
      return false;
    }
  }
};
