// src/services/auth.service.ts
import api from './api';
import { AxiosResponse } from 'axios'; // Importa el tipo AxiosResponse

interface User {
  id: number;
  email: string;
  role: {
    nombre: string;
  };
}

interface LoginResponse {
  user: User;
  token?: string; // Opcional si tu backend devuelve un token
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', { email, password });
      const user = response.data.user; // Accede a través de response.data
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
};