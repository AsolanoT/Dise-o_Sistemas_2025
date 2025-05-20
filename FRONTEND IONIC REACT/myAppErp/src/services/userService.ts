// src/services/userService.ts
import api from './api';

interface User {
  status: boolean;
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  birthDate: string;
  password: string;
  tipocontribuyente: string;
  tipo_actividad: string;
  role: {
    id: string;
  };
}

interface UserResponse {
  data: User;
  message: string;
}

interface AuthResponse {
  token?: string;
  user?: User;
  message?: string;
}

interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

const userService = {
  // Registro de usuario
  async createUser(userData: User): Promise<User> {
    try {
      const payload = {
        tipo_documento: userData.tipo_documento,
        numero_documento: userData.numero_documento,
        nombre: userData.nombre,
        birthDate: userData.birthDate,
        email: userData.email.toLowerCase().trim(),
        telefono: userData.telefono.trim(),
        password: userData.password,
        tipocontribuyente: userData.tipocontribuyente,
        tipo_actividad: userData.tipo_actividad,
        role: userData.role
      };

      console.log("Enviando payload:", payload);

      const response = await api.post<UserResponse>('/auth/signup', payload, {
        validateStatus: (status) => status < 500 // Para capturar errores 400
      });

      console.log("Respuesta del servidor:", response);

      if (response.status >= 400) {
        let errorMessage = 'Error en el registro';
        
        if (response.data) {
          if (typeof response.data === 'string') {
            errorMessage = response.data;
          } else if (response.data.message) {
            errorMessage = response.data.message;
          } else if (Array.isArray(response.data)) {
            errorMessage = response.data.join(', ');
          }
        }
        
        throw new Error(errorMessage);
      }

      return response.data.data;
    } catch (error: any) {
      console.error("Error detallado:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      throw new Error(error.response?.data?.message || 
                    error.response?.data ||
                    error.message || 
                    'Error en el registro');
    }
  },

  // Verificación de email
  async verifyEmail(email: string, code: string): Promise<VerifyEmailResponse> {
    try {
      const response = await api.post<VerifyEmailResponse>('/auth/verify-email', null, {
        params: { email, code }
      });
      
      if (response.status >= 400) {
        throw new Error(response.data.message || 'Error en la verificación');
      }
      
      return response.data;
    } catch (error: any) {
      console.error("Error en verifyEmail:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      throw new Error(error.response?.data?.message || 
                    'Error en la verificación del email');
    }
  },

  // Inicio de sesión
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password
      });

      // Guardar token si es necesario
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      console.error("Error en login:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.message || 
                         'Credenciales inválidas';
      
      throw new Error(errorMessage);
    }
  },

  // Verificación de documento existente
  async checkDocumentExists(documentNumber: string): Promise<boolean> {
    try {
      const response = await api.get<{ exists: boolean }>(
        '/users/check-document',
        { params: { numero_documento: documentNumber } }
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error checking document number:', error);
      return false;
    }
  },

  // Verificación de email existente
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await api.get<{ exists: boolean }>(
        '/users/check-email',
        { params: { email: email.toLowerCase().trim() } }
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }
};

export default userService;
export type { User, AuthResponse, VerifyEmailResponse };