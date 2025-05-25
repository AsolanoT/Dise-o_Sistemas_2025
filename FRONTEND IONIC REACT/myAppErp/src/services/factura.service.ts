import api from './api';

export interface Factura {
  id?: number;
  status: boolean;
  user: {
    id: number;
  };
  tipoTributo: {
    id: number;
  };
  periodo: string;
  baseCalculo: number;
  valorEstimado?: number;
  estado: string;
  concepto: string;
  fechaEmision: string;
  fechaVencimiento: string;
}

export const fetchFacturas = async (): Promise<Factura[]> => {
  try {
    const response = await api.get<Factura[]>('/factura');
    return response.data.filter((item: Factura) => item.status === true);
  } catch (error) {
    console.error('Error fetching facturas:', error);
    throw error;
  }
};

export const createFactura = async (facturaData: Omit<Factura, 'id'>): Promise<Factura> => {
  try {
    const payload = {
      ...facturaData,
      status: true
    };
    
    const response = await api.post<Factura>('/factura', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating factura:', error);
    throw error;
  }
};

export const updateFactura = async (id: number, facturaData: Partial<Factura>): Promise<Factura> => {
  try {
    const payload = {
      ...facturaData,
      status: true
    };
    
    const response = await api.put<Factura>(`/factura/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating factura:', error);
    throw error;
  }
};

export const deleteFactura = async (id: number): Promise<void> => {
  try {
    await api.delete(`/factura/${id}`);
  } catch (error) {
    console.error('Error deleting factura:', error);
    throw error;
  }
};

export const getFacturaById = async (id: number): Promise<Factura> => {
  try {
    const response = await api.get<Factura>(`/factura/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching factura by ID:', error);
    throw error;
  }
};

export const fetchFacturasByUser = async (userId: number): Promise<Factura[]> => {
  try {
    // Asegúrate de que tu endpoint API soporte este filtro
    const response = await api.get<Factura[]>(`/factura?userId=${userId}`);
    
    // Verifica que la respuesta tenga datos y el formato correcto
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Formato de respuesta inválido');
    }
    
    // Filtra por status y por usuario (doble verificación)
    return response.data.filter((item: Factura) => 
      item.status === true && 
      item.user?.id === userId
    );
  } catch (error) {
    console.error('Error fetching facturas by user:', error);
    throw new Error('No se pudieron cargar las facturas. Por favor, intente más tarde.');
  }
};