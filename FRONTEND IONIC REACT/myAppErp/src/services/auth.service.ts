import axios from 'axios';

const API_URL = 'http://localhost:9000/api/auth'; // Ajusta la URL según tu endpoint

export const registerUser = async (userData: any) => {
  try {
    const payload = {
      status: true, // Valor booleano en vez de string
      tipo_documento: userData.documentType,
      numero_documento: userData.documentNumber,
      nombre: userData.fullName,
      direccion: userData.address || '',
      telefono: userData.phone.trim(),
      email: userData.email.toLowerCase().trim(),
      birthDate: userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : null,
      password: userData.password,
      tipocontribuyente: userData.taxpayerType,
      tipo_actividad: userData.activityType,
      role: {
      id: userData.roleId || '2' // Valor por defecto si no se proporciona
      }
    };

    console.log("Enviando payload al backend:", payload);

    const response = await axios.post(`${API_URL}/signup`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: (status) => status < 500 // Para capturar errores 400
    });

    console.log("Respuesta del servidor:", response);

    if (response.status >= 400) {
      let errorMessage = 'Error en el registro del usuario';
      
      if (response.data) {
        if (typeof response.data === 'string') {
          errorMessage = response.data;
        } else if (response.data.message) {
          errorMessage = response.data.message;
        } else if (Array.isArray(response.data)) {
          errorMessage = response.data.join(', ');
        } else if (response.data.error) {
          errorMessage = response.data.error;
        }
      }
      
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error detallado en el registro:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    throw new Error(error.response?.data?.message || 
                  error.response?.data?.error || 
                  error.response?.data ||
                  error.message || 
                  'Error en el registro del usuario');
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const payload = {
      tipo_documento: userData.documentType,
      numero_documento: userData.documentNumber,
      nombre: userData.fullName,
      direccion: userData.address,
      telefono: userData.phone.trim(),
      email: userData.email.toLowerCase().trim(),
      birthDate: userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : null,
      tipocontribuyente: userData.taxpayerType,
      tipo_actividad: userData.activityType,
      role: {
        id: userData.roleId
      }
    };

    const response = await axios.put(`${API_URL}/${userId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 
                  'Error al actualizar el usuario');
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    // Transformar los datos del backend al formato que espera el frontend
    const userData = {
      documentType: response.data.tipo_documento,
      documentNumber: response.data.numero_documento,
      fullName: response.data.nombre,
      address: response.data.direccion,
      phone: response.data.telefono,
      email: response.data.email,
      birthDate: response.data.birthDate,
      taxpayerType: response.data.tipocontribuyente,
      activityType: response.data.tipo_actividad,
      roleId: response.data.role?.id
    };
    
    return userData;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 
                  'Error al obtener los datos del usuario');
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    // Transformar los datos para que coincidan con el formato del frontend
    return response.data.map((user: any) => ({
      id: user.id,
      documentType: user.tipo_documento,
      documentNumber: user.numero_documento,
      fullName: user.nombre,
      email: user.email,
      phone: user.telefono,
      role: user.role?.nombre || 'Usuario'
    }));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 
                  'Error al obtener la lista de usuarios');
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 
                  'Error al eliminar el usuario');
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

export const verifyEmail = async (email: string, code: string) => {
  try {
    const response = await axios.post(`${API_URL}/verify-email`, null, {
      params: { email, code }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en la verificación');
    } else {
      throw new Error('Error de conexión con el servidor');
    }
  }
};

export const fetchUsers = async (): Promise<any[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      validateStatus: () => true
    });
    
    console.log('Respuesta completa:', response);
    console.log('Datos recibidos:', response.data);
    
    if (!response.data) {
      throw new Error('La respuesta no contiene datos');
    }

    // Si la respuesta es un objeto con una propiedad data
    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data
        .filter((user: any) => user.status === true)
        .map((user: any) => ({
          id: user.id,
          documentType: user.tipo_documento,
          documentNumber: user.numero_documento,
          nombre: user.nombre || user.fullName,
          email: user.email,
          phone: user.telefono,
          role: user.role?.nombre || 'Usuario'
        }));
    }

    // Si la respuesta es directamente el array
    if (Array.isArray(response.data)) {
      return response.data
        .filter((user: any) => user.status === true)
        .map((user: any) => ({
          id: user.id,
          documentType: user.tipo_documento,
          documentNumber: user.numero_documento,
          nombre: user.nombre || user.fullName,
          email: user.email,
          phone: user.telefono,
          role: user.role?.nombre || 'Usuario'
        }));
    }

    throw new Error('Formato de respuesta no reconocido');
  } catch (error: any) {
    console.error('Error fetching users:', {
      error: error.message,
      response: error.response?.data
    });
    throw new Error(error.response?.data?.message || 
                  'Error al obtener la lista de usuarios');
  }
};

