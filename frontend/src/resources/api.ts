import axios from 'axios';
import type { ClientConsumption } from '../types';

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      const message = error.response.data?.message || `Error ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      // La petición se hizo pero no se recibió respuesta
      throw new Error('No se pudo conectar con el servidor');
    } else {
      // Algo más pasó
      throw new Error(error.message);
    }
  }
);

// API endpoints
export const clientApi = {
  // Obtener todos los clientes
  getAllClients: async (): Promise<ClientConsumption[]> => {
    const response = await api.get('/client/');
    return response.data;
  },

  // Obtener cliente por ID
  getClientById: async (id: number): Promise<ClientConsumption> => {
    const response = await api.get(`/client/${id}`);
    return response.data;
  },
};

export default api;
