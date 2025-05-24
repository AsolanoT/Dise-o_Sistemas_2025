import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:9000/api/auth';

interface User {
  id: number;
  email: string;
  role: {
    id: number;
    nombre: string;
  };
  // Agrega otros campos necesarios
}

interface LoginResponse {
  user: User;
  token: string;
  // Otros campos que devuelva tu API
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  user: {
    id: number;
    email: string;
    role: {
      id: number;
      nombre: string;
    };
  };
}> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true // Importante para manejar cookies/sesión
    });

    if (response.data.error) {
      throw new Error(response.data.message);
    }

    // Guardar datos básicos del usuario en localStorage
    if (response.data.user) {
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Credenciales inválidas';
      throw new Error(errorMessage);
    }
    throw new Error('Error de conexión con el servidor');
  }
};

// Obtener datos del usuario actual
export const getCurrentUser = (): {
  id: number;
  email: string;
  role: {
    id: number;
    nombre: string;
  };
} | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Cerrar sesión
export const logout = async (): Promise<void> => {
  try {
    // Limpiar el frontend primero
    localStorage.removeItem('userData');
    
    // Llamar al backend para cerrar sesión
    await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error("Error al cerrar sesión");
  }
};

// Verificar sesión activa
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/protected-route`, {
      withCredentials: true
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};


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
