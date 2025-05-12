// src/services/userService.ts
import api from './api';

interface Usuario {
  id_usuario?: number;
  documentType: string;
  documentNumber: string;
  fullName: string;
  birthDate: string;
  email: string;
  phone: string;
  password: string;
  rol: string;
  estado: boolean;
}

interface UserResponse {
  data: Usuario;
  message: string;
}

interface UsersResponse {
  data: Usuario[];
  message: string;
}

interface DocumentTypesResponse {
  data: { value: string; label: string }[];
  message: string;
}

interface RolesResponse {
  data: { value: string; label: string }[];
  message: string;
}

const userService = {
  // Obtener todos los usuarios
  async getUsers(): Promise<Usuario[]> {
    try {
      const response = await api.get<UsersResponse>('/usuarios');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Obtener un usuario por ID
  async getUserById(id: number): Promise<Usuario> {
    try {
      const response = await api.get<UserResponse>(`/usuarios/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  async createUser(userData: Omit<Usuario, 'id_usuario'>): Promise<Usuario> {
    try {
      const response = await api.post<UserResponse>('/usuarios', userData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Actualizar un usuario existente
  async updateUser(id: number, userData: Partial<Usuario>): Promise<Usuario> {
    try {
      const response = await api.put<UserResponse>(`/usuarios/${id}`, userData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un usuario (cambiar estado)
  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },

  // Obtener tipos de documento disponibles
  async getDocumentTypes(): Promise<{ value: string; label: string }[]> {
    try {
      const response = await api.get<DocumentTypesResponse>('/document-types');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching document types:', error);
      // Retornar valores por defecto si falla
      return [
        { value: 'cc', label: 'Cédula de Ciudadanía' },
        { value: 'ti', label: 'Tarjeta de Identidad' },
        { value: 'ce', label: 'Cédula de Extranjería' },
        { value: 'passport', label: 'Pasaporte' },
        { value: 'nit', label: 'NIT' },
      ];
    }
  },

  // Obtener roles disponibles
  async getRoles(): Promise<{ value: string; label: string }[]> {
    try {
      const response = await api.get<RolesResponse>('/roles');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Retornar valores por defecto si falla
      return [
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuario Regular' },
        { value: 'public_entity', label: 'Entidad Pública' },
        { value: 'contributor', label: 'Contribuyente' },
      ];
    }
  },

  // Verificar si un email ya está registrado
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await api.get<{ exists: boolean }>(`/usuarios/check-email?email=${email}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  },

  // Verificar si un número de documento ya está registrado
  async checkDocumentExists(documentNumber: string): Promise<boolean> {
    try {
      const response = await api.get<{ exists: boolean }>(
        `/usuarios/check-document?documentNumber=${documentNumber}`
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error checking document number:', error);
      return false;
    }
  },
};

export default userService;
export type { Usuario };