// src/services/role.service.ts
import axios from 'axios';
import { AxiosResponse } from 'axios'; // Importa el tipo AxiosResponse

const API_URL = 'http://localhost:9000/api/auth'; // Ajusta el puerto si es necesario

interface User {
  id: number;
  email: string;
  role: {
    nombre: string;
  };
}

interface LoginResponse {
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post('/auth/login', { email, password });
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

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Guardar token si es necesario
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Credenciales inválidas';
      throw new Error(errorMessage);
    }
    throw new Error('Error de conexión con el servidor');
  }
};