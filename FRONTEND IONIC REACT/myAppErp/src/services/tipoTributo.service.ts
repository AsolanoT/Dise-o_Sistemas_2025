import api from './api';

export interface TipoTributo {
  id?: number;
  status: boolean;
  nombre: string;
  descripcion: string;
  tarifa: number;
  periodicidad: string;
}

export const fetchTiposTributo = async (): Promise<TipoTributo[]> => {
  try {
    const response = await api.get<TipoTributo[]>('/tipo-tributo');
    return response.data.filter((res: TipoTributo) => res.status === true);
  } catch (error) {
    console.error('Error fetching tipos de tributo:', error);
    throw error;
  }
};

export const createTipoTributo = async (tipoTributoData: Omit<TipoTributo, 'id'>): Promise<TipoTributo> => {
  try {
    const payload = {
      ...tipoTributoData,
      status: true
    };
    
    const response = await api.post<TipoTributo>('/tipo-tributo', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tipo de tributo:', error);
    throw error;
  }
};

export const updateTipoTributo = async (id: number, tipoTributoData: Partial<TipoTributo>): Promise<TipoTributo> => {
  try {
    const payload = {
      ...tipoTributoData,
      status: true
    };
    
    const response = await api.put<TipoTributo>(`/tipo-tributo/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tipo de tributo:', error);
    throw error;
  }
};

export const deleteTipoTributo = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tipo-tributo/${id}`);
  } catch (error) {
    console.error('Error deleting tipo de tributo:', error);
    throw error;
  }
};

export const getTipoTributoById = async (id: number): Promise<TipoTributo> => {
  try {
    const response = await api.get<TipoTributo>(`/tipo-tributo/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tipo de tributo by ID:', error);
    throw error;
  }
};