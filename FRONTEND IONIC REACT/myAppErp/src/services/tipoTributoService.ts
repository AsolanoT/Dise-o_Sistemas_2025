// src/services/tipoTributoService.ts
import api from './api';

export interface TipoTributo {
  id?: number;
  status: boolean;
  nombre: string;
  descripcion: string;
  tarifa: number;
  periodicidad: string;
}

export const fetchTipoTributos = async (): Promise<TipoTributo[]> => {
  try {
    const response = await api.get<TipoTributo[]>('/tipoTributo');
    return response.data.filter((res: TipoTributo) => res.status === true);
  } catch (error) {
    console.error('Error fetching tipos de tributo:', error);
    throw error;
  }
};

export const createTipoTributo = async (tributoData: Omit<TipoTributo, 'id' | 'status'>): Promise<TipoTributo> => {
  try {
    const payload = {
      ...tributoData,
      status: true
    };
    
    const response = await api.post<TipoTributo>('/tipoTributo', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tipo de tributo:', error);
    throw error;
  }
};

export const updateTipoTributo = async (id: number, tributoData: Partial<TipoTributo>): Promise<TipoTributo> => {
  try {
    const payload = {
      ...tributoData,
      status: true
    };
    
    const response = await api.put<TipoTributo>(`/tipoTributo/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tipo de tributo:', error);
    throw error;
  }
};

export const deleteTipoTributo = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tipoTributo/${id}`);
  } catch (error) {
    console.error('Error deleting tipo de tributo:', error);
    throw error;
  }
};

export const fetchTipoTributoById = async (id: number): Promise<TipoTributo> => {
  try {
    const response = await api.get<TipoTributo>(`/tipoTributo/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tipo de tributo with ID ${id}:`, error);
    throw error;
  }
};