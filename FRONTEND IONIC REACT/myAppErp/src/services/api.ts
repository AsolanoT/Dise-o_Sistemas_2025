// src/services/api.ts
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api', // Ajusta según tu configuración
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores. personalizar mensajes de error
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Datos inválidos enviados al servidor';
          break;
        case 401:
          errorMessage = 'No autorizado - por favor inicie sesión';
          break;
        case 403:
          errorMessage = 'No tiene permisos para esta acción';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 409:
          errorMessage = error.response.data.message || 'Conflicto - el recurso ya existe';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = error.response.data.message || error.message;
      }
    }
    
    console.error("Error API:", {
      url: error.config?.url,
      status: error.response?.status,
      message: errorMessage
    });
    
    return Promise.reject(errorMessage);
  }
);

export default api;